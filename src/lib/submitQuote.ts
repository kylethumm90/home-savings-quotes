import type { QuoteData } from './types';
import { getClientIp } from './clientIp';
import { getZipLocation, type ZipLocation } from './zipLookup';

export type SubmitResult = {
  confirmationId: string;
  expectedBy?: string;
};

// Make.com webhook that receives every completed quote form submission.
// Make is responsible for: mapping ownership to the Standard Information
// enums, defaulting utility_provider, attaching the Bearer auth header, and
// finally posting to https://exchange.standardinformation.io/capture(_test).
// City/state are derived client-side from the ZIP (see zipLookup) and sent
// directly as `city` / `state`.
// Override per-environment with VITE_QUOTE_ENDPOINT if needed.
const DEFAULT_ENDPOINT = 'https://hook.us1.make.com/j295h9ciroc84z5e96g4a21c3s97ig7c';

// The TCPA-consent language the user actually saw under the final-step submit
// button. We forward it verbatim as `tcpa_consent_text` so Make can pass it
// to Standard Information as proof of consent.
export const TCPA_CONSENT_TEXT =
  'By submitting you agree to be contacted by HomeSavingsQuotes and up to 3 ' +
  'matched installers regarding your quote. Standard message and data rates ' +
  'may apply. No purchase necessary.';

type EnrichedPayload = QuoteData & {
  landing_page_url: string;
  originally_created: string;
  user_agent: string;
  tcpa_consent_text: string;
  // Full name (`name`) split for buyers that require separate fields. first_name
  // is the first whitespace-delimited token; last_name is everything after.
  first_name: string;
  last_name: string;
  // Visitor's public IP, resolved client-side via ipify. Empty if the lookup
  // was blocked or timed out.
  ip_address?: string;
  // City / state derived from the ZIP via zipLookup. Empty for unknown ZIPs.
  city?: string;
  state?: string;
  // Lead-authenticity certificates. Populated client-side by the Jornaya and
  // TrustedForm scripts into the persistent hidden form in index.html, then
  // forwarded so Make/Standard Information can store them as independent proof
  // of consent. universal_leadid is the Jornaya LeadiD token; xxTrustedFormCertUrl
  // is the TrustedForm certificate URL. Empty if a script was blocked.
  universal_leadid?: string;
  xxTrustedFormCertUrl?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

// Splits a full name into first / last. The first whitespace-delimited token is
// the first name; everything after is the last name (single-word names get an
// empty last_name).
function splitName(full: string): { first_name: string; last_name: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  return {
    first_name: parts[0] ?? '',
    last_name: parts.slice(1).join(' '),
  };
}

// Reads a value the Jornaya / TrustedForm scripts wrote into a hidden field.
// The scripts may either populate the field we provide or inject their own, so
// we scan every matching element and return the first non-empty value.
function readHiddenField(...selectors: string[]): string | undefined {
  if (typeof document === 'undefined') return undefined;
  for (const selector of selectors) {
    const els = document.querySelectorAll<HTMLInputElement>(selector);
    for (const el of els) {
      const value = el.value?.trim();
      if (value) return value;
    }
  }
  return undefined;
}

function buildPayload(
  data: QuoteData,
  ipAddress?: string,
  location: ZipLocation = {},
): EnrichedPayload {
  const params = new URLSearchParams(window.location.search);
  const utm = (k: string) => params.get(k) || undefined;
  return {
    ...data,
    landing_page_url: window.location.href,
    originally_created: new Date().toISOString(),
    user_agent: navigator.userAgent,
    tcpa_consent_text: TCPA_CONSENT_TEXT,
    ...splitName(data.name),
    ip_address: ipAddress,
    city: location.city,
    state: location.state,
    universal_leadid: readHiddenField('#leadid_token', 'input[name="universal_leadid"]'),
    xxTrustedFormCertUrl: readHiddenField('input[name="xxTrustedFormCertUrl"]'),
    utm_source: utm('utm_source'),
    utm_medium: utm('utm_medium'),
    utm_campaign: utm('utm_campaign'),
    utm_term: utm('utm_term'),
    utm_content: utm('utm_content'),
  };
}

// POSTs the enriched form entry to Make. Make.com replies with plain
// "Accepted" rather than JSON, so we don't rely on the response body — a
// confirmation id is generated client-side and shown on the thank-you page
// regardless. A network error / non-2xx still falls back to the same
// generated id so the user isn't blocked.
export async function submitQuote(data: QuoteData): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_QUOTE_ENDPOINT || DEFAULT_ENDPOINT;
  const fallback: SubmitResult = {
    confirmationId: 'HSQ-' + Math.floor(Math.random() * 90000 + 10000),
  };

  // Resolve IP and city/state (both usually prefetched, so this is instant).
  const [ipAddress, location] = await Promise.all([
    getClientIp(),
    getZipLocation(data.zip),
  ]);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildPayload(data, ipAddress, location)),
    });
    if (!res.ok) return fallback;
    const body = (await res.json().catch(() => null)) as Partial<SubmitResult> | null;
    return {
      confirmationId: body?.confirmationId ?? fallback.confirmationId,
      expectedBy: body?.expectedBy,
    };
  } catch {
    return fallback;
  }
}

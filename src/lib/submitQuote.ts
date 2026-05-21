import type { QuoteData } from './types';

export type SubmitResult = {
  confirmationId: string;
  expectedBy?: string;
};

// Make.com webhook that receives every completed quote form submission.
// Make is responsible for: splitting name, mapping ownership/homeType to the
// Standard Information enums, deriving city/state from zip, defaulting
// roof_shade + utility_provider, attaching the Bearer auth header, and
// finally posting to https://exchange.standardinformation.io/capture(_test).
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
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

function buildPayload(data: QuoteData): EnrichedPayload {
  const params = new URLSearchParams(window.location.search);
  const utm = (k: string) => params.get(k) || undefined;
  return {
    ...data,
    landing_page_url: window.location.href,
    originally_created: new Date().toISOString(),
    user_agent: navigator.userAgent,
    tcpa_consent_text: TCPA_CONSENT_TEXT,
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

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildPayload(data)),
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

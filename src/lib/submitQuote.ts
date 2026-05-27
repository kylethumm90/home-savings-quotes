import type { QuoteData } from './types';

export type SubmitResult = {
  confirmationId: string;
  expectedBy?: string;
};

// Webhook that receives every completed quote form. Its only job is to add
// the Bearer header and forward the body verbatim to Standard Information's
// capture endpoint — the React app builds the SI-shaped payload, so the
// webhook is a dumb pass-through.
// Override per-environment with VITE_QUOTE_ENDPOINT if needed.
const DEFAULT_ENDPOINT = 'https://hook.us1.make.com/j295h9ciroc84z5e96g4a21c3s97ig7c';

// The TCPA-consent language the user actually saw under the final-step submit
// button. Forwarded verbatim as proof of consent.
export const TCPA_CONSENT_TEXT =
  'By submitting you agree to be contacted by HomeSavingsQuotes and up to 3 ' +
  'matched installers regarding your quote. Standard message and data rates ' +
  'may apply. No purchase necessary.';

// Stable identifier sent as meta.source_id. Override via VITE_SI_SOURCE_ID
// when running multiple campaigns / sub-affiliates from the same code.
const SOURCE_ID = import.meta.env.VITE_SI_SOURCE_ID || 'homesavingsquotes-web';

// Standard Information only accepts these three property-type enums, so the
// quiz's four options collapse down.
const PROPERTY_TYPE_MAP: Record<string, 'Single Family' | 'Multi Family' | 'Apartment'> = {
  single: 'Single Family',
  'two-story': 'Single Family',
  townhouse: 'Multi Family',
  condo: 'Apartment',
};

// SI wants a numeric monthly bill, but the quiz captures a range label. Use
// the midpoint of each band; "Over $350" gets a conservative 400.
const BILL_MIDPOINT: Record<string, number> = {
  'Under $100': 75,
  '$100 – $200': 150,
  '$200 – $350': 275,
  'Over $350': 400,
};

type SiPayload = {
  data: {
    credit_rating?: 'Excellent' | 'Good' | 'Fair';
    monthly_electric_bill: number;
    own_property: boolean;
    property_type: 'Single Family' | 'Multi Family' | 'Apartment';
    roof_shade: 'No Shade' | 'Some Shade' | 'Full Shade';
    utility_provider: string;
  };
  meta: {
    jornaya_lead_id: string;
    landing_page_url: string;
    offer_id?: string;
    originally_created: string;
    source_id: string;
    tcpa_consent_text: string;
    trusted_form_cert_id: string;
    user_agent?: string;
  };
  contact: {
    address: string;
    city: string;
    email: string;
    first_name: string;
    ip_address: string;
    last_name: string;
    phone: string;
    state: string;
    zip_code: string;
  };
};

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) return { first: parts[0] || '', last: '' };
  return { first: parts[0], last: parts.slice(1).join(' ') };
}

// Fetches the visitor's public IP. SI requires contact.ip_address and the
// browser can't read it directly, so we look it up at submit time.
async function fetchIp(): Promise<string> {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    if (!res.ok) return '';
    const body = (await res.json()) as { ip?: string };
    return body.ip || '';
  } catch {
    return '';
  }
}

// Resolves a US zip to its primary city + state abbreviation via the free,
// no-key zippopotam.us service. Returns blanks on failure so the request
// still gets through and we can debug from SI's denial response.
async function fetchCityState(zip: string): Promise<{ city: string; state: string }> {
  try {
    const res = await fetch(`https://api.zippopotam.us/us/${encodeURIComponent(zip)}`);
    if (!res.ok) return { city: '', state: '' };
    const body = (await res.json()) as { places?: Array<{ 'place name': string; 'state abbreviation': string }> };
    const place = body.places?.[0];
    return {
      city: place?.['place name'] || '',
      state: place?.['state abbreviation'] || '',
    };
  } catch {
    return { city: '', state: '' };
  }
}

async function buildSiPayload(data: QuoteData): Promise<SiPayload> {
  const [ip, { city, state }] = await Promise.all([fetchIp(), fetchCityState(data.zip)]);
  const { first, last } = splitName(data.name);
  return {
    data: {
      monthly_electric_bill: BILL_MIDPOINT[data.bill] ?? 0,
      own_property: data.ownership === 'own',
      property_type: PROPERTY_TYPE_MAP[data.homeType] ?? 'Single Family',
      roof_shade: 'No Shade',
      utility_provider: 'Unknown',
    },
    meta: {
      jornaya_lead_id: data.leadidToken || '',
      landing_page_url: window.location.href,
      originally_created: new Date().toISOString(),
      source_id: SOURCE_ID,
      tcpa_consent_text: TCPA_CONSENT_TEXT,
      trusted_form_cert_id: data.trustedFormCertUrl || '',
      user_agent: navigator.userAgent,
    },
    contact: {
      address: data.address,
      city,
      email: data.email,
      first_name: first,
      ip_address: ip,
      last_name: last,
      phone: data.phone.replace(/\D/g, ''),
      state,
      zip_code: data.zip,
    },
  };
}

// POSTs the SI-shaped payload to the forwarding webhook. The webhook adds
// the Bearer header and proxies to https://exchange.standardinformation.io/
// capture(_test). The webhook's response (SI's JSON) is parsed for the
// confirmation id; on any error we fall back to a client-generated id so
// the user always sees a thank-you page.
export async function submitQuote(data: QuoteData): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_QUOTE_ENDPOINT || DEFAULT_ENDPOINT;
  const fallback: SubmitResult = {
    confirmationId: 'HSQ-' + Math.floor(Math.random() * 90000 + 10000),
  };

  try {
    const payload = await buildSiPayload(data);
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return fallback;
    const body = (await res.json().catch(() => null)) as
      | { confirmation_id?: string; confirmationId?: string; expectedBy?: string }
      | null;
    return {
      confirmationId: body?.confirmation_id ?? body?.confirmationId ?? fallback.confirmationId,
      expectedBy: body?.expectedBy,
    };
  } catch {
    return fallback;
  }
}

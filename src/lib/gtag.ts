import type { QuoteData } from './types';

// Google Ads tag config. These are set at build time via Vite env vars so the
// account-specific IDs aren't baked into source. Set them in .env.local (local)
// or your host's env settings (e.g. Vercel) — see .env.example.
//   VITE_GADS_CONVERSION_ID    e.g. "AW-1234567890"
//   VITE_GADS_CONVERSION_LABEL e.g. "AbC-D_efGh12_3jk"  (the part after the "/")
//   VITE_GADS_CONVERSION_VALUE optional per-lead value used for value bidding
const CONVERSION_ID = import.meta.env.VITE_GADS_CONVERSION_ID;
const CONVERSION_LABEL = import.meta.env.VITE_GADS_CONVERSION_LABEL;
const LEAD_VALUE = Number(import.meta.env.VITE_GADS_CONVERSION_VALUE ?? '');

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

// Loads gtag.js and bootstraps the Google tag. No-ops if the conversion id is
// not configured, so dev/preview builds run without tracking.
export function initGtag(): void {
  if (initialized || !CONVERSION_ID || typeof window === 'undefined') return;
  initialized = true;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${CONVERSION_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  // Canonical gtag shim — matches Google's snippet (pushes the arguments object).
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // allow_enhanced_conversions lets the tag hash + send the user_data we set
  // below, which raises match rate and lowers CPL on lead-gen.
  window.gtag('config', CONVERSION_ID, { allow_enhanced_conversions: true });
}

function toE164(raw: string): string | undefined {
  const d = (raw || '').replace(/\D/g, '');
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith('1')) return `+${d}`;
  return d ? `+${d}` : undefined;
}

// Fires the Google Ads lead conversion exactly once at submission success.
// The funnel is a single-page app (landing/quiz/thanks share one URL with no
// reload), so a URL- or pageview-based conversion would never fire — this
// must be an explicit event triggered from the success path.
export function trackLead(data: QuoteData): void {
  if (!window.gtag || !CONVERSION_ID) return;

  const [firstName, ...rest] = (data.name || '').trim().split(/\s+/);
  // Enhanced conversions for leads: pass raw PII; Google's tag SHA-256-hashes
  // it client-side before sending (requires EC-for-leads enabled in the account).
  window.gtag('set', 'user_data', {
    email: data.email || undefined,
    phone_number: toE164(data.phone),
    address: {
      first_name: firstName || undefined,
      last_name: rest.join(' ') || undefined,
      postal_code: data.zip || undefined,
      country: 'US',
    },
  });

  const sendTo = CONVERSION_LABEL ? `${CONVERSION_ID}/${CONVERSION_LABEL}` : CONVERSION_ID;
  window.gtag('event', 'conversion', {
    send_to: sendTo,
    value: Number.isFinite(LEAD_VALUE) && LEAD_VALUE > 0 ? LEAD_VALUE : undefined,
    currency: 'USD',
  });
  // GA4-friendly duplicate so a future GA4 property can use the same signal.
  window.gtag('event', 'generate_lead', {
    currency: 'USD',
    value: Number.isFinite(LEAD_VALUE) && LEAD_VALUE > 0 ? LEAD_VALUE : undefined,
  });
}

// Optional micro-conversion fired when a visitor starts the quiz. Useful as a
// secondary optimization signal while lead volume is too low for Target CPA.
export function trackQuizStart(): void {
  window.gtag?.('event', 'quiz_start');
}

// Google Ads conversion tracking for the SPA funnel. Because the thank-you
// screen is a state change rather than a real page load, we can't rely on a
// page-load conversion tag — instead we load gtag.js up front and fire the
// conversion as an event the moment a lead completes.
//
// Both values come from the conversion action in Google Ads
// (Tools > Conversions). They're env-driven so the IDs aren't hardcoded and
// every tracking call no-ops until they're set (e.g. in local/dev/preview).
const CONVERSION_ID = import.meta.env.VITE_GOOGLE_ADS_ID || 'AW-18156427728';
const CONVERSION_LABEL = import.meta.env.VITE_GOOGLE_ADS_LABEL || 'hi3tCKjIj7UcENCz1NFD';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

// Injects gtag.js once if a conversion id is configured. Safe to call on
// every app mount; subsequent calls are no-ops.
export function initTracking(): void {
  if (initialized || !CONVERSION_ID || typeof window === 'undefined') return;
  initialized = true;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${CONVERSION_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag relies on the live `arguments` object, so this can't be an arrow fn.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', CONVERSION_ID);
}

// Fires the Google Ads lead conversion. Call exactly once per completed lead.
// `transactionId` (the SI/confirmation id) lets Google de-dupe repeat fires;
// `value` feeds value-based bidding if you assign a per-lead payout.
export function trackLeadConversion(opts: { value?: number; transactionId?: string } = {}): void {
  if (!CONVERSION_ID || !CONVERSION_LABEL || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'conversion', {
    send_to: `${CONVERSION_ID}/${CONVERSION_LABEL}`,
    value: opts.value,
    currency: 'USD',
    transaction_id: opts.transactionId,
  });
}

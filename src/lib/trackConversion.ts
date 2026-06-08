// Google Ads conversion tracking. The base gtag.js loader + config lives in
// index.html; this fires the "Quote Requested" conversion event. We trigger it
// from the thank-you screen rather than on the submit button click so it only
// counts users who actually completed a submission (success path), and only
// once per completed quote.

// Conversion label from Google Ads > Goals > Conversions > "Quote Requested".
const CONVERSION_SEND_TO = 'AW-18156427728/Dv2hCP3KsbscENCz1NFD';

type GtagFn = (
  command: 'event',
  action: 'conversion',
  params: { send_to: string; value?: number; currency?: string },
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

// Fires the Quote Requested conversion. No-ops gracefully if gtag hasn't loaded
// (e.g. blocked by an ad blocker) so it can never break the thank-you page.
export function trackQuoteConversion(): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', {
    send_to: CONVERSION_SEND_TO,
    value: 1.0,
    currency: 'USD',
  });
}

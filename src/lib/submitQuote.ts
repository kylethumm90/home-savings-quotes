import type { QuoteData } from './types';

export type SubmitResult = {
  confirmationId: string;
  expectedBy?: string;
};

// Make.com webhook that receives every completed quote form submission.
// Override per-environment with VITE_QUOTE_ENDPOINT if needed.
const DEFAULT_ENDPOINT = 'https://hook.us1.make.com/j295h9ciroc84z5e96g4a21c3s97ig7c';

// POSTs the full form entry to the configured endpoint as JSON. Make.com
// webhooks reply with plain "Accepted" rather than JSON, so we don't rely
// on the response body — a confirmation id is generated client-side and
// shown on the thank-you page regardless. A network error / non-2xx still
// falls back to the same generated id so the user isn't blocked.
export async function submitQuote(data: QuoteData): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_QUOTE_ENDPOINT || DEFAULT_ENDPOINT;
  const fallback: SubmitResult = {
    confirmationId: 'HSQ-' + Math.floor(Math.random() * 90000 + 10000),
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
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

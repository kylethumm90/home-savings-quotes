import type { QuoteData } from './types';

export type SubmitResult = {
  confirmationId: string;
  expectedBy?: string;
};

const DEFAULT_ENDPOINT = '/api/quote';

// POSTs the lead to the configured endpoint. The response body is expected to
// be { confirmationId, expectedBy? }. Falls back to a locally-generated
// confirmation id if the endpoint is unreachable (network error / non-2xx),
// so the thank-you page still has something to display in environments
// without a backend wired up yet.
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

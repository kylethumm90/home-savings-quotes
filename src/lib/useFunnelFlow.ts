import { useCallback, useState } from 'react';
import type { QuoteData } from './types';
import { emptyQuote } from './types';
import type { SubmitResult } from './submitQuote';
import { trackLeadConversion } from './tracking';

export type Phase = 'landing' | 'quiz' | 'thanks';

export type FunnelFlow = {
  phase: Phase;
  data: QuoteData;
  result: SubmitResult | null;
  setData: (d: QuoteData) => void;
  startQuiz: (zip: string) => void;
  completeQuiz: (d: QuoteData, result: SubmitResult) => void;
  backToLanding: () => void;
  reset: () => void;
  focusZip: () => void;
};

// Shared landing → quiz → thanks state machine plus the zip-focus helper.
// Each variant renders its own hero JSX but reuses this hook for plumbing.
export function useFunnelFlow(): FunnelFlow {
  const [phase, setPhase] = useState<Phase>('landing');
  const [data, setData] = useState<QuoteData>(emptyQuote);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const startQuiz = useCallback((zip: string) => {
    setData((d) => ({ ...d, zip }));
    setPhase('quiz');
    window.scrollTo({ top: 0 });
  }, []);

  const completeQuiz = useCallback((d: QuoteData, r: SubmitResult) => {
    setData(d);
    setResult(r);
    setPhase('thanks');
    trackLeadConversion({ transactionId: r.confirmationId });
    window.scrollTo({ top: 0 });
  }, []);

  const backToLanding = useCallback(() => setPhase('landing'), []);

  const reset = useCallback(() => {
    setData(emptyQuote());
    setResult(null);
    setPhase('landing');
  }, []);

  const focusZip = useCallback(() => {
    document.getElementById('hsq-zip')?.focus();
    window.dispatchEvent(new Event('hsq-focus-zip'));
  }, []);

  return { phase, data, result, setData, startQuiz, completeQuiz, backToLanding, reset, focusZip };
}

import { useEffect } from 'react';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import type { QuoteData } from '../../lib/types';
import type { SubmitResult } from '../../lib/submitQuote';
import { trackQuoteConversion } from '../../lib/trackConversion';

type ThanksPageProps = {
  data: QuoteData;
  result: SubmitResult;
  onReset: () => void;
};

const NEXT_STEPS = [
  {
    n: '01',
    t: 'We line up the right folks',
    d: 'In the next hour or so, we pick the 1–3 local installers we think will be the best fit for your home.',
    icon: 'spark',
  },
  {
    n: '02',
    t: 'They reach out to you',
    d: 'Each matched installer will get in touch directly — by phone or email — to learn a bit about your home and walk you through pricing.',
    icon: 'phone',
  },
  {
    n: '03',
    t: 'You pick what works',
    d: 'After talking to them, choose the installer with the offer that fits, lock in $0-down financing if you qualify, and start saving.',
    icon: 'bolt',
  },
];

export function ThanksPage({ data, result, onReset }: ThanksPageProps) {
  const firstName = (data.name || '').split(' ')[0] || 'neighbor';

  // Fire the Google Ads "Quote Requested" conversion once, when the user
  // reaches the thank-you screen (i.e. after a completed submission). Renters
  // are excluded inside trackQuoteConversion.
  useEffect(() => {
    trackQuoteConversion(data);
    // Only the submitted lead matters; data is stable on this screen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="thanks-page">
      <header className="quiz-header">
        <div className="container quiz-header-row">
          <Logo />
          <div className="quiz-header-meta">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="shield" size={14} /> Secure & private
            </span>
          </div>
        </div>
      </header>

      <main className="thanks-main">
        <div className="container thanks-container">
          <div className="thanks-burst">
            <div className="thanks-burst-ring"></div>
            <div className="thanks-burst-check">
              <Icon name="check" size={42} />
            </div>
          </div>

          <div className="thanks-eyebrow">You're matched</div>
          <h1 className="thanks-title">
            Thanks, {firstName}.
            <br />
            <span className="thanks-title-accent">Local installers are on the way.</span>
          </h1>
          <p className="thanks-sub">
            We're matching you with up to 3 trusted local installers in <strong>{data.zip}</strong>. They'll be
            in touch within 24 hours — usually a lot sooner — to walk you through pricing for your home.
          </p>

          <div className="thanks-card">
            <div className="thanks-card-row">
              <span className="lbl">Confirmation #</span>
              <span className="val mono">{result.confirmationId}</span>
            </div>
            <div className="thanks-card-row">
              <span className="lbl">First contact expected by</span>
              <span className="val">{result.expectedBy ?? 'Tomorrow, 5:00 PM'}</span>
            </div>
          </div>

          <h2 className="thanks-next-title">What happens next</h2>
          <div className="thanks-next-grid">
            {NEXT_STEPS.map((s) => (
              <div className="thanks-next-card" key={s.n}>
                <div className="thanks-next-icon">
                  <Icon name={s.icon} size={20} />
                </div>
                <div className="thanks-next-step">Step {s.n}</div>
                <div className="thanks-next-t">{s.t}</div>
                <div className="thanks-next-d">{s.d}</div>
              </div>
            ))}
          </div>

          <div className="thanks-tip">
            <div className="thanks-tip-icon">
              <Icon name="leaf" size={22} />
            </div>
            <div>
              <div className="thanks-tip-title">While you wait</div>
              <div className="thanks-tip-body">
                Got a recent electric bill handy? Snap a photo — your matched installers will ask about your
                usage when they reach out, so having it ready speeds the conversation along.
              </div>
            </div>
          </div>

          <button className="btn btn-ghost thanks-reset" onClick={onReset}>
            Start a new quote
          </button>

          <div className="thanks-footer-fine">
            Hold tight — your installer matches are on the way. Save your confirmation # in case you need to
            reference it later.
          </div>
        </div>
      </main>
    </div>
  );
}

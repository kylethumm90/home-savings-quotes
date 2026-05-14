import { Icon } from '../Icon';
import { Logo } from '../Logo';
import type { QuoteData } from '../../lib/types';
import type { SubmitResult } from '../../lib/submitQuote';

type ThanksPageProps = {
  data: QuoteData;
  result: SubmitResult;
  onReset: () => void;
};

const NEXT_STEPS = [
  {
    n: '01',
    t: 'We line up the right folks',
    d: 'In the next hour or so, we pick the 1–3 installers we think will be the best fit for your home.',
    icon: 'spark',
  },
  {
    n: '02',
    t: 'Quotes hit your inbox',
    d: 'Custom offers arrive within 24 hours. Compare them side-by-side at your own pace — no rush, no pressure.',
    icon: 'check',
  },
  {
    n: '03',
    t: 'You pick what works',
    d: 'Choose the installer that fits, lock in $0-down financing if you qualify, and start saving.',
    icon: 'bolt',
  },
];

export function ThanksPage({ data, result, onReset }: ThanksPageProps) {
  const firstName = (data.name || '').split(' ')[0] || 'neighbor';

  return (
    <div className="thanks-page">
      <header className="quiz-header">
        <div className="container quiz-header-row">
          <Logo />
          <div className="quiz-header-meta">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="shield" size={14} /> Secure & private
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="phone" size={14} /> 1-800-555-0142
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
            <span className="thanks-title-accent">Your quotes are on the way.</span>
          </h1>
          <p className="thanks-sub">
            We're already reaching out to up to 3 trusted local installers in <strong>{data.zip}</strong>. Expect
            their offers in your inbox within 24 hours — usually a lot sooner.
          </p>

          <div className="thanks-card">
            <div className="thanks-card-row">
              <span className="lbl">Confirmation #</span>
              <span className="val mono">{result.confirmationId}</span>
            </div>
            <div className="thanks-card-row">
              <span className="lbl">Quotes expected by</span>
              <span className="val">{result.expectedBy ?? 'Tomorrow, 5:00 PM'}</span>
            </div>
            <div className="thanks-card-row">
              <span className="lbl">Sent to</span>
              <span className="val">{data.email}</span>
            </div>
            {data.phone && (
              <div className="thanks-card-row">
                <span className="lbl">Phone</span>
                <span className="val">{data.phone}</span>
              </div>
            )}
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
                Check your spam folder for an email from <strong>hello@homesavingsquotes.com</strong> — add us to
                your contacts so quotes don't get filtered. Have a recent electric bill handy? Snap a photo of
                it, you'll need it to finalize.
              </div>
            </div>
          </div>

          <button className="btn btn-ghost thanks-reset" onClick={onReset}>
            Start a new quote
          </button>

          <div className="thanks-footer-fine">
            Confirmation also sent to <strong>{data.email}</strong>. Need help? Reply to that email or call{' '}
            <strong>1-800-555-0142</strong> Mon–Fri 8a–8p ET.
          </div>
        </div>
      </main>
    </div>
  );
}

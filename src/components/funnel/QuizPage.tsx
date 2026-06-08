import { useEffect, useState, type FormEvent } from 'react';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import type { QuoteData } from '../../lib/types';
import type { SubmitResult } from '../../lib/submitQuote';
import { submitQuote, TCPA_CONSENT_TEXT } from '../../lib/submitQuote';
import { prefetchClientIp } from '../../lib/clientIp';

type QuizPageProps = {
  data: QuoteData;
  setData: (d: QuoteData) => void;
  onComplete: (d: QuoteData, result: SubmitResult) => void;
  onBack: () => void;
};

// Values must match the delivery's valid property-type options exactly — the
// selected value is forwarded as `homeType` with no further mapping needed.
const HOME_TYPES = [
  { value: 'Single Family', sub: 'Detached, one unit', icon: 'home' },
  { value: 'Multi Family', sub: 'Two or more units', icon: 'condo' },
  { value: 'Apartment', sub: 'Unit in a larger building', icon: 'condo' },
  { value: 'Condo', sub: 'Owned unit, shared building', icon: 'condo' },
  { value: 'Manufactured', sub: 'Mobile or modular home', icon: 'home-2story' },
  { value: 'Townhome', sub: 'Attached, owned', icon: 'townhouse' },
  { value: 'Duplex', sub: 'Two attached units', icon: 'townhouse' },
];

const BILL_RANGES = [
  { id: 'low', label: 'Under $100', sub: 'Low usage' },
  { id: 'mid', label: '$100 – $200', sub: 'Average home' },
  { id: 'high', label: '$200 – $350', sub: 'Larger home' },
  { id: 'xhigh', label: 'Over $350', sub: 'High usage' },
];

// Both options proceed — we just want quotes routed appropriately, no "no"
// branch that dead-ends the funnel.
const OWNERSHIP_OPTIONS = [
  { id: 'own', label: 'I own it', sub: 'Homeowner', icon: 'home' },
  { id: 'rent', label: 'I rent it', sub: "Tenant or it's not my place", icon: 'condo' },
];

// Values must match the delivery's valid roof_shade options exactly.
const SHADE_OPTIONS = [
  { value: 'No Shade', sub: 'Roof gets full sun', icon: 'spark' },
  { value: 'Some Shade', sub: 'A few trees or obstructions', icon: 'leaf' },
  { value: 'Full Shade', sub: 'Heavily shaded most of the day', icon: 'leaf' },
  { value: 'Not Sure', sub: "I'm not certain", icon: 'shield' },
];

const STEP_LABELS = ['Own or rent?', 'Home type', 'Electric bill', 'Roof shade', 'Address', 'Your info'];

export function QuizPage({ data: initialData, setData: setParentData, onComplete, onBack }: QuizPageProps) {
  const [data, setLocalData] = useState<QuoteData>(initialData);
  const [step, setStep] = useState(0);
  const [err, setErr] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const totalSteps = STEP_LABELS.length;

  // Resolve the visitor IP as soon as the quiz opens so it's ready at submit.
  useEffect(() => {
    prefetchClientIp();
  }, []);

  useEffect(() => {
    setParentData(data);
    // setParentData identity from the parent isn't stable across renders, and
    // including it would loop; we only care about pushing fresh data up.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const update = <K extends keyof QuoteData>(k: K, v: QuoteData[K]) =>
    setLocalData((d) => ({ ...d, [k]: v }));
  const next = () => {
    setErr('');
    setStep((s) => s + 1);
  };
  const back = () => {
    setErr('');
    if (step === 0) onBack();
    else setStep((s) => s - 1);
  };

  const advanceAddress = (e: FormEvent) => {
    e.preventDefault();
    if (!data.address.trim()) {
      setErr('Please enter your street address.');
      return;
    }
    next();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!data.name.trim()) {
      setErr('Please enter your full name.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      setErr('Please enter a valid email address.');
      return;
    }
    const phoneDigits = data.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setErr('Please enter a valid 10-digit phone number — installers need a way to reach you.');
      return;
    }
    setSubmitting(true);
    try {
      const result = await submitQuote(data);
      onComplete(data, result);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="quiz-page">
      <header className="quiz-header">
        <div className="container quiz-header-row">
          <Logo />
          <div className="quiz-header-meta">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="shield" size={14} /> Secure & private
            </span>
          </div>
        </div>
        <div className="quiz-progress-wrap">
          <div className="container">
            <div className="quiz-progress-row">
              <span className="quiz-progress-label">
                Step {step + 1} of {totalSteps} — {STEP_LABELS[step]}
              </span>
              <span className="quiz-progress-pct">
                {Math.round(((step + 1) / totalSteps) * 100)}%
              </span>
            </div>
            <div className="quiz-progress-bar">
              <div
                className="quiz-progress-fill"
                style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <main className="quiz-main">
        <div className="container quiz-grid">
          <aside className="quiz-rail">
            <div className="quiz-rail-pill">
              <Icon name="pin" size={14} /> Zip <strong>{data.zip}</strong>
            </div>
            <h2 className="quiz-rail-title">Nice to meet you.</h2>
            <p className="quiz-rail-copy">
              We've already helped over <strong>10,000</strong> homeowners shop solar without the door-knock
              pitch. A few quick questions and we'll match you with up to 3 trusted local installers — they'll
              reach out within 24 hours.
            </p>
            <div className="quiz-rail-stats">
              <div>
                <div className="n">$1,420</div>
                <div className="l">Avg. yr-1 savings</div>
              </div>
              <div>
                <div className="n">24hr</div>
                <div className="l">Quote turnaround</div>
              </div>
              <div>
                <div className="n">50</div>
                <div className="l">States covered</div>
              </div>
            </div>
            <div className="quiz-rail-quote">
              <p>
                "Three quotes in one inbox — way easier than the salesperson at my door. Saved $1,840 in year
                one."
              </p>
              <div className="quiz-rail-quote-by">
                <div className="avatar"></div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 13 }}>The Garcia family</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>Tampa, FL</div>
                </div>
              </div>
            </div>
          </aside>

          <section className="quiz-card">
            {step === 0 && (
              <div>
                <h1 className="quiz-q">Do you own or rent?</h1>
                <p className="quiz-sub">
                  We just want to make sure quotes go to the right person — no pressure either way.
                </p>
                <div className="quiz-options">
                  {OWNERSHIP_OPTIONS.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      className={'quiz-option' + (data.ownership === o.id ? ' active' : '')}
                      onClick={() => {
                        update('ownership', o.id);
                        setTimeout(next, 220);
                      }}
                    >
                      <span className="opt-icon">
                        <Icon name={o.icon} size={22} />
                      </span>
                      <span className="opt-body">
                        <span className="opt-label">{o.label}</span>
                        <span className="opt-sub">{o.sub}</span>
                      </span>
                      <span className="opt-chev">
                        <Icon name="arrow-right" size={16} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h1 className="quiz-q">What kind of home is it?</h1>
                <p className="quiz-sub">
                  This helps us match the right installers and size your system.
                </p>
                <div className="quiz-options">
                  {HOME_TYPES.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      className={'quiz-option' + (data.homeType === t.value ? ' active' : '')}
                      onClick={() => {
                        update('homeType', t.value);
                        setTimeout(next, 220);
                      }}
                    >
                      <span className="opt-icon">
                        <Icon name={t.icon} size={22} />
                      </span>
                      <span className="opt-body">
                        <span className="opt-label">{t.value}</span>
                        <span className="opt-sub">{t.sub}</span>
                      </span>
                      <span className="opt-chev">
                        <Icon name="arrow-right" size={16} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h1 className="quiz-q">What's your typical monthly electric bill?</h1>
                <p className="quiz-sub">
                  A rough monthly average is fine — we use it to estimate your savings and system size.
                </p>
                <div className="quiz-options">
                  {BILL_RANGES.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      className={'quiz-option' + (data.bill === b.label ? ' active' : '')}
                      onClick={() => {
                        update('bill', b.label);
                        setTimeout(next, 220);
                      }}
                    >
                      <span className="opt-icon">
                        <Icon name="bolt" size={22} />
                      </span>
                      <span className="opt-body">
                        <span className="opt-label">{b.label}</span>
                        <span className="opt-sub">{b.sub}</span>
                      </span>
                      <span className="opt-chev">
                        <Icon name="arrow-right" size={16} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h1 className="quiz-q">How much shade does your roof get?</h1>
                <p className="quiz-sub">
                  A rough sense is all we need — it helps installers gauge how much sun your panels would see.
                </p>
                <div className="quiz-options">
                  {SHADE_OPTIONS.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      className={'quiz-option' + (data.roofShade === s.value ? ' active' : '')}
                      onClick={() => {
                        update('roofShade', s.value);
                        setTimeout(next, 220);
                      }}
                    >
                      <span className="opt-icon">
                        <Icon name={s.icon} size={22} />
                      </span>
                      <span className="opt-body">
                        <span className="opt-label">{s.value}</span>
                        <span className="opt-sub">{s.sub}</span>
                      </span>
                      <span className="opt-chev">
                        <Icon name="arrow-right" size={16} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <form onSubmit={advanceAddress}>
                <h1 className="quiz-q">What's the address?</h1>
                <p className="quiz-sub">
                  Installers use the address to do a quick satellite roof check and estimate your sunlight
                  hours — that's what shapes an accurate savings number.
                </p>
                <div className="quiz-form">
                  <label className="quiz-field">
                    <span>Street address</span>
                    <input
                      className="quiz-input"
                      autoFocus
                      placeholder="123 Main St"
                      value={data.address}
                      onChange={(e) => update('address', e.target.value)}
                    />
                  </label>
                  <label className="quiz-field">
                    <span>Zip</span>
                    <input className="quiz-input" value={data.zip} disabled />
                  </label>
                </div>
                <div className="quiz-explainer">
                  <div className="quiz-explainer-icon">
                    <Icon name="panel" size={18} />
                  </div>
                  <div>
                    <div className="quiz-explainer-title">Why we ask</div>
                    <div className="quiz-explainer-body">
                      Your address lets installers check the roof remotely, model your sunlight, and price
                      a system that fits your home — no in-person visit needed yet. Never shared with anyone
                      outside the installers we match you with.
                    </div>
                  </div>
                </div>
                {err && <div className="quiz-err">{err}</div>}
                <button className="btn btn-primary btn-lg quiz-submit" type="submit">
                  Continue <Icon name="arrow-right" size={18} />
                </button>
              </form>
            )}

            {step === 5 && (
              // data-tf-element-role="offer" marks the consent form for
              // TrustedForm's tagged-consent capture (paired with the tagged
              // disclaimer + submit below). The hidden inputs are populated by
              // the Jornaya (#leadid_token) and TrustedForm (xxTrustedFormCertUrl)
              // page scripts and read back at submit time in submitQuote.
              <form onSubmit={handleSubmit} data-tf-element-role="offer">
                <input type="hidden" id="leadid_token" name="universal_leadid" defaultValue="" />
                <input type="hidden" id="xxTrustedFormCertUrl" name="xxTrustedFormCertUrl" defaultValue="" />
                <h1 className="quiz-q">How should the installers reach you?</h1>
                <p className="quiz-sub">
                  We'll match you with up to 3 hand-picked local installers within 24 hours — they'll get in
                  touch directly to walk you through pricing. Your info stays between us and the installers we
                  introduce you to — never sold to third parties.
                </p>
                <div className="quiz-form">
                  <label className="quiz-field">
                    <span>Full name</span>
                    <input
                      className="quiz-input"
                      placeholder="Jane Doe"
                      value={data.name}
                      onChange={(e) => update('name', e.target.value)}
                    />
                  </label>
                  <label className="quiz-field">
                    <span>Email address</span>
                    <input
                      className="quiz-input"
                      type="email"
                      placeholder="jane@example.com"
                      value={data.email}
                      onChange={(e) => update('email', e.target.value)}
                    />
                  </label>
                  <label className="quiz-field">
                    <span>Phone</span>
                    <input
                      className="quiz-input"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(555) 123-4567"
                      value={data.phone}
                      onChange={(e) => update('phone', e.target.value)}
                    />
                  </label>
                </div>
                {err && <div className="quiz-err">{err}</div>}
                <button
                  className="btn btn-primary btn-lg quiz-submit"
                  type="submit"
                  disabled={submitting}
                  data-tf-element-role="submit"
                >
                  {submitting ? 'Sending…' : 'Get my free quotes'}{' '}
                  <Icon name="arrow-right" size={18} />
                </button>
                <div className="quiz-fine" data-tf-element-role="consent-language">
                  {TCPA_CONSENT_TEXT}
                </div>
              </form>
            )}

            <button className="quiz-back" onClick={back} type="button">
              ← {step === 0 ? 'Back to landing' : 'Back'}
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

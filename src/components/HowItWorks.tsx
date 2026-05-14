import { ImagePlaceholder } from './ImagePlaceholder';

const STEPS = [
  {
    n: '01',
    t: 'Tell us a little about your home',
    d: 'Your zip, home type, and rough electric bill — that’s it. Takes under 60 seconds.',
    emoji: 'home',
  },
  {
    n: '02',
    t: 'We line up the right installers',
    d: 'We hand-pick up to 3 trusted local installers and ask them to quote your home directly.',
    emoji: 'spark',
  },
  {
    n: '03',
    t: 'You pick what works for you',
    d: 'Compare offers side-by-side in your inbox. No pressure, no salesperson at your door, ever.',
    emoji: 'bolt',
  },
];

export function HowItWorks() {
  return (
    <section id="how" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span className="sec-eyebrow">How it works</span>
            <h2 className="sec-title">
              From bill to install,
              <br />
              in three friendly steps.
            </h2>
          </div>
          <p className="sec-sub">
            No one knocking on your door. No mystery pricing. Answer a few quick questions, get hand-picked offers
            from local installers, and choose the one that fits your home.
          </p>
        </div>
        <div className="hiw-grid">
          {STEPS.map((s) => (
            <div className="hiw-card" key={s.n}>
              <span className="hiw-step">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <div className="hiw-illo">
                <ImagePlaceholder height={120} illu label={`[ ${s.emoji} illustration ]`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

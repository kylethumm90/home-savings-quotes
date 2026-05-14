import hiw1 from '../assets/hiw-1.png';
import hiw2 from '../assets/hiw-2.png';
import hiw3 from '../assets/hiw-3.png';

const STEPS = [
  {
    n: '01',
    t: 'Tell us a little about your home',
    d: 'Your zip, home type, and rough electric bill — that’s it. Takes under 60 seconds.',
    img: hiw1,
    alt: 'Home exterior with overlaid ZIP, home type, and monthly bill data chips.',
  },
  {
    n: '02',
    t: 'We line up the right installers',
    d: 'We hand-pick up to 3 trusted local installers and ask them to quote your home directly.',
    img: hiw2,
    alt: 'A solar installer reviewing options with a homeowner couple on a tablet, with installer rating cards.',
  },
  {
    n: '03',
    t: 'You pick what works for you',
    d: 'Compare offers side-by-side in your inbox. No pressure, no salesperson at your door, ever.',
    img: hiw3,
    alt: 'Phone showing a side-by-side comparison of three solar installer offers.',
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
                <img className="hiw-illo-img" src={s.img} alt={s.alt} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

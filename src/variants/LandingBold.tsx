import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { Nav } from '../components/Nav';
import { TrustBar } from '../components/TrustBar';
import { HowItWorks } from '../components/HowItWorks';
import { SavingsCalculator } from '../components/SavingsCalculator';
import { FAQ } from '../components/FAQ';
import { CTABanner } from '../components/CTABanner';
import { Footer } from '../components/Footer';
import { ZipCard } from '../components/funnel/ZipCard';
import { QuizPage } from '../components/funnel/QuizPage';
import { ThanksPage } from '../components/funnel/ThanksPage';
import { useFunnelFlow } from '../lib/useFunnelFlow';

const STATS = [
  { n: '10,000+', l: 'Homeowners helped' },
  { n: '$1,420', l: 'Avg. yr-1 savings' },
  { n: '24hr', l: 'Quote turnaround' },
];

// V3 "Coastal Calm" — sage/celadon + slate + coral. Centered prominent zip
// card with radial glows.
export function LandingBold() {
  const flow = useFunnelFlow();

  if (flow.phase === 'quiz') {
    return (
      <div className="lp v3">
        <QuizPage
          data={flow.data}
          setData={flow.setData}
          onComplete={flow.completeQuiz}
          onBack={flow.backToLanding}
        />
      </div>
    );
  }
  if (flow.phase === 'thanks' && flow.result) {
    return (
      <div className="lp v3">
        <ThanksPage data={flow.data} result={flow.result} onReset={flow.reset} />
      </div>
    );
  }

  return (
    <div className="lp v3">
      <div
        className="hero-bg"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #fdf3ec 0%, #fffaf3 80%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(224,122,59,0.16) 0%, rgba(224,122,59,0) 70%)',
            pointerEvents: 'none',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: 400,
            left: -300,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(224,122,59,0.08) 0%, rgba(224,122,59,0) 70%)',
            pointerEvents: 'none',
          }}
        ></div>

        <div className="container" style={{ position: 'relative' }}>
          <Nav />

          <div className="hero">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 0.9fr',
                gap: 64,
                alignItems: 'center',
              }}
            >
              <div>
                <span className="hero-eyebrow">
                  <span className="pip"></span> Friendly help in all 50 states
                </span>
                <h1>
                  Your power bill,
                  <br />
                  <span className="accent">rewritten.</span>
                </h1>
                <p className="lead">
                  A friendlier way to shop solar. Get matched with trusted local installers in about a minute,
                  compare up to 3 offers at your own pace, and lock in $0-down savings without anyone showing up
                  at your door.
                </p>

                <div
                  style={{
                    marginTop: 48,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 0,
                    borderTop: '1px solid var(--line)',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  {STATS.map((s, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '22px 24px 22px 0',
                        borderLeft: i ? '1px solid var(--line)' : 'none',
                        paddingLeft: i ? 24 : 0,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 30,
                          fontWeight: 700,
                          letterSpacing: '-0.02em',
                          color: 'var(--ink)',
                        }}
                      >
                        {s.n}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 4 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: -20,
                    borderRadius: 28,
                    background:
                      'radial-gradient(circle at 50% 50%, rgba(224,122,59,0.20), transparent 70%)',
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                  }}
                ></div>
                <ZipCard
                  onSubmit={flow.startQuiz}
                  headline="Start your free quote."
                  sub="Just your zip to begin — we'll see if your area qualifies and line up offers from trusted local installers."
                />
              </div>
            </div>

            <div style={{ marginTop: 72, position: 'relative' }}>
              <ImagePlaceholder
                label="[ photo · modern home twilight + solar array, dramatic ]"
                height={320}
              />
            </div>
          </div>

          <TrustBar />
        </div>
      </div>

      <HowItWorks />
      <SavingsCalculator onGetQuote={flow.focusZip} />
      <FAQ />
      <CTABanner onGetQuote={flow.focusZip} />
      <div className="container">
        <Footer />
      </div>
    </div>
  );
}

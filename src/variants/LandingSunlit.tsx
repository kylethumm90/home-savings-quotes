import { Icon } from '../components/Icon';
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

// V2 "Sunshine Magazine" — saturated sun-yellow + near-black, editorial serif.
export function LandingSunlit() {
  const flow = useFunnelFlow();

  if (flow.phase === 'quiz') {
    return (
      <div className="lp v2">
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
      <div className="lp v2">
        <ThanksPage data={flow.data} result={flow.result} onReset={flow.reset} />
      </div>
    );
  }

  return (
    <div className="lp v2">
      <div className="hero-bg">
        <div className="container">
          <Nav />

          <div className="hero">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.05fr 0.95fr',
                gap: 56,
                alignItems: 'flex-start',
              }}
            >
              <div>
                <span className="hero-eyebrow">
                  <span className="pip"></span>Free · No obligation · 50 states
                </span>
                <h1>
                  The sun pays
                  <br />
                  <span className="accent">your bill</span> now.
                </h1>
                <p className="lead">
                  Compare quotes from up to 3 friendly local installers — built around your home, your bill, and
                  the rebates you actually qualify for. No high-pressure sales. No surprises.
                </p>

                <div
                  style={{
                    marginTop: 40,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 24,
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ display: 'flex', marginRight: -8 }}>
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 999,
                            background: ['#f5b800', '#c98b00', '#0e0e0e', '#2a2a2a'][i],
                            border: '2px solid var(--bg)',
                            marginLeft: i ? -8 : 0,
                          }}
                        ></div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
                        10,000+ homeowners
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>helped since 2019</div>
                    </div>
                  </div>
                  <div style={{ width: 1, height: 36, background: 'var(--line)' }}></div>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: 'var(--ink)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <Icon name="home" size={16} stroke="#f5b800" />
                      Trusted local installers
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>Hand-picked in every market</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <ImagePlaceholder
                  label="[ photo · craftsman home with rooftop solar, warm light ]"
                  height={240}
                />
                <ZipCard onSubmit={flow.startQuiz} />
              </div>
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

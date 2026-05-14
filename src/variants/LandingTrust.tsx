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

// V1 "Neighborly" — forest-green + terracotta on warm cream. Photo-led split
// hero with floating testimonial badge.
export function LandingTrust() {
  const flow = useFunnelFlow();

  if (flow.phase === 'quiz') {
    return (
      <div className="lp v1">
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
      <div className="lp v1">
        <ThanksPage data={flow.data} result={flow.result} onReset={flow.reset} />
      </div>
    );
  }

  return (
    <div className="lp v1">
      <div className="hero-bg">
        <div className="container">
          <Nav />

          <div className="hero">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 56,
                alignItems: 'center',
              }}
            >
              <div>
                <span className="hero-eyebrow">
                  <span className="pip"></span> Free · No obligation · All 50 states
                </span>
                <h1>
                  Cut your electric bill <span className="accent">roughly in half.</span> Find out how in about a
                  minute.
                </h1>
                <p className="lead">
                  We line up free quotes from up to 3 friendly local solar installers. You compare offers at your
                  own pace — $0-down financing available if you qualify.
                </p>

                <div className="hero-stats">
                  <div className="hero-stat">
                    <div className="n">$1,420</div>
                    <div className="l">Avg. 1st-year savings</div>
                  </div>
                  <div className="hero-stat">
                    <div className="n">10,000+</div>
                    <div className="l">Homeowners helped</div>
                  </div>
                  <div className="hero-stat">
                    <div className="n">24hr</div>
                    <div className="l">Quote turnaround</div>
                  </div>
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <ImagePlaceholder
                  label="[ photo · suburban home + rooftop panels at golden hour ]"
                  height={460}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: -16,
                    left: 24,
                    background: 'var(--card)',
                    padding: 16,
                    borderRadius: 16,
                    boxShadow: 'var(--card-shadow)',
                    border: '1px solid var(--card-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    maxWidth: 280,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'var(--brand-tint)',
                      color: 'var(--brand)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon name="bolt" size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
                      The Garcia family · Tampa, FL
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>
                      Saved $1,840 in year one
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 56 }}>
              <ZipCard onSubmit={flow.startQuiz} />
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

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
import type { HeroStyle } from '../lib/TweaksContext';
import heroImg from '../assets/hsq-hero.png';

type LandingBoldProps = { heroStyle?: HeroStyle };

const HERO_LABELS: Record<HeroStyle, string> = {
  photo: '[ photo · modern home twilight + solar array, dramatic ]',
  illustration: '[ abstract gradient + solar grid pattern ]',
  bill: '[ before/after bill — dollars vs. zero ]',
};

const STATS = [
  { n: '10,000+', l: 'Homeowners helped' },
  { n: '$1,420', l: 'Avg. yr-1 savings' },
  { n: '24hr', l: 'Quote turnaround' },
];

// V3 "Coastal Calm" — sage/celadon + slate + coral. Centered prominent zip
// card with radial glows.
export function LandingBold({ heroStyle = 'photo' }: LandingBoldProps) {
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

          <div className="hero hero-v3">
            <span className="hero-eyebrow hero-v3-eyebrow">
              <span className="pip"></span> Friendly help in all 50 states
            </span>
            <h1 className="hero-v3-title">
              Your power bill,
              <br />
              <span className="accent">rewritten.</span>
            </h1>

            <div className="hero-v3-zip-wrap">
              <div className="hero-v3-zip-glow" aria-hidden="true"></div>
              <ZipCard
                onSubmit={flow.startQuiz}
                headline="Start your free quote."
                sub="Just your zip to begin — we'll see if your area qualifies and line up offers from trusted local installers."
              />
            </div>

            <p className="lead hero-v3-lead">
              A friendlier way to shop solar. Get matched with trusted local installers in about a minute,
              compare up to 3 offers at your own pace, and lock in $0-down savings without anyone showing up at
              your door.
            </p>

            <div className="hero-v3-stats">
              {STATS.map((s, i) => (
                <div key={i} className={'hero-v3-stat' + (i ? ' divided' : '')}>
                  <div className="hero-v3-stat-n">{s.n}</div>
                  <div className="hero-v3-stat-l">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="hero-v3-photo">
              {heroStyle === 'photo' ? (
                <img
                  className="hero-photo"
                  src={heroImg}
                  alt="Modern home at twilight with rooftop solar panels and benefit callouts: lower bills, smart upgrades, peace of mind."
                />
              ) : (
                <ImagePlaceholder
                  label={HERO_LABELS[heroStyle]}
                  height={320}
                  illu={heroStyle === 'illustration'}
                />
              )}
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

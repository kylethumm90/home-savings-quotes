import { Icon } from './Icon';

type CTABannerProps = { onGetQuote: () => void };

export function CTABanner({ onGetQuote }: CTABannerProps) {
  return (
    <section style={{ background: 'var(--bg)', paddingTop: 0 }}>
      <div className="container">
        <div className="cta-banner">
          <h2>
            Let's see what your
            <br />
            roof could save you.
          </h2>
          <p>
            Find out what solar would cost on your home — takes about a minute, costs nothing, and there's no
            salesperson at your door.
          </p>
          <button className="btn btn-primary btn-lg" onClick={onGetQuote}>
            Start my free quote <Icon name="arrow-right" size={18} />
          </button>
          <div style={{ marginTop: 18, fontSize: 13, opacity: 0.6 }}>
            10,000+ homeowners helped · All 50 states
          </div>
        </div>
      </div>
    </section>
  );
}

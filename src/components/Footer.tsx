import { Logo } from './Logo';
import { navigate } from '../lib/useRoute';

const BUSINESS_PHONE_DISPLAY = '(844) 282-6538';
const BUSINESS_PHONE_TEL = '+18442826538';

function toPrivacy(e: React.MouseEvent) {
  e.preventDefault();
  navigate('/privacy-policy-tos');
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div style={{ maxWidth: 320 }}>
            <Logo />
            <p style={{ marginTop: 14, fontSize: 13, color: 'var(--ink-mute)', lineHeight: 1.6 }}>
              Helping homeowners across all 50 states compare friendly local solar offers since 2019.
            </p>
            <p style={{ marginTop: 14, fontSize: 13, color: 'var(--ink-mute)', lineHeight: 1.6 }}>
              Questions? Call us at{' '}
              <a
                href={`tel:${BUSINESS_PHONE_TEL}`}
                style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'none' }}
              >
                {BUSINESS_PHONE_DISPLAY}
              </a>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap', fontSize: 13 }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>Product</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--ink-mute)' }}>
                <a style={{ color: 'inherit', textDecoration: 'none' }} href="#how">How it works</a>
                <a style={{ color: 'inherit', textDecoration: 'none' }} href="#savings">Savings calculator</a>
                <a style={{ color: 'inherit', textDecoration: 'none' }} href="#faq">FAQ</a>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>Company</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--ink-mute)' }}>
                <a style={{ color: 'inherit', textDecoration: 'none' }} href="#">About</a>
                <a style={{ color: 'inherit', textDecoration: 'none' }} href="#">Installer network</a>
                <a style={{ color: 'inherit', textDecoration: 'none' }} href="#">Press</a>
                <a style={{ color: 'inherit', textDecoration: 'none' }} href="#">Careers</a>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>Contact &amp; Legal</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--ink-mute)' }}>
                <a style={{ color: 'inherit', textDecoration: 'none' }} href={`tel:${BUSINESS_PHONE_TEL}`}>
                  {BUSINESS_PHONE_DISPLAY}
                </a>
                <a style={{ color: 'inherit', textDecoration: 'none' }} href="/privacy-policy-tos" onClick={toPrivacy}>
                  Privacy Policy
                </a>
                <a style={{ color: 'inherit', textDecoration: 'none' }} href="/privacy-policy-tos" onClick={toPrivacy}>
                  Terms &amp; Conditions
                </a>
                <a style={{ color: 'inherit', textDecoration: 'none' }} href="/privacy-policy-tos" onClick={toPrivacy}>
                  Do not sell my info
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-fine">
          © 2026 HomeSavingsQuotes, Inc. · 1234 Solar Way, Suite 200, Denver CO 80202 ·{' '}
          <a href={`tel:${BUSINESS_PHONE_TEL}`} style={{ color: 'inherit' }}>
            {BUSINESS_PHONE_DISPLAY}
          </a>
          . Savings estimates are illustrative and assume residential roof conditions, average sun exposure, and
          currently-available local incentives. Actual savings depend on your home, utility rate, system size, and
          financing terms. HomeSavingsQuotes is a lead-matching service; we do not install systems.
        </div>
      </div>
    </footer>
  );
}

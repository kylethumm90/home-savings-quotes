import { Logo } from './Logo';
import { Footer } from './Footer';
import { navigate } from '../lib/useRoute';

const BUSINESS_PHONE_DISPLAY = '(844) 282-6538';
const BUSINESS_PHONE_TEL = '+18442826538';
const SUPPORT_EMAIL = 'support@homesavingsquotes.com';
const LAST_UPDATED = 'April 1, 2026';

function goHome(e: React.MouseEvent) {
  e.preventDefault();
  navigate('/');
}

// Standalone Privacy Policy + Terms of Service page served at
// /privacy-policy-tos. The "Consent to Contact" section carries the
// SMS/TCPA disclosures required for our 10DLC campaign registration
// (message frequency, message & data rates, STOP/HELP, and the statement
// that mobile opt-in data is never shared with third parties for marketing).
export function PrivacyTerms() {
  return (
    <div className="lp v3">
      <div className="container">
        <header className="legal-topbar">
          <Logo />
          <a href="/" onClick={goHome} className="legal-back">
            ← Back to home
          </a>
        </header>

        <main className="legal-page">
          <p className="legal-eyebrow">Legal</p>
          <h1 className="legal-title">Privacy Policy &amp; Terms of Service</h1>

          <section className="legal-section">
            <ul className="legal-contact">
              <li>
                <strong>Phone:</strong>{' '}
                <a href={`tel:${BUSINESS_PHONE_TEL}`}>{BUSINESS_PHONE_DISPLAY}</a>
              </li>
              <li>
                <strong>Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              </li>
            </ul>
          </section>

          <h2 className="legal-h1">Privacy Policy</h2>
          <p className="legal-effective">Last Updated: {LAST_UPDATED}</p>

          <p className="legal-intro">
            At homesavingsquotes.com, we respect your privacy. This policy outlines how we collect, use, and protect
            your information when you request a solar quote.
          </p>

          <section className="legal-section">
            <h2>1. Information We Collect</h2>
            <p>To provide you with accurate solar estimates, we collect the following:</p>
            <ul>
              <li>
                <strong>Contact Information:</strong> Name, email address, and phone number.
              </li>
              <li>
                <strong>Property Details:</strong> Physical address and home ownership status.
              </li>
              <li>
                <strong>Utility Data:</strong> Monthly electricity costs or average usage.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type, and cookies to improve site performance.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the data provided to:</p>
            <ul>
              <li>Connect you with qualified solar installers in your area.</li>
              <li>Verify your eligibility for solar incentives and rebates.</li>
              <li>Improve our website functionality and user experience.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Sharing of Information</h2>
            <p>
              By submitting your information, you provide express written consent for us to share your details with
              our network of solar partners. These partners may contact you via phone, email, or SMS to provide
              quotes.
            </p>
            <p>
              No mobile information will be shared with third parties or affiliates for marketing or promotional
              purposes. Text-messaging originator opt-in data and consent are not shared with any third parties.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data from unauthorized access.
              However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to access, delete, or opt-out of the sale of your
              personal information. To exercise these rights, contact us at{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
            </p>
          </section>

          <h2 className="legal-h1">Terms of Service</h2>
          <p className="legal-effective">Last Updated: {LAST_UPDATED}</p>

          <p className="legal-intro">
            By using homesavingsquotes.com, you agree to the following terms and conditions.
          </p>

          <section className="legal-section">
            <h2>1. Service Description</h2>
            <p>
              Homesavingsquotes.com is a lead-referral platform. We do not provide solar installations ourselves; we
              connect users with third-party solar providers. We do not guarantee the pricing or workmanship of these
              third parties.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Consent to Contact (TCPA Compliance)</h2>
            <p>
              By clicking &ldquo;Submit&rdquo; or &ldquo;Get My Quote,&rdquo; you provide your express written consent
              to be contacted by homesavingsquotes.com and our partners at the phone number provided.
            </p>
            <ul>
              <li>This may include calls or text messages using automated technology or pre-recorded voices.</li>
              <li>Consent is not a condition of purchase.</li>
              <li>Message frequency varies.</li>
              <li>Message and data rates may apply.</li>
              <li>
                You may opt-out at any time by replying &ldquo;STOP&rdquo; to any text message received. Reply
                &ldquo;HELP&rdquo; for help, or contact us at{' '}
                <a href={`tel:${BUSINESS_PHONE_TEL}`}>{BUSINESS_PHONE_DISPLAY}</a>.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. User Accuracy</h2>
            <p>
              You agree to provide accurate and truthful information. Providing false data may result in an inability
              to receive quotes or the termination of your access to the site.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Limitation of Liability</h2>
            <p>
              Homesavingsquotes.com shall not be held liable for any damages arising from your interaction with
              third-party solar installers or the use of this website. All services are provided &ldquo;as-is.&rdquo;
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Intellectual Property</h2>
            <p>
              All content, logos, and designs on this website are the property of homesavingsquotes.com and may not be
              used without prior written consent.
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

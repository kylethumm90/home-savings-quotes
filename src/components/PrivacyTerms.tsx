import { Logo } from './Logo';
import { Footer } from './Footer';
import { navigate } from '../lib/useRoute';

const BUSINESS_PHONE_DISPLAY = '(844) 282-6538';
const BUSINESS_PHONE_TEL = '+18442826538';
const SUPPORT_EMAIL = 'support@homesavingsquotes.com';
const PRIVACY_EMAIL = 'privacy@homesavingsquotes.com';
const EFFECTIVE_DATE = 'June 17, 2026';

function goHome(e: React.MouseEvent) {
  e.preventDefault();
  navigate('/');
}

// Standalone Privacy Policy + Terms & Conditions page served at
// /privacy-policy-tos. The SMS / text-messaging section is required for our
// 10DLC campaign registration and follows CTIA / carrier guidance — including
// the explicit statement that opt-in mobile data is never shared with third
// parties for marketing.
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
          <h1 className="legal-title">Privacy Policy &amp; Terms and Conditions</h1>
          <p className="legal-effective">Last updated: {EFFECTIVE_DATE}</p>

          <p className="legal-intro">
            This page describes how HomeSavingsQuotes, Inc. (&ldquo;HomeSavingsQuotes,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares information about you, and the terms
            that govern your use of our website and services. By using our website or submitting a request for a
            quote, you agree to this Privacy Policy and these Terms and Conditions.
          </p>

          <section className="legal-section">
            <h2>Quick contact</h2>
            <ul className="legal-contact">
              <li>
                <strong>Phone:</strong>{' '}
                <a href={`tel:${BUSINESS_PHONE_TEL}`}>{BUSINESS_PHONE_DISPLAY}</a>
              </li>
              <li>
                <strong>Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              </li>
              <li>
                <strong>Mailing address:</strong> 1234 Solar Way, Suite 200, Denver, CO 80202
              </li>
            </ul>
          </section>

          <h2 className="legal-h1">Privacy Policy</h2>

          <section className="legal-section">
            <h2>1. Information we collect</h2>
            <p>
              We collect information you provide directly to us when you request a quote or contact us, including
              your name, postal address, ZIP code, email address, telephone number, home ownership status, property
              and energy-usage details, and any other information you choose to share. We also automatically collect
              certain technical information when you visit our site, such as your IP address, browser type, device
              identifiers, the pages you view, and the referring page or campaign (including UTM parameters).
            </p>
          </section>

          <section className="legal-section">
            <h2>2. How we use your information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Match you with up to three trusted local solar installers and facilitate your free quote;</li>
              <li>Contact you by phone, email, or text message about your quote request and related offers;</li>
              <li>Operate, maintain, improve, and personalize our website and services;</li>
              <li>Measure the performance of our marketing and prevent fraud or abuse; and</li>
              <li>Comply with applicable laws and enforce our Terms and Conditions.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. How we share your information</h2>
            <p>
              HomeSavingsQuotes is a lead-matching service; we do not install solar systems. When you submit a quote
              request, we share the information you provide with the matched solar installers and service partners so
              they can prepare and present offers to you. We may also share information with vendors who perform
              services on our behalf (such as hosting, analytics, and customer support), and as required by law or to
              protect our rights.
            </p>
            <p className="legal-callout">
              <strong>Text messaging / SMS opt-in data is treated differently.</strong> No mobile information will be
              shared with third parties or affiliates for marketing or promotional purposes. Text-messaging
              originator opt-in data and consent are never shared with any third parties or affiliates. Information
              sharing with subcontractors strictly to support customer-service functions is permitted.
            </p>
          </section>

          <section className="legal-section" id="sms">
            <h2>4. SMS / text messaging program &amp; consent</h2>
            <p>
              By providing your mobile telephone number and submitting a quote request, you consent to receive
              recurring autodialed and prerecorded marketing and informational text (SMS/MMS) messages from
              HomeSavingsQuotes and our matched installers at the number provided. Consent is{' '}
              <strong>not a condition of any purchase</strong>.
            </p>
            <ul>
              <li>
                <strong>Message frequency:</strong> Message frequency varies based on your activity and quote
                status.
              </li>
              <li>
                <strong>Message &amp; data rates:</strong> Message and data rates may apply. Check with your wireless
                carrier for details.
              </li>
              <li>
                <strong>Opting out:</strong> Reply <strong>STOP</strong> at any time to cancel. After you send STOP,
                we will send one final message to confirm you have been unsubscribed, and you will no longer receive
                messages from that program.
              </li>
              <li>
                <strong>Help:</strong> Reply <strong>HELP</strong> for help, or contact us at{' '}
                <a href={`tel:${BUSINESS_PHONE_TEL}`}>{BUSINESS_PHONE_DISPLAY}</a> or{' '}
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
              </li>
              <li>
                <strong>Carrier liability:</strong> Carriers are not liable for delayed or undelivered messages.
              </li>
            </ul>
            <p>
              No mobile information will be shared with third parties or affiliates for marketing or promotional
              purposes. All categories of opt-in data exclude text-messaging originator opt-in data and consent; this
              information will not be shared with any third parties.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Cookies and analytics</h2>
            <p>
              We and our service providers use cookies, pixels, and similar technologies to operate our site,
              remember your preferences, and understand how our site is used. You can control cookies through your
              browser settings, though some features may not function properly if cookies are disabled.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Your choices and rights</h2>
            <p>
              You may opt out of marketing emails by following the unsubscribe instructions in any message, opt out
              of text messages by replying STOP, and request access to, correction of, or deletion of your personal
              information by contacting us at <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. Depending on
              where you live, you may have additional rights under applicable privacy laws, including the right not to
              be discriminated against for exercising those rights.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Data security and retention</h2>
            <p>
              We maintain reasonable administrative, technical, and physical safeguards designed to protect your
              information. We retain personal information for as long as needed to provide our services and for
              legitimate business or legal purposes. No method of transmission or storage is completely secure, and
              we cannot guarantee absolute security.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Children&rsquo;s privacy</h2>
            <p>
              Our services are intended for adults and are not directed to children under 18. We do not knowingly
              collect personal information from children.
            </p>
          </section>

          <h2 className="legal-h1">Terms and Conditions</h2>

          <section className="legal-section">
            <h2>9. Service description</h2>
            <p>
              HomeSavingsQuotes provides a free service that matches homeowners with local solar installers. We are
              not a solar installer, contractor, lender, or utility, and we do not sell, install, or finance solar
              systems. Any agreement for products or services is solely between you and the installer you choose.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. No guarantee of savings</h2>
            <p>
              Savings estimates shown on our site are illustrative only and assume residential roof conditions,
              average sun exposure, and currently-available local incentives. Actual savings and pricing depend on
              your home, utility rate, system size, financing terms, and other factors, and are determined by the
              installer. We make no warranty regarding the offers, products, or services provided by any installer.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Eligibility and acceptable use</h2>
            <p>
              You must be at least 18 years old and a legal resident of the United States to use our services. You
              agree to provide accurate information, to use the site only for lawful purposes, and not to interfere
              with the operation of the site or attempt to gain unauthorized access to our systems.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Intellectual property</h2>
            <p>
              All content on this site, including text, graphics, logos, and software, is owned by or licensed to
              HomeSavingsQuotes and is protected by intellectual-property laws. You may not reproduce, distribute, or
              create derivative works without our prior written permission.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. Disclaimers and limitation of liability</h2>
            <p>
              The site and services are provided &ldquo;as is&rdquo; without warranties of any kind, express or
              implied. To the fullest extent permitted by law, HomeSavingsQuotes will not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising out of or relating to your use of the
              site or services or any installer relationship.
            </p>
          </section>

          <section className="legal-section">
            <h2>14. Changes to these terms</h2>
            <p>
              We may update this Privacy Policy and these Terms and Conditions from time to time. When we do, we will
              revise the &ldquo;Last updated&rdquo; date above. Your continued use of the site after changes take
              effect constitutes your acceptance of the revised terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>15. Contact us</h2>
            <p>
              If you have questions about this Privacy Policy or these Terms and Conditions, contact us at:
            </p>
            <ul className="legal-contact">
              <li>HomeSavingsQuotes, Inc.</li>
              <li>1234 Solar Way, Suite 200, Denver, CO 80202</li>
              <li>
                Phone: <a href={`tel:${BUSINESS_PHONE_TEL}`}>{BUSINESS_PHONE_DISPLAY}</a>
              </li>
              <li>
                Email: <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
              </li>
            </ul>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

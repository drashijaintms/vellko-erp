import ContactFormSection from '../components/common/ContactFormSection';

export default function PrivacyPolicy() {
  return (
    <div className="legal-page-wrapper">
      {/* Header Banner */}
      <section className="legal-hero-section">
        <div className="legal-hero-container">
          <h1 className="legal-hero-title">
            Privacy <span className="red-highlight">Policy</span>
          </h1>
          <p className="legal-hero-subtitle">
            Privacy Policy for VellkoERP.com • Learn how Vellko ERP collects, uses, and protects your information.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <section className="legal-content-section">
        <div className="legal-content-container">

          {/* Introduction Card */}
          <div className="legal-card">
            <h2 className="legal-section-title">Introduction</h2>
            <div className="legal-text">
              <p>
                This Privacy Policy explains how <strong>Vellko ERP</strong> (<strong>"we"</strong>, <strong>"our"</strong>, <strong>"us"</strong>) collects, uses, and protects your information when you access and use our website (<strong>vellkoerp.com</strong>) and our suite of cloud-based enterprise solutions and services.
              </p>
              <p>
                By using the website or subscribing to our services, you consent to the data collection and usage practices described in this Privacy Policy.
              </p>
            </div>
          </div>

          {/* Section 1: Information We Collect */}
          <div className="legal-card">
            <h2 className="legal-section-title">1. Information We Collect</h2>
            <div className="legal-text">
              <p>We may collect personal and organizational information, including but not limited to:</p>
              <ul className="legal-list">
                <li><strong>Personal Identification Details:</strong> Name, work email address, phone number, and job title.</li>
                <li><strong>Business & Billing Details:</strong> Company name, registered address, GST number, and business operations details.</li>
                <li><strong>Payment Information:</strong> Transaction identifiers and payment logs (securely processed via authorized third-party gateways).</li>
                <li><strong>Technical Data:</strong> IP address, browser type, operating system, device identifiers, and network information.</li>
                <li><strong>Usage Data & Analytics:</strong> Pages visited, features utilized, session duration, and cookies.</li>
              </ul>
            </div>
          </div>

          {/* Section 2: How We Use Your Information */}
          <div className="legal-card">
            <h2 className="legal-section-title">2. How We Use Your Information</h2>
            <div className="legal-text">
              <p>We use the collected data for the following essential business purposes:</p>
              <ul className="legal-list">
                <li>Provide, operate, maintain, and support our cloud ERP platform and modules.</li>
                <li>Process transactions, billing, subscription renewals, and service requests.</li>
                <li>Improve website functionality, user experience, feature performance, and application speed.</li>
                <li>Communicate critical product updates, service notices, technical alerts, and customer support responses.</li>
                <li>Ensure data integrity, prevent unauthorized access, mitigate security threats, and prevent fraud.</li>
              </ul>
            </div>
          </div>

          {/* Section 3: Cookies and Tracking */}
          <div className="legal-card">
            <h2 className="legal-section-title">3. Cookies and Tracking</h2>
            <div className="legal-text">
              <p>We use cookies, web beacons, and similar tracking technologies to:</p>
              <ul className="legal-list">
                <li>Enhance your browsing experience and provide persistent session authentication.</li>
                <li>Analyze aggregate website traffic, page visits, and feature usage patterns.</li>
                <li>Store your preferences and user interface settings.</li>
              </ul>
              <p>You can choose to disable cookies through your individual browser settings; however, disabling certain cookies may affect the functionality of specific website features.</p>
            </div>
          </div>

          {/* Section 4: Data Sharing */}
          <div className="legal-card">
            <h2 className="legal-section-title">4. Data Sharing & Disclosure</h2>
            <div className="legal-text">
              <p>
                <strong>We do not sell, rent, or trade your personal data.</strong> However, we may share relevant data with trusted third parties under strict confidentiality and security agreements:
              </p>
              <ul className="legal-list">
                <li><strong>Payment Processors:</strong> Authorized payment gateways (e.g., Razorpay) to complete financial transactions.</li>
                <li><strong>Infrastructure & Hosting Providers:</strong> Secure cloud service providers and server infrastructure hosting our platform.</li>
                <li><strong>Legal & Regulatory Authorities:</strong> Law enforcement or judicial bodies if required by applicable Indian law, court order, or governmental mandate.</li>
              </ul>
            </div>
          </div>

          {/* Section 5: Data Security */}
          <div className="legal-card">
            <h2 className="legal-section-title">5. Data Security</h2>
            <div className="legal-text">
              <p>
                We implement robust physical, technical, and administrative security measures to protect your personal and business data against unauthorized access, loss, misuse, or alteration. These include encryption in transit and at rest, role-based access controls, and periodic security evaluations.
              </p>
              <p>
                However, please note that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>
          </div>

          {/* Section 6: Third-Party Services */}
          <div className="legal-card">
            <h2 className="legal-section-title">6. Third-Party Services</h2>
            <div className="legal-text">
              <p>
                Our website and documentation may contain links to external third-party websites or services. Vellko ERP is not responsible for the privacy practices, terms of service, or content of those external websites. We encourage you to review the privacy policies of any third-party websites you visit.
              </p>
            </div>
          </div>

          {/* Section 7: Data Retention */}
          <div className="legal-card">
            <h2 className="legal-section-title">7. Data Retention</h2>
            <div className="legal-text">
              <p>
                We retain your personal and business data only for as long as is necessary to fulfill the purposes outlined in this Privacy Policy, provide ongoing services, resolve disputes, enforce agreements, and comply with legal and regulatory obligations.
              </p>
            </div>
          </div>

          {/* Section 8: User Rights */}
          <div className="legal-card">
            <h2 className="legal-section-title">8. User Rights</h2>
            <div className="legal-text">
              <p>As a user, you have the following rights regarding your personal information:</p>
              <ul className="legal-list">
                <li><strong>Right to Access:</strong> Request access to the personal information we hold about you.</li>
                <li><strong>Right to Correction:</strong> Request updates or corrections to any inaccurate or incomplete personal data.</li>
                <li><strong>Right to Deletion:</strong> Request the deletion or erasure of your personal information, subject to legal retention obligations.</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw your consent for non-essential communications or data processing activities where applicable.</li>
              </ul>
            </div>
          </div>

          {/* Section 9: Children's Privacy */}
          <div className="legal-card">
            <h2 className="legal-section-title">9. Children’s Privacy</h2>
            <div className="legal-text">
              <p>
                Our services, products, and website are strictly intended for business professionals and organizations, and are not directed to individuals under 18 years of age. We do not knowingly collect personal information from minors.
              </p>
            </div>
          </div>

          {/* Section 10: Changes to Policy */}
          <div className="legal-card">
            <h2 className="legal-section-title">10. Changes to This Privacy Policy</h2>
            <div className="legal-text">
              <p>
                Vellko ERP reserves the right to update or modify this Privacy Policy at any time. Any changes will become effective immediately upon posting on this page. Your continued use of the website and services following the publication of changes constitutes your acceptance of the revised Privacy Policy.
              </p>
            </div>
          </div>

          {/* Section 11: Contact Us & Governing Law */}
          <div className="legal-card">
            <h2 className="legal-section-title">11. Contact Us & Governing Law</h2>
            <div className="legal-text">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact us:
              </p>
              <ul className="legal-list">
                <li><strong>Email:</strong> <a href="mailto:support@vellkoerp.com" className="red-highlight">support@vellkoerp.com</a></li>
                <li><strong>Phone:</strong> +91-7880107201</li>
                <li><strong>Office Address:</strong> Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road, Bhopal, MP - 462026</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                This Privacy Policy is governed by and construed in accordance with the laws of <strong>India</strong>.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Pre-Footer Contact Form */}
      <ContactFormSection />
    </div>
  );
}

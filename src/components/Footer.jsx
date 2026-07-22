import logoImg from '../assets/images/logo-white.png';

const erpCityLinks = [
  'ERP Software Ahmedabad',
  'ERP Software Surat',
  'ERP Software Vadodara',
  'ERP Software Rajkot',
  'ERP Software Mumbai',
  'ERP Software Pune',
  'ERP Software Bangalore',
  'ERP Software Hyderabad',
  'ERP Software Delhi',
  'ERP Software Chennai',
];

const quickLinks = [
  'Home',
  'ERP Modules',
  'Industries',
  'About Us',
  'Contact Us',
  'ERP Software Pune',
  'Privacy Policy',
  'Terms & Conditions',
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">

        {/* Column 1: Brand */}
        <div className="footer-brand-col">
          <img src={logoImg} alt="Vellko ERP" className="footer-logo" />
          <p className="footer-brand-desc">
            All-in-One ERP Solution in India for CRM, HRMS, Payroll, Accounting, Inventory Management, Project Management, and Business Operations.
          </p>
        </div>

        {/* Column 2: ERP Solution in India */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading">ERP SOLUTION IN INDIA</h4>
          <ul className="footer-link-list">
            {erpCityLinks.map((link) => (
              <li key={link}>
                <a href="#" className="footer-link">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading">QUICK LINKS</h4>
          <ul className="footer-link-list">
            {quickLinks.map((link) => (
              <li key={link}>
                <a href="#" className="footer-link">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact + Social */}
        <div className="footer-contact-col">
          <h4 className="footer-col-heading">CONTACT US</h4>
          <ul className="footer-contact-list">
            <li>
              <span className="footer-contact-icon">📞</span>
              <a href="tel:+911204567900" className="footer-link">+91 120 456 7900</a>
            </li>
            <li>
              <span className="footer-contact-icon">✉️</span>
              <a href="mailto:info@vellkoerp.com" className="footer-link">info@vellkoerp.com</a>
            </li>
            <li>
              <span className="footer-contact-icon">🌐</span>
              <a href="https://www.vellkoerp.com" className="footer-link">www.vellkoerp.com</a>
            </li>
            <li>
              <span className="footer-contact-icon">📍</span>
              <span className="footer-link">India</span>
            </li>
          </ul>

          <h4 className="footer-col-heading footer-social-heading">FOLLOW US</h4>
          <div className="footer-social-icons">
            {/* Facebook */}
            <a href="#" className="footer-social-btn" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="footer-social-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="footer-social-btn" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Copyright bar */}
      <div className="footer-copyright-bar">
        <p>© 2026 Vellko ERP. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

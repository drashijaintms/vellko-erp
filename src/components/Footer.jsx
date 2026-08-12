import { Link } from 'react-router-dom';
import logoImg from '../assets/images/logo-white.png';

const erpModules = [
  { name: 'CRM & Lead Management', path: '/contact' },
  { name: 'HRMS & Payroll', path: '/hrms-payroll' },
  { name: 'Finance & Accounting', path: '/finance-accounting' },
  { name: 'Inventory Management', path: '/inventory-management' },
  { name: 'Project Management', path: '/project-management' },
  { name: 'Service Management', path: '/service-management' },
  { name: 'Biometric Attendance', path: '/biometric-attendance' },
];

const industries = [
  { name: 'Manufacturing ERP', path: '/manufacturing-erp' },
  { name: 'Retail ERP', path: '/retail-erp' },
  { name: 'Distribution ERP', path: '/distribution-erp' },
  { name: 'Healthcare ERP', path: '/healthcare-erp' },
  { name: 'Education ERP', path: '/education-erp' },
  { name: 'Real Estate ERP', path: '/real-estate-erp' },
  { name: 'Service Business ERP', path: '/service-business-erp' },
  { name: 'E-Commerce ERP', path: '/ecommerce-erp' },
];

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact Us', path: '/contact' },
  { name: 'Privacy Policy', path: '/contact' },
  { name: 'Terms & Conditions', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">

        {/* Column 1: Brand */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-logo-link">
            <img src={logoImg} alt="Vellko ERP" className="footer-logo" />
          </Link>
          <p className="footer-brand-desc">
            All-in-One ERP Solution for CRM, HRMS, Payroll, Accounting, Inventory Management, Project Management, and Business Operations.
          </p>
        </div>

        {/* Column 2: ERP Modules */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading">ERP MODULES</h4>
          <ul className="footer-link-list">
            {erpModules.map((item, idx) => (
              <li key={idx}>
                <Link to={item.path} className="footer-link">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Industries */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading">INDUSTRIES</h4>
          <ul className="footer-link-list">
            {industries.map((item, idx) => (
              <li key={idx}>
                <Link to={item.path} className="footer-link">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Quick Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading">QUICK LINKS</h4>
          <ul className="footer-link-list">
            {quickLinks.map((item, idx) => (
              <li key={idx}>
                <Link to={item.path} className="footer-link">{item.name}</Link>
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
              <a href="tel:+917880107201" className="footer-link">+91-7880107201</a>
            </li>
            <li>
              <span className="footer-contact-icon">✉️</span>
              <a href="mailto:support@vellkoerp.com" className="footer-link">support@vellkoerp.com</a>
            </li>
            <li>
              <span className="footer-contact-icon">🌐</span>
              <a href="https://www.vellkoerp.com" className="footer-link">www.vellkoerp.com</a>
            </li>
            <li>
              <span className="footer-contact-icon">📍</span>
              <span className="footer-link">Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road, Bhopal, MP - 462026</span>
            </li>
          </ul>

          <h4 className="footer-col-heading footer-social-heading">FOLLOW US</h4>
          <div className="footer-social-icons">
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/VellkoERP" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-btn" 
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/vellkoerp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-btn" 
              aria-label="Instagram"
            >
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
            {/* YouTube */}
            <a href="#" className="footer-social-btn" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
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

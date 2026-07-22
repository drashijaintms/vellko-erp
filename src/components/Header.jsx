import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import logoImg from '../assets/images/logo.png';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="glass-header">
      <div className="header-container">
        {/* Brand Logo */}
        <div className="logo-area">
          <img src={logoImg} className="logo-img" alt="VELLKO ERP" />
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="desktop-nav">
          <a href="#" className="nav-link active">Home</a>
          
          <a href="#" className="nav-link">
            ERP Modules <ChevronDown size={14} strokeWidth={2.5} className="chevron-icon" />
          </a>
          
          <a href="#" className="nav-link">
            Industries <ChevronDown size={14} strokeWidth={2.5} className="chevron-icon" />
          </a>
          
          <a href="#" className="nav-link">
            Pricing <ChevronDown size={14} strokeWidth={2.5} className="chevron-icon" />
          </a>
          
          <a href="#" className="nav-link">About Us</a>
          <a href="#" className="nav-link">Contact</a>
        </nav>

        {/* Action Controls */}
        <div className="action-controls">
          <button className="cta-btn-outline">
            Book Demo
          </button>

          <button className="cta-btn-filled">
            Start Free Trial
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown glass-card">
          <nav className="mobile-nav">
            <a href="#" className="mobile-nav-link active" onClick={() => setMobileMenuOpen(false)}>
              Home
            </a>
            <a href="#" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              ERP Modules <ChevronDown size={16} strokeWidth={2} className="chevron-icon" />
            </a>
            <a href="#" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              Industries <ChevronDown size={16} strokeWidth={2} className="chevron-icon" />
            </a>
            <a href="#" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              Pricing <ChevronDown size={16} strokeWidth={2} className="chevron-icon" />
            </a>
            <a href="#" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </a>
            <a href="#" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>
            <button className="mobile-cta-btn-outline" onClick={() => setMobileMenuOpen(false)}>
              Book Demo
            </button>
            <button className="mobile-cta-btn-filled" onClick={() => setMobileMenuOpen(false)}>
              Start Free Trial
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

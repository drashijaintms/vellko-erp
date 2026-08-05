import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, 
  Users, UserCheck, DollarSign, Boxes, Briefcase, LifeBuoy, Fingerprint,
  Factory, ShoppingBag, Truck, Activity, GraduationCap, Building, Wrench, ShoppingCart
} from 'lucide-react';
import logoImg from '../assets/images/logo.png';

const erpModules = [
  { 
    title: "CRM & Lead Management", 
    desc: "Convert leads to deals faster.", 
    icon: Users,
    href: "#"
  },
  { 
    title: "HRMS & Payroll", 
    desc: "Manage workforce, attendance & salaries.", 
    icon: UserCheck,
    href: "#"
  },
  { 
    title: "Finance & Accounting", 
    desc: "Complete financial visibility & GST compliance.", 
    icon: DollarSign,
    href: "#"
  },
  { 
    title: "Inventory Management", 
    desc: "Optimize stock levels & multi-warehouse sync.", 
    icon: Boxes,
    href: "#"
  },
  { 
    title: "Project Management", 
    desc: "Collaborate, track time & deliver projects.", 
    icon: Briefcase,
    href: "#"
  },
  { 
    title: "Service Management", 
    desc: "Customer support, ticketing & SLA tracking.", 
    icon: LifeBuoy,
    href: "#"
  },
  { 
    title: "Biometric Attendance", 
    desc: "Real-time biometric sync & automated payroll.", 
    icon: Fingerprint,
    href: "#"
  }
];

const industries = [
  { 
    title: "Manufacturing ERP", 
    desc: "Optimize production, BOM & shop-floor control.", 
    icon: Factory,
    href: "/manufacturing-erp"
  },
  { 
    title: "Retail ERP", 
    desc: "Billing, POS sync & multi-store operations.", 
    icon: ShoppingBag,
    href: "/retail-erp"
  },
  { 
    title: "Distribution ERP", 
    desc: "Logistics, purchase sync & stock movement.", 
    icon: Truck,
    href: "#"
  },
  { 
    title: "Healthcare ERP", 
    desc: "Simplify clinical, admin & financial workflows.", 
    icon: Activity,
    href: "#"
  },
  { 
    title: "Education ERP", 
    desc: "Manage admissions, fees & staff records.", 
    icon: GraduationCap,
    href: "#"
  },
  { 
    title: "Real Estate ERP", 
    desc: "Track construction projects, billing & CRM.", 
    icon: Building,
    href: "#"
  },
  { 
    title: "Service Business ERP", 
    desc: "Professional services billing & utilization.", 
    icon: Wrench,
    href: "#"
  },
  { 
    title: "E-Commerce ERP", 
    desc: "Synchronize orders & stocks across channels.", 
    icon: ShoppingCart,
    href: "/ecommerce-erp"
  }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileModulesOpen, setMobileModulesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  return (
    <header className="glass-header">
      <div className="header-container">
        {/* Brand Logo */}
        <Link to="/" className="logo-area">
          <img src={logoImg} className="logo-img" alt="VELLKO ERP" />
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="desktop-nav">
          <Link to="/" className="nav-link active">Home</Link>
          
          <div className="nav-dropdown-item">
            <a href="#" className="nav-link">
              ERP Modules <ChevronDown size={12} strokeWidth={2.5} className="chevron-icon" />
            </a>
            <div className="desktop-dropdown">
              <div className="dropdown-grid">
                {erpModules.map((item, idx) => {
                  const Icon = item.icon;
                  if (item.href.startsWith('/')) {
                    return (
                      <Link key={idx} to={item.href} className="dropdown-link-card">
                        <div className="dropdown-icon-box">
                          <Icon size={18} />
                        </div>
                        <div className="dropdown-text-box">
                          <span className="dropdown-link-title">{item.title}</span>
                          <span className="dropdown-link-desc">{item.desc}</span>
                        </div>
                      </Link>
                    );
                  }
                  return (
                    <a key={idx} href={item.href} className="dropdown-link-card">
                      <div className="dropdown-icon-box">
                        <Icon size={18} />
                      </div>
                      <div className="dropdown-text-box">
                        <span className="dropdown-link-title">{item.title}</span>
                        <span className="dropdown-link-desc">{item.desc}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="nav-dropdown-item">
            <a href="#" className="nav-link">
              Industries <ChevronDown size={12} strokeWidth={2.5} className="chevron-icon" />
            </a>
            <div className="desktop-dropdown">
              <div className="dropdown-grid">
                {industries.map((item, idx) => {
                  const Icon = item.icon;
                  if (item.href.startsWith('/')) {
                    return (
                      <Link key={idx} to={item.href} className="dropdown-link-card">
                        <div className="dropdown-icon-box">
                          <Icon size={18} />
                        </div>
                        <div className="dropdown-text-box">
                          <span className="dropdown-link-title">{item.title}</span>
                          <span className="dropdown-link-desc">{item.desc}</span>
                        </div>
                      </Link>
                    );
                  }
                  return (
                    <a key={idx} href={item.href} className="dropdown-link-card">
                      <div className="dropdown-icon-box">
                        <Icon size={18} />
                      </div>
                      <div className="dropdown-text-box">
                        <span className="dropdown-link-title">{item.title}</span>
                        <span className="dropdown-link-desc">{item.desc}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          
          <a href="#" className="nav-link">
            Pricing
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
            <Link to="/" className="mobile-nav-link active" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            
            <div className="mobile-nav-item">
              <button 
                className="mobile-nav-link" 
                onClick={() => setMobileModulesOpen(!mobileModulesOpen)}
              >
                ERP Modules 
                <ChevronDown size={16} strokeWidth={2} className={`chevron-icon ${mobileModulesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileModulesOpen && (
                <div className="mobile-submenu">
                  {erpModules.map((item, idx) => {
                    const Icon = item.icon;
                    if (item.href.startsWith('/')) {
                      return (
                        <Link key={idx} to={item.href} className="mobile-submenu-link" onClick={() => setMobileMenuOpen(false)}>
                          <Icon size={14} className="submenu-icon" />
                          <span>{item.title}</span>
                        </Link>
                      );
                    }
                    return (
                      <a key={idx} href={item.href} className="mobile-submenu-link" onClick={() => setMobileMenuOpen(false)}>
                        <Icon size={14} className="submenu-icon" />
                        <span>{item.title}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mobile-nav-item">
              <button 
                className="mobile-nav-link" 
                onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
              >
                Industries 
                <ChevronDown size={16} strokeWidth={2} className={`chevron-icon ${mobileIndustriesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileIndustriesOpen && (
                <div className="mobile-submenu">
                  {industries.map((item, idx) => {
                    const Icon = item.icon;
                    if (item.href.startsWith('/')) {
                      return (
                        <Link key={idx} to={item.href} className="mobile-submenu-link" onClick={() => setMobileMenuOpen(false)}>
                          <Icon size={14} className="submenu-icon" />
                          <span>{item.title}</span>
                        </Link>
                      );
                    }
                    return (
                      <a key={idx} href={item.href} className="mobile-submenu-link" onClick={() => setMobileMenuOpen(false)}>
                        <Icon size={14} className="submenu-icon" />
                        <span>{item.title}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <a href="#" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              Pricing
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

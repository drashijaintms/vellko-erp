import { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Store, 
  TrendingUp, 
  Activity, 
  GraduationCap, 
  Building2, 
  Users, 
  ShoppingCart,
  Handshake,
  Cog,
  Wrench,
  UserCheck,
  Star
} from 'lucide-react';

import onePlatformIcon from '../assets/icons/one-platform.png';
import unlimitedGrowthIcon from '../assets/icons/unlimited-growth.png';
import cloudErpIcon from '../assets/icons/cloud-erp.png';
import multiLocationIcon from '../assets/icons/multi-location.png';
import securityIcon from '../assets/icons/security.png';
import aiWorkflowIcon from '../assets/icons/ai-workflow.png';
import globeGif from '../assets/images/globe.gif';
import splitIllustration from '../assets/images/split-illustration.png';
import targetImg from '../assets/images/target.png';
import howItWorksImg from '../assets/images/how-it-works.png';
import testimonial1 from '../assets/images/testimonial-1.png';
import testimonial2 from '../assets/images/testimonial-2.png';
import testimonial3 from '../assets/images/testimonial-3.png';

const modulesData = [
  {
    title: "CRM & Lead Management",
    subtitle: "Never Lose Sight of an Opportunity",
    desc: "Every customer interaction tells a story. Vellko ERP keeps every lead, quotation, conversation and follow-up connected in one place, so your sales team always knows what happened, what's next and where the next opportunity lies.",
    features: [
      "Lead Tracking",
      "Opportunity Management",
      "Customer Database",
      "Quotation Management",
      "Follow-Up Automation",
      "Communication History",
      "Sales Forecasting"
    ],
    iconSvg: (
      <svg className="module-card-icon-svg" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    title: "HRMS & Workforce Management",
    subtitle: "Empower Your Workforce, Simplify HR",
    desc: "Streamline HR operations, employee lifecycle tracking, payroll and appraisals in one connected dashboard. Elevate employee engagement and reduce administrative overhead.",
    features: [
      "Employee Directory",
      "Leave & Expense Claims",
      "Payroll Processing",
      "Performance Appraisals",
      "Shift Scheduling",
      "Onboarding Checklists",
      "Employee Self-Service"
    ],
    iconSvg: (
      <svg className="module-card-icon-svg" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    )
  },
  {
    title: "Biometric Attendance Integration",
    subtitle: "Real-Time Direct Sync Verification",
    desc: "Bridge the gap between hardware and software. Directly integrate biometric terminals to sync attendance logs in real time, auto-calculating overtime, delays, and shifts.",
    features: [
      "Biometric Device Sync",
      "Real-Time Log Ingestion",
      "Automatic Shift Mapping",
      "Overtime Calculations",
      "Grace Period Settings",
      "Absence Alerts",
      "Mobile Geo-fencing Sync"
    ],
    iconSvg: (
      <svg className="module-card-icon-svg" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
        <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    )
  },
  {
    title: "Work & Project Management",
    subtitle: "Collaborate, Execute, and Deliver on Time",
    desc: "From simple tasks to complex milestones. Plan resources, track execution, manage deadlines and log timesheets in sync with invoicing and department budgets.",
    features: [
      "Task Boards (Kanban/List)",
      "Gantt Chart Milestones",
      "Timesheet Tracking",
      "Resource Utilization",
      "Project Billing Integration",
      "Collaborative Discussions",
      "File Sharing & Versioning"
    ],
    iconSvg: (
      <svg className="module-card-icon-svg" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  },
  {
    title: "Finance & Purchase Management",
    subtitle: "Complete Control Over Your Cash Flow",
    desc: "Maintain multi-currency ledgers, automate invoicing, track purchasing workflows, and verify accounts receivable in real-time, matching tax standards and compliance.",
    features: [
      "General Ledger",
      "Accounts Payable & Receivable",
      "Purchase Order Workflows",
      "Vendor Management",
      "Taxation & GST Reports",
      "Automated Bank Reconciliation",
      "Expense Approvals"
    ],
    iconSvg: (
      <svg className="module-card-icon-svg" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    title: "Service Management & Customer Support",
    subtitle: "Deliver Exceptional Customer Experiences",
    desc: "Unify ticketing, helpdesk operations, warranty tracking, and customer service requests into a single screen, auto-routing tasks to the right agent instantly.",
    features: [
      "Ticketing System",
      "SLA Compliance Tracking",
      "Knowledge Base Portal",
      "Support Agent Assignment",
      "Customer Feedback Loop",
      "Warranty & Contract Tracking",
      "Live Chat Integration"
    ],
    iconSvg: (
      <svg className="module-card-icon-svg" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    title: "Business Intelligence & Analytics",
    subtitle: "Data-Driven Decisions in Real-Time",
    desc: "Transform raw operations logs into actionable intelligence. Generate interactive charts, track company-wide KPIs, and export financial forecasts with drag-and-drop builders.",
    features: [
      "Interactive Dashboards",
      "Custom Report Builder",
      "Predictive Sales Forecasts",
      "Department Cost Analysis",
      "KPI Tracking Panels",
      "Automated Email Reports",
      "Cross-Module Data Modeling"
    ],
    iconSvg: (
      <svg className="module-card-icon-svg" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    )
  }
];

const industriesData = [
  {
    title: "Manufacturing",
    desc: "Optimize production planning, procurement, inventory and shop-floor operations.",
    icon: <Cpu strokeWidth={1.5} />
  },
  {
    title: "Retail",
    desc: "Unify inventory, billing, customer management and multi-store operations.",
    icon: <Store strokeWidth={1.5} />
  },
  {
    title: "Distribution",
    desc: "Streamline logistics, warehouse management, procurement and stock movement.",
    icon: <TrendingUp strokeWidth={1.5} />
  },
  {
    title: "Healthcare",
    desc: "Simplify administration, finance, inventory, HR and operational workflows.",
    icon: <Activity strokeWidth={1.5} />
  },
  {
    title: "Education",
    desc: "Manage admissions, attendance, payroll, fees and administrative processes.",
    icon: <GraduationCap strokeWidth={1.5} />
  },
  {
    title: "Real Estate",
    desc: "Track projects, finances, resources and customer relationships in one place.",
    icon: <Building2 strokeWidth={1.5} />
  },
  {
    title: "Professional Services",
    desc: "Improve project delivery, resource utilization and team collaboration.",
    icon: <Users strokeWidth={1.5} />
  },
  {
    title: "E-Commerce",
    desc: "Synchronize orders, inventory, customers and business operations seamlessly.",
    icon: <ShoppingCart strokeWidth={1.5} />
  }
];

const needErpData = [
  { challenge: "Multiple software tools and disconnected data", solution: "Unifies all departments into one centralized platform" },
  { challenge: "Time-consuming manual processes", solution: "Automates repetitive tasks and workflows" },
  { challenge: "Delayed decisions due to outdated reports", solution: "Provides real-time dashboards and business insights" },
  { challenge: "Lack of visibility across operations", solution: "Offers complete control over every department" },
  { challenge: "Duplicate entries and human errors", solution: "Creates a single source of truth across the organization" },
  { challenge: "Poor collaboration between teams", solution: "Connects departments through streamlined workflows" },
  { challenge: "Data security and access concerns", solution: "Protects information with enterprise-grade security and role-based access" },
  { challenge: "Difficulty managing remote teams", solution: "Enables secure cloud access from anywhere" },
  { challenge: "Business growth creating operational complexity", solution: "Scales effortlessly as your business expands" },
  { challenge: "Unique business requirements", solution: "Customizes workflows and modules to fit your processes" }
];

const testimonialData = [
  {
    img: testimonial1,
    quote: "Before Vellko ERP, our teams relied on spreadsheets and multiple tools to manage daily operations.",
    sub: "Now, everything is centralized, and we have complete visibility across departments.",
    name: "Mathias Phelps",
    role: "Finance Manager, Logistics Company",
    stars: 5
  },
  {
    img: testimonial2,
    quote: "Vellko ERP transformed the way we handle HR and payroll. What used to take days now takes minutes.",
    sub: "The onboarding was smooth, and the support team was always available to help us every step of the way.",
    name: "Priya Sharma",
    role: "HR Director, Manufacturing Group",
    stars: 5
  },
  {
    img: testimonial3,
    quote: "We tried three different ERP systems before Vellko. Nothing came close to the level of integration and simplicity.",
    sub: "Our inventory, billing and customer data are now fully in sync — no more manual reconciliation.",
    name: "Daniel Reeves",
    role: "Operations Head, Retail Chain",
    stars: 5
  }
];

export default function Welcome() {
  const [activeModule, setActiveModule] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(1);
  const activeData = modulesData[activeModule];
  const activeTesti = testimonialData[activeTestimonial];

  const statsSectionRef = useRef(null);
  const statsRefs = useRef([]);

  useEffect(() => {
    const section = statsSectionRef.current;
    if (!section) return;

    let animationFrameId;
    let startTime = null;
    const duration = 2000; // 2 seconds

    const targets = [500, 99.9, 24, 50, 95, 30];
    const formats = [
      (val) => `${Math.floor(val)}+`,
      (val) => `${val.toFixed(1)}%`,
      (val) => `${Math.floor(val)}/7`,
      (val) => `${Math.floor(val)}+`,
      (val) => `${Math.floor(val)}%`,
      (val) => `${Math.floor(val)}%`,
    ];

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing: easeOutCubic
      const ease = 1 - Math.pow(1 - percentage, 3);

      targets.forEach((target, idx) => {
        const val = target * ease;
        const formatted = formats[idx](val);

        const desktopEl = statsRefs.current[idx];
        if (desktopEl) {
          desktopEl.textContent = formatted;
        }

        const mobileEl = statsRefs.current[idx + 6];
        if (mobileEl) {
          mobileEl.textContent = formatted;
        }
      });

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTime = null;
            animationFrameId = requestAnimationFrame(animate);
          } else {
            cancelAnimationFrame(animationFrameId);
            targets.forEach((_, idx) => {
              const formatted = formats[idx](0);
              const desktopEl = statsRefs.current[idx];
              if (desktopEl) desktopEl.textContent = formatted;
              const mobileEl = statsRefs.current[idx + 6];
              if (mobileEl) mobileEl.textContent = formatted;
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Hero Banner Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-heading">
            Run Your Entire Business with
            <span className="red-highlight">Complete Visibility.</span>
          </h1>

          <p className="hero-paragraph-1">
            Meet the All-New Vellko ERP: Built for modern businesses that need more than software they need complete visibility.
          </p>
          
          <p className="hero-paragraph-1">
            Vellko ERP unifies your sales, finance, HR, operations, inventory and customer management into one intelligent platform, giving every team a single source of truth so decisions are faster, operations are connected and growth is built on confidence.
          </p>

          {/* Feature Badges */}
          <div className="hero-features">
            <div className="feature-badge">
              <img src={onePlatformIcon} alt="One Platform" className="feature-icon-img" />
              <span className="feature-text">One<br />Platform</span>
            </div>

            <div className="feature-badge">
              <svg className="feature-icon-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 16C28.4183 16 32 19.5817 32 24C32 28.4183 28.4183 32 24 32C19.5817 32 16 28.4183 16 24C16 19.5817 19.5817 16 24 16Z" stroke="#DC1436" strokeWidth="2.5" strokeMiterlimit="10"/>
                <path d="M24 6V11" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M24 37V42" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M6 24H11" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M37 24H42" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M11.27 11.27L14.81 14.81" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M33.19 33.19L36.73 36.73" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M36.73 11.27L33.19 14.81" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M14.81 33.19L11.27 36.73" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M20 24L22.5 26.5L28 21" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="feature-text">Complete<br />Control</span>
            </div>

            <div className="feature-badge">
              <img src={unlimitedGrowthIcon} alt="Unlimited Growth" className="feature-icon-img" />
              <span className="feature-text">Unlimited<br />Growth</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <button className="hero-btn-filled">Request a Demo</button>
            <button className="hero-btn-outline">Get Started</button>
          </div>
        </div>
      </section>

      {/* Stats Grid Section */}
      <section className="stats-section" ref={statsSectionRef}>
        <div className="stats-desktop-grid">
          <div className="stats-cell empty"></div>
          <div className="stats-cell num-cell" ref={(el) => (statsRefs.current[0] = el)}>0+</div>
          <div className="stats-cell num-cell" ref={(el) => (statsRefs.current[1] = el)}>0.0%</div>
          <div className="stats-cell num-cell" ref={(el) => (statsRefs.current[2] = el)}>0/7</div>
          <div className="stats-cell num-cell" ref={(el) => (statsRefs.current[3] = el)}>0+</div>
          <div className="stats-cell num-cell" ref={(el) => (statsRefs.current[4] = el)}>0%</div>
          <div className="stats-cell num-cell" ref={(el) => (statsRefs.current[5] = el)}>0%</div>
          <div className="stats-cell empty"></div>

          <div className="stats-cell empty"></div>
          <div className="stats-cell label-cell">Users<br />Empowered</div>
          <div className="stats-cell label-cell">System<br />Uptime</div>
          <div className="stats-cell label-cell">Customer<br />Support</div>
          <div className="stats-cell label-cell">Successful ERP<br />Implementations</div>
          <div className="stats-cell label-cell">Client<br />Retention Rate</div>
          <div className="stats-cell label-cell">Faster Business<br />Processes</div>
          <div className="stats-cell empty"></div>
        </div>

        <div className="stats-mobile-grid">
          <div className="stats-mobile-card">
            <div className="stats-mobile-num" ref={(el) => (statsRefs.current[6] = el)}>0+</div>
            <div className="stats-mobile-label">Users Empowered</div>
          </div>
          <div className="stats-mobile-card">
            <div className="stats-mobile-num" ref={(el) => (statsRefs.current[7] = el)}>0.0%</div>
            <div className="stats-mobile-label">System Uptime</div>
          </div>
          <div className="stats-mobile-card">
            <div className="stats-mobile-num" ref={(el) => (statsRefs.current[8] = el)}>0/7</div>
            <div className="stats-mobile-label">Customer Support</div>
          </div>
          <div className="stats-mobile-card">
            <div className="stats-mobile-num" ref={(el) => (statsRefs.current[9] = el)}>0+</div>
            <div className="stats-mobile-label">Successful ERP Implementations</div>
          </div>
          <div className="stats-mobile-card">
            <div className="stats-mobile-num" ref={(el) => (statsRefs.current[10] = el)}>0%</div>
            <div className="stats-mobile-label">Client Retention Rate</div>
          </div>
          <div className="stats-mobile-card">
            <div className="stats-mobile-num" ref={(el) => (statsRefs.current[11] = el)}>0%</div>
            <div className="stats-mobile-label">Faster Business Processes</div>
          </div>
        </div>
      </section>

      {/* Move Beyond Traditional ERP Section */}
      <section className="beyond-section">
        <div className="beyond-text-block">
          <h2 className="beyond-title">
            Move Beyond Traditional <span className="red-highlight">ERP</span>
          </h2>
          <h3 className="beyond-paragraph-1">
            Traditional ERP systems give you more software to manage.
          </h3>
          <h4 className="beyond-subtitle">
            <span className="red-highlight">Vellko ERP</span> gives you a better way to understand your business.
          </h4>
          <p className="beyond-paragraph-2">
            By bringing every department, process and data point together into one connected platform, Vellko ERP replaces scattered information with a single, reliable view- helping your team make faster decisions, work with confidence and grow without complexity.
          </p>
        </div>

        {/* 9-Column Desktop Feature Grid with Checkerboard Pattern */}
        <div className="features-offset-grid">
          {/* ROW 1 */}
          <div className="offset-cell">
            <img src={cloudErpIcon} alt="Cloud ERP" className="offset-icon-img" />
          </div>
          <div className="offset-cell">
            <span className="offset-text">Next Generation Cloud ERP</span>
          </div>
          <div className="offset-cell">
            <img src={multiLocationIcon} alt="Multi-Location" className="offset-icon-img" />
          </div>
          <div className="offset-cell">
            <span className="offset-text">Seamless Multi-Location Management</span>
          </div>
          <div className="offset-cell">
            <img src={securityIcon} alt="Security" className="offset-icon-img" />
          </div>
          <div className="offset-cell">
            <span className="offset-text">Enterprise Grade Security Framework</span>
          </div>
          <div className="offset-cell">
            <img src={aiWorkflowIcon} alt="AI Workflow" className="offset-icon-img" />
          </div>
          <div className="offset-cell">
            <span className="offset-text">AI-Powered Workflow Automation</span>
          </div>
          <div className="offset-cell empty"></div>

          {/* ROW 2 */}
          <div className="offset-cell empty"></div>
          <div className="offset-cell">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="offset-icon-svg">
              <path d="M10 38V12C10 10.8954 10.8954 10 12 10H36C37.1046 10 38 10.8954 38 12V38L32 35L24 38L16 35L10 38Z" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="16" y="16" width="16" height="12" rx="2" stroke="#4b5563" strokeWidth="2" />
              <text x="18" y="24" fontFamily="var(--font-body)" fontSize="6" fontWeight="bold" fill="#4b5563">GST</text>
            </svg>
          </div>
          <div className="offset-cell">
            <span className="offset-text">End-to-End GST Compliance</span>
          </div>
          <div className="offset-cell">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="offset-icon-svg">
              <rect x="6" y="8" width="36" height="24" rx="3" stroke="#4b5563" strokeWidth="2.5" />
              <path d="M16 32V38H32V32" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 38H36" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="18" cy="20" r="6" stroke="#4b5563" strokeWidth="2" />
              <path d="M18 14V20H24" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="28" y1="16" x2="36" y2="16" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" />
              <line x1="28" y1="22" x2="34" y2="22" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="offset-cell">
            <span className="offset-text">Live Business Intelligence</span>
          </div>
          <div className="offset-cell">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="offset-icon-svg">
              <rect x="8" y="20" width="16" height="14" rx="2" stroke="#4b5563" strokeWidth="2.5" />
              <path d="M12 20V15C12 12.7909 13.7909 11 16 11C18.2091 11 20 12.7909 20 15V20" stroke="#4b5563" strokeWidth="2.5" />
              <circle cx="34" cy="20" r="5" stroke="#4b5563" strokeWidth="2.5" />
              <path d="M26 33C26 29.134 29.5817 26 34 26C38.4183 26 42 29.134 42 33" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="offset-cell">
            <span className="offset-text">Granular User Access Control</span>
          </div>
          <div className="offset-cell">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="offset-icon-svg">
              <rect x="6" y="10" width="28" height="20" rx="2" stroke="#4b5563" strokeWidth="2.5" />
              <path d="M4 30H36" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="32" y="16" width="10" height="18" rx="2" fill="#ffffff" stroke="#4b5563" strokeWidth="2" />
              <circle cx="37" cy="31" r="1" fill="#4b5563" />
              <path d="M12 30V34H28V30" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="8" y1="34" x2="32" y2="34" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="offset-cell">
            <span className="offset-text">Single Platform for All Operations</span>
          </div>
        </div>

        {/* 2-Column Mobile Features Grid */}
        <div className="features-mobile-grid">
          <div className="mobile-feature-card">
            <img src={cloudErpIcon} alt="Cloud ERP" className="offset-icon-img" />
            <span className="mobile-feature-title">Next Generation Cloud ERP</span>
          </div>
          <div className="mobile-feature-card">
            <img src={multiLocationIcon} alt="Multi-Location" className="offset-icon-img" />
            <span className="mobile-feature-title">Seamless Multi-Location Management</span>
          </div>
          <div className="mobile-feature-card">
            <img src={securityIcon} alt="Security" className="offset-icon-img" />
            <span className="mobile-feature-title">Enterprise Grade Security Framework</span>
          </div>
          <div className="mobile-feature-card">
            <img src={aiWorkflowIcon} alt="AI Workflow" className="offset-icon-img" />
            <span className="mobile-feature-title">AI-Powered Workflow Automation</span>
          </div>
          <div className="mobile-feature-card">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="offset-icon-svg">
              <path d="M10 38V12C10 10.8954 10.8954 10 12 10H36C37.1046 10 38 10.8954 38 12V38L32 35L24 38L16 35L10 38Z" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="16" y="16" width="16" height="12" rx="2" stroke="#4b5563" strokeWidth="2" />
              <text x="18" y="24" fontFamily="var(--font-body)" fontSize="6" fontWeight="bold" fill="#4b5563">GST</text>
            </svg>
            <span className="mobile-feature-title">End-to-End GST Compliance</span>
          </div>
          <div className="mobile-feature-card">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="offset-icon-svg">
              <rect x="6" y="8" width="36" height="24" rx="3" stroke="#4b5563" strokeWidth="2.5" />
              <path d="M16 32V38H32V32" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 38H36" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="18" cy="20" r="6" stroke="#4b5563" strokeWidth="2" />
              <path d="M18 14V20H24" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="28" y1="16" x2="36" y2="16" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" />
              <line x1="28" y1="22" x2="34" y2="22" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="mobile-feature-title">Live Business Intelligence</span>
          </div>
          <div className="mobile-feature-card">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="offset-icon-svg">
              <rect x="8" y="20" width="16" height="14" rx="2" stroke="#4b5563" strokeWidth="2.5" />
              <path d="M12 20V15C12 12.7909 13.7909 11 16 11C18.2091 11 20 12.7909 20 15V20" stroke="#4b5563" strokeWidth="2.5" />
              <circle cx="34" cy="20" r="5" stroke="#4b5563" strokeWidth="2.5" />
              <path d="M26 33C26 29.134 29.5817 26 34 26C38.4183 26 42 29.134 42 33" stroke="#4b5563" strokeWidth="2.5" />
            </svg>
            <span className="mobile-feature-title">Granular User Access Control</span>
          </div>
          <div className="mobile-feature-card">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="offset-icon-svg">
              <rect x="6" y="10" width="28" height="20" rx="2" stroke="#4b5563" strokeWidth="2.5" />
              <path d="M4 30H36" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="32" y="16" width="10" height="18" rx="2" fill="#ffffff" stroke="#4b5563" strokeWidth="2" />
              <circle cx="37" cy="31" r="1" fill="#4b5563" />
              <path d="M12 30V34H28V30" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="8" y1="34" x2="32" y2="34" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="mobile-feature-title">Single Platform for All Operations</span>
          </div>
        </div>
      </section>

      {/* Split Comparison Section */}
      <section className="split-comparison-section">
        
        {/* Top Centered Heading */}
        <div className="split-comp-header">
          <h2 className="split-comp-title">
            <span className="text-white">One Platform. </span>
            <span className="text-black">Every Department.</span>
          </h2>
          <p className="split-comp-desc">
            <span className="text-light-gray">Eliminate disconnected tools and manage your </span>
            <span className="text-dark-gray">entire business from a single cloud-based platform.</span>
          </p>
        </div>

        {/* 3-Column Split Content Container */}
        <div className="split-comp-container">
          
          {/* Left Column: Traditional ERP */}
          <div className="split-comp-col left-col">
            <div className="comp-list-wrap">
              <h3 className="col-title text-white">Traditional ERP</h3>
              <ul className="comp-item-list text-white">
                <li>Multiple disconnected tools</li>
                <li>Complex implementation</li>
                <li>Limited visibility</li>
                <li>Real-time dashboards</li>
                <li>Difficult to scale</li>
                <li>High maintenance costs</li>
                <li>Generic workflows</li>
              </ul>
            </div>
          </div>

          {/* Middle Column: Center Illustration */}
          <div className="split-comp-col center-col">
            <img src={splitIllustration} alt="Platform Comparison Illustration" className="split-comp-illustration" />
          </div>

          {/* Right Column: Vellko ERP */}
          <div className="split-comp-col right-col">
            <div className="comp-list-wrap">
              <h3 className="col-title text-red">Vellko ERP</h3>
              <ul className="comp-item-list text-red-lines">
                <li>Unified all-in-one platform</li>
                <li>Fast deployment</li>
                <li>Real-time dashboards</li>
                <li>Intelligent automation</li>
                <li>Flexible and scalable</li>
                <li>Cloud-based and cost-efficient</li>
                <li>Customizable for every industry</li>
              </ul>
            </div>
          </div>

        </div>

      </section>

      {/* Everything Your Business Needs (Interactive Modules Loop) */}
      <section className="all-in-one-section">
        <div className="all-in-one-text">
          <h2 className="all-in-one-title">
            Everything Your Business Needs,
            <span className="red-highlight">All in One Place</span>
          </h2>
          <p className="all-in-one-p1">
            Modern businesses need more than disconnected tools and scattered data.
          </p>
          <p className="all-in-one-p2">
            Vellko ERP brings sales, finance, HR, operations, inventory and customer management and business insights together in one intelligent platform giving you complete visibility and control from a single dashboard.
          </p>
        </div>

        {/* Mobile Horizontal Tab Scroller */}
        <div className="mobile-modules-scroller">
          {modulesData.map((item, idx) => (
            <button 
              key={idx} 
              className={`mobile-module-tab ${activeModule === idx ? 'active' : ''}`}
              onClick={() => setActiveModule(idx)}
            >
              {item.title.split(' & ')[0]}
            </button>
          ))}
        </div>

        <div className="all-in-one-layout">
          <div className="module-details-card">
            <div className="module-card-icon-container">
              {activeData.iconSvg}
            </div>

            <h3 className="module-card-title">{activeData.title}</h3>
            <p className="module-card-subtitle">{activeData.subtitle}</p>
            <p className="module-card-desc">{activeData.desc}</p>

            <div className="module-features-title-row">
              Key Features
            </div>

            <ul className="module-features-list">
              {activeData.features.map((feature, idx) => (
                <li key={idx} className="module-feature-item">
                  <svg className="feature-checkbox-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="#DC1436" strokeWidth="2.5" />
                    <path d="M9 12l2 2 4-4" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="circular-graphic-container">
            <svg className="circular-ring-svg" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="220" cy="220" r="160" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="6 6" />
              <circle cx="220" cy="220" r="150" stroke="#f3f4f6" strokeWidth="1" />
              
              {activeModule === 0 && <path d="M 220,60 A 160,160 0 0,0 106.8,106.8" stroke="#DC1436" strokeWidth="3" strokeLinecap="round" />}
              {activeModule === 1 && <path d="M 220,60 A 160,160 0 0,1 333.1,106.8" stroke="#DC1436" strokeWidth="3" strokeLinecap="round" />}
              {activeModule === 2 && <path d="M 333.1,106.8 A 160,160 0 0,1 380,220" stroke="#DC1436" strokeWidth="3" strokeLinecap="round" />}
              {activeModule === 3 && <path d="M 380,220 A 160,160 0 0,1 333.1,333.1" stroke="#DC1436" strokeWidth="3" strokeLinecap="round" />}
              {activeModule === 4 && <path d="M 333.1,333.1 A 160,160 0 0,1 220,380" stroke="#DC1436" strokeWidth="3" strokeLinecap="round" />}
              {activeModule === 5 && <path d="M 220,380 A 160,160 0 0,1 106.8,333.1" stroke="#DC1436" strokeWidth="3" strokeLinecap="round" />}
              {activeModule === 6 && <path d="M 106.8,220 A 160,160 0 0,1 106.8,106.8" stroke="#DC1436" strokeWidth="3" strokeLinecap="round" />}
            </svg>

            <span className="circular-label circular-label-top-header">
              Vellko ERP Features
            </span>
            
            <button 
              className={`circular-label circular-label-tl ${activeModule === 0 ? 'active' : ''}`}
              onClick={() => setActiveModule(0)}
            >
              CRM & Lead Management
            </button>

            <button 
              className={`circular-label circular-label-tr ${activeModule === 1 ? 'active' : ''}`}
              onClick={() => setActiveModule(1)}
            >
              HRMS & Workforce Management
            </button>

            <button 
              className={`circular-label circular-label-r ${activeModule === 2 ? 'active' : ''}`}
              onClick={() => setActiveModule(2)}
            >
              Biometric Attendance Integration
            </button>

            <button 
              className={`circular-label circular-label-br ${activeModule === 3 ? 'active' : ''}`}
              onClick={() => setActiveModule(3)}
            >
              Work & Project Management
            </button>

            <button 
              className={`circular-label circular-label-b ${activeModule === 4 ? 'active' : ''}`}
              onClick={() => setActiveModule(4)}
            >
              Finance & Purchase Management
            </button>

            <button 
              className={`circular-label circular-label-bl ${activeModule === 5 ? 'active' : ''}`}
              onClick={() => setActiveModule(5)}
            >
              Service Management & Customer Support
            </button>

            <button 
              className={`circular-label circular-label-l ${activeModule === 6 ? 'active' : ''}`}
              onClick={() => setActiveModule(6)}
            >
              Business Intelligence & Analytics
            </button>

            <div className="css-monitor">
              <div className="css-monitor-screen">
                <div className="monitor-dashboard">
                  <div className="monitor-dash-sidebar">
                    <div className="monitor-dash-sidebar-dot active"></div>
                    <div className="monitor-dash-sidebar-dot"></div>
                    <div className="monitor-dash-sidebar-dot"></div>
                  </div>
                  <div className="monitor-dash-main">
                    <div className="monitor-dash-header">
                      <div className="monitor-dash-title">See Everything</div>
                      <div className="monitor-dash-subtitle">Go Everything.</div>
                    </div>
                    <div className="monitor-dash-chart">
                      <svg viewBox="0 0 100 40" className="monitor-chart-svg">
                        <path d="M0,35 Q15,5 30,25 T60,5 T90,15 L100,35 Z" fill="rgba(220, 20, 54, 0.04)" />
                        <path d="M0,35 Q15,5 30,25 T60,5 T90,15" fill="none" stroke="#DC1436" strokeWidth="2.5" />
                      </svg>
                    </div>
                    <div className="monitor-dash-bottom">
                      <div className="monitor-dash-circle-progress"></div>
                      <div className="monitor-dash-btn"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="css-monitor-stand"></div>
              <div className="css-monitor-base"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Every Industry Has Different Challenges Section */}
      <section className="industry-section">
        <div className="industry-container">
          
          {/* Top Title Area and Wireframe Globe */}
          <div className="industry-top-block">
            <div className="industry-title-area">
              <h2 className="industry-title">
                Every Industry<br />Has Different Challenges.
                <span className="red-highlight">Every Business Deserves the Same Visibility.</span>
              </h2>
            </div>
            
            {/* Wireframe Globe (GIF) */}
            <div className="industry-globe-wrapper">
              <img src={globeGif} alt="Rotating Globe" className="industry-globe-img" />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="industry-cards-grid">
            {industriesData.map((item, idx) => (
              <div className="industry-card" key={idx}>
                <div className="industry-card-icon-circle">
                  {item.icon}
                </div>
                <h3 className="industry-card-title">{item.title}</h3>
                <p className="industry-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Left Paragraphs */}
          <div className="industry-bottom-block">
            <p className="industry-bottom-p1">
              Businesses rarely struggle because they lack information. They struggle because information is scattered across different tools, departments and people. When nobody sees the complete picture, decisions become slower, errors increase and growth becomes difficult to manage.
            </p>
            <p className="industry-bottom-p2">
              <span className="red-highlight">Vellko ERP</span> creates a single source of truth, giving every department access to the same accurate information at the right time.
            </p>
            <p className="industry-bottom-highlight">
              Synchronize orders, inventory, customers and business operations seamlessly.<br />
              Your business is unique. Your ERP should be too.
            </p>
            
            {/* Actions */}
            <div className="industry-bottom-actions">
              <button className="industry-btn-filled">Explore Your Industry Solution</button>
              <button className="industry-btn-outline">Get Started</button>
            </div>
          </div>

        </div>
      </section>

      {/* Why Do Businesses Need an ERP System Split Section */}
      <section className="need-erp-section">
        
        {/* Centered Heading with responsive background text clipping color change */}
        <div className="need-centered-title-wrapper">
          <h2 className="need-centered-title">
            Why Do Businesses Need an ERP System?
          </h2>
        </div>

        {/* Absolute illustration sitting exactly in the middle of both columns */}
        <div className="need-illustration-absolute">
          <img src={splitIllustration} alt="ERP System Split Visual Illustration" className="need-illustration-img" />
        </div>

        {/* Left Half (Slate-Grey Background, White Text) */}
        <div className="need-column left-col">
          <div className="need-col-content">
            
            <p className="need-col-paragraph">
              As your business grows, managing operations through spreadsheets, emails and disconnected software becomes inefficient, expensive and difficult to scale.
            </p>

            {/* Spacing for absolute centered illustration */}
            <div className="need-illustration-spacer"></div>

            <h3 className="need-subheading">Business Challenge</h3>

            <div className="need-rows-list">
              {needErpData.map((item, idx) => (
                <div className="need-row-item" key={idx}>
                  {item.challenge}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Half (White Background, Black Text) */}
        <div className="need-column right-col">
          <div className="need-col-content">
            
            <p className="need-col-paragraph">
              With <span className="red-highlight">Vellko ERP</span>, you can eliminate operational bottlenecks, reduce manual work and gain complete visibility across your business.
            </p>

            {/* Spacing for absolute centered illustration */}
            <div className="need-illustration-spacer"></div>

            <h3 className="need-subheading">
              How <span className="red-highlight">Vellko ERP</span> Solves It
            </h3>

            <div className="need-rows-list">
              {needErpData.map((item, idx) => (
                <div className="need-row-item" key={idx}>
                  {item.solution}
                </div>
              ))}
            </div>

          </div>
        </div>

      </section>

      {/* The Result Section */}
      <section className="result-section">
        <div className="result-container">
          
          <div className="result-split-layout">
            
            {/* Left side target image */}
            <div className="result-image-area">
              <img src={targetImg} alt="Target Bullseye and Arrow" className="result-target-img" />
            </div>

            {/* Right side bullets info list */}
            <div className="result-info-area">
              <h2 className="result-heading">The Result?</h2>
              
              <ul className="result-bullets-list">
                <li className="result-bullet-item">
                  <div className="result-check-circle">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="result-bullet-text">Save time by automating daily operations</span>
                </li>

                <li className="result-bullet-item">
                  <div className="result-check-circle">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="result-bullet-text">Reduce operational costs and manual errors</span>
                </li>

                <li className="result-bullet-item">
                  <div className="result-check-circle">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="result-bullet-text">Increase team productivity and accountability</span>
                </li>

                <li className="result-bullet-item">
                  <div className="result-check-circle">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="result-bullet-text">Make faster, data-driven decisions</span>
                </li>

                <li className="result-bullet-item">
                  <div className="result-check-circle">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="result-bullet-text">Scale your business without adding complexity</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom centered tagline */}
          <div className="result-tagline">
            One platform. Complete visibility. Smarter growth.
          </div>

        </div>
      </section>

      {/* How Vellko ERP Works Section */}
      <section className="works-section">
        <div className="works-container">
          <h2 className="works-title">
            How Vellko ERP <span className="red-highlight">Works</span>
          </h2>

          <div className="works-split-layout">
            
            {/* Steps Column */}
            <div className="works-steps-col">
              
              <div className="step-card">
                <h3 className="step-card-header">
                  Step 1: <span className="red-highlight">Book a Free Demo</span>
                </h3>
                <p className="step-card-desc">
                  See how Vellko ERP works and how it can be applied to your business.
                </p>
              </div>

              <div className="step-arrow-container">
                <svg className="step-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="#DC1436" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              <div className="step-card">
                <h3 className="step-card-header">
                  Step 2: <span className="red-highlight">Understand Your Business Needs</span>
                </h3>
                <p className="step-card-desc">
                  Your processes, challenges and requirements are reviewed to design the right ERP structure.
                </p>
              </div>

              <div className="step-arrow-container">
                <svg className="step-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="#DC1436" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              <div className="step-card">
                <h3 className="step-card-header">
                  Step 3: <span className="red-highlight">Configure & Migrate Data</span>
                </h3>
                <p className="step-card-desc">
                  The ERP is set up for your operations and existing data is securely moved into the system.
                </p>
              </div>

              <div className="step-arrow-container">
                <svg className="step-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="#DC1436" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              <div className="step-card">
                <h3 className="step-card-header">
                  Step 4: <span className="red-highlight">Train Your Team & Go Live</span>
                </h3>
                <p className="step-card-desc">
                  Your team is trained for smooth adoption, followed by a complete shift to the live system.
                </p>
              </div>

            </div>

            {/* Handshake Image Column */}
            <div className="works-image-col">
              <img src={howItWorksImg} alt="Businessmen Shaking Hands in Armchairs" className="works-handshake-img" />
            </div>

          </div>
        </div>
      </section>

      {/* Dedicated Support Section */}
      <section className="support-section">
        <div className="support-container">
          <h2 className="support-title">
            Dedicated Support at <span className="red-highlight">Every Step</span>
          </h2>
          
          <p className="support-p1">
            Implementing an ERP system is a journey and we're with you every step of the way.
          </p>
          
          <p className="support-p2">
            From initial consultation and onboarding to training, customization and ongoing support, our dedicated experts ensure a smooth transition and long-term success.
          </p>

          <div className="support-timeline-wrapper">
            
            {/* Step 1 (Odd) */}
            <div className="timeline-step-row">
              <div className="timeline-col left-align">
                <div className="timeline-icon-box">
                  <Handshake strokeWidth={1.5} />
                </div>
              </div>
              <div className="timeline-center-node">
                <div className="timeline-marker-square"></div>
              </div>
              <div className="timeline-col right-align">
                <span className="timeline-label-text">Faster onboarding with expert guidance</span>
              </div>
            </div>

            {/* Step 2 (Even) - Active */}
            <div className="timeline-step-row">
              <div className="timeline-col left-align">
                <span className="timeline-label-text active">Hassle-free implementation and migration</span>
              </div>
              <div className="timeline-center-node">
                <div className="timeline-marker-square active"></div>
              </div>
              <div className="timeline-col right-align">
                <div className="timeline-icon-box active">
                  <Cog strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Step 3 (Odd) */}
            <div className="timeline-step-row">
              <div className="timeline-col left-align">
                <div className="timeline-icon-box">
                  <Users strokeWidth={1.5} />
                </div>
              </div>
              <div className="timeline-center-node">
                <div className="timeline-marker-square"></div>
              </div>
              <div className="timeline-col right-align">
                <span className="timeline-label-text">Quick user adoption through hands-on training</span>
              </div>
            </div>

            {/* Step 4 (Even) */}
            <div className="timeline-step-row">
              <div className="timeline-col left-align">
                <span className="timeline-label-text">Reliable support when you need it most</span>
              </div>
              <div className="timeline-center-node">
                <div className="timeline-marker-square"></div>
              </div>
              <div className="timeline-col right-align">
                <div className="timeline-icon-box">
                  <Wrench strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Step 5 (Odd) */}
            <div className="timeline-step-row">
              <div className="timeline-col left-align">
                <div className="timeline-icon-box">
                  <TrendingUp strokeWidth={1.5} />
                </div>
              </div>
              <div className="timeline-center-node">
                <div className="timeline-marker-square"></div>
              </div>
              <div className="timeline-col right-align">
                <span className="timeline-label-text">Continuous improvements as you grow</span>
              </div>
            </div>

            {/* Step 6 (Even) */}
            <div className="timeline-step-row">
              <div className="timeline-col left-align">
                <span className="timeline-label-text">Dedicated experts invested in your success</span>
              </div>
              <div className="timeline-center-node">
                <div className="timeline-marker-square"></div>
              </div>
              <div className="timeline-col right-align">
                <div className="timeline-icon-box">
                  <UserCheck strokeWidth={1.5} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Partnership CTA Section */}
      <section className="cta-partnership-section">
        <div className="cta-partnership-container">
          <h2 className="cta-partnership-heading">
            <span className="red-highlight">At Vellko,</span> we don't just deliver software we build long-term partnerships that help your business grow with confidence.
          </h2>
          <button className="cta-partnership-btn">
            Discover How Vellko ERP works for your Business
          </button>
        </div>
      </section>

      {/* Customer Experiences / Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="testimonials-title">
            Customer Experiences That Speak for <span className="red-highlight">Themselves</span>
          </h2>

          {/* Single unified white card */}
          <div className="testimonials-card-wrap">

            {/* Left: Avatar Stack */}
            <div className="testimonials-avatars-col">
              {testimonialData.map((t, idx) => (
                <button
                  key={idx}
                  className={`testimonial-avatar-btn ${activeTestimonial === idx ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`View testimonial from ${t.name}`}
                >
                  <img src={t.img} alt={t.name} />
                </button>
              ))}
            </div>

            {/* Thin vertical divider */}
            <div className="testimonials-divider" />

            {/* Right: Testimonial Content */}
            <div className="testimonials-content" key={activeTestimonial}>
              <p className="testimonial-quote-main">
                {activeTesti.quote}
              </p>
              <p className="testimonial-quote-sub">
                {activeTesti.sub}
              </p>
              <p className="testimonial-person-name">{activeTesti.name}</p>
              <p className="testimonial-person-role">{activeTesti.role}</p>

              <div className="testimonial-footer">
                <hr className="testimonial-dashes" />
                <div className="testimonial-stars">
                  {Array.from({ length: activeTesti.stars }).map((_, i) => (
                    <Star key={i} className="star-icon" />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA Banner Section */}
      <section className="final-cta-section">
        <div className="final-cta-container">
          <h2 className="final-cta-heading">
            Ready to simplify operations and accelerate growth with <span className="red-highlight">Vellko ERP?</span>
          </h2>
          <div className="final-cta-buttons">
            <button className="final-cta-btn-primary">Request a Demo</button>
            <button className="final-cta-btn-secondary">Get Started</button>
          </div>
        </div>
      </section>
    </>
  );
}

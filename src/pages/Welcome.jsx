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

import manufacturingGif from '../assets/images/manufacturing.gif';
import retailGif from '../assets/images/retail.gif';
import distributionGif from '../assets/images/distribution.gif';
import healthcareGif from '../assets/images/healthcare.gif';
import educationGif from '../assets/images/education.gif';
import realEstateGif from '../assets/images/real-estate.gif';
import servicesGif from '../assets/images/services.gif';
import ecommerceGif from '../assets/images/ecommerce.gif';
import testimonial1 from '../assets/images/testimonial-1.png';
import testimonial2 from '../assets/images/testimonial-2.png';
import testimonial3 from '../assets/images/testimonial-3.png';
import dashboardMonitor from '../assets/images/dashboard-monitor.png';

const modulesData = [
  {
    title: "CRM & Lead Management",
    subtitle: "Never Lose Sight of an Opportunity.",
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
    subtitle: "Know Your Workforce Better.",
    desc: "From recruitment to payroll, every employee record, attendance update, leave request and performance review is organized in one place- giving HR teams the information they need without searching through multiple systems.",
    features: [
      "Payroll Management",
      "Attendance Tracking",
      "Leave Management",
      "Employee Self-Service",
      "Centralized Employee Records",
      "Workforce Analytics",
      "Performance Tracking"
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
    subtitle: "Accurate Attendance. Automated Payroll.",
    desc: "Connect your biometric devices directly with Vellko ERP to capture attendance data in real time. Automatically sync attendance records with payroll, shift schedules, and workforce reports reducing manual work and improving accuracy across your HR operations.",
    featuresTitle: "Key Benefits",
    features: [
      "Real-Time Attendance Tracking",
      "Automated Payroll Integration",
      "Employee Time Monitoring",
      "Reduced Manual Errors",
      "Improved Workforce Accountability"
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
    subtitle: "Plan Better. Execute Faster.",
    desc: "Manage projects, tasks, resources and teams from one centralized workspace. Vellko ERP helps you streamline project execution with real-time visibility into progress, deadlines, and team performance keeping every project on track and every team aligned.",
    features: [
      "Project Creation & Tracking",
      "Task Assignment",
      "Deadline Management",
      "Resource Planning",
      "Team Collaboration",
      "Productivity Monitoring"
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
    subtitle: "Gain Complete Financial Control",
    desc: "Financial decisions shouldn't depend on outdated reports. Vellko ERP gives you real-time access to cash flow, payables, receivables, purchases and GST-compliant accounting, so you always know where your business stands.",
    features: [],
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
    desc: "Manage customer inquiries, service requests and support tickets from a single platform. Vellko ERP helps your teams resolve issues faster, track service performance, and maintain SLA compliance ensuring every customer interaction is seamless and measurable.",
    features: [
      "Ticket & Service Request Management",
      "SLA Monitoring",
      "Issue Resolution Tracking",
      "Customer Support Analytics",
      "Service Performance Reports"
    ],
    iconSvg: (
      <svg className="module-card-icon-svg" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    title: "Business Intelligence & Analytics",
    subtitle: "Turn Data into Smarter Decisions",
    desc: "Stop searching for reports across different systems. Vellko ERP transforms business data into live dashboards that help leaders understand performance, identify opportunities, and act faster.",
    features: [
      "KPI & Executive Dashboards",
      "Real-Time Reporting",
      "Revenue Analytics",
      "Inventory Insights",
      "HR Analytics",
      "Sales Performance Reports",
      "Financial Reporting"
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
    icon: <img src={manufacturingGif} alt="Manufacturing" className="industry-gif-icon" />
  },
  {
    title: "Retail",
    desc: "Unify inventory, billing, customer management and multi-store operations.",
    icon: <img src={retailGif} alt="Retail" className="industry-gif-icon" />
  },
  {
    title: "Distribution",
    desc: "Streamline logistics, warehouse management, procurement and stock movement.",
    icon: <img src={distributionGif} alt="Distribution" className="industry-gif-icon" />
  },
  {
    title: "Healthcare",
    desc: "Simplify administration, finance, inventory, HR and operational workflows.",
    icon: <img src={healthcareGif} alt="Healthcare" className="industry-gif-icon" />
  },
  {
    title: "Education",
    desc: "Manage admissions, attendance, payroll, fees and administrative processes.",
    icon: <img src={educationGif} alt="Education" className="industry-gif-icon" />
  },
  {
    title: "Real Estate",
    desc: "Track projects, finances, resources and customer relationships in one place.",
    icon: <img src={realEstateGif} alt="Real Estate" className="industry-gif-icon" />
  },
  {
    title: "Professional Services",
    desc: "Improve project delivery, resource utilization and team collaboration.",
    icon: <img src={servicesGif} alt="Professional Services" className="industry-gif-icon" />
  },
  {
    title: "E-Commerce",
    desc: "Synchronize orders, inventory, customers and business operations seamlessly.",
    icon: <img src={ecommerceGif} alt="E-Commerce" className="industry-gif-icon" />
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

const sectorAngles = [
  { start: 321, end: 348, side: 'left' },  // CRM to HRMS
  { start: 12,  end: 39,  side: 'right' }, // HRMS to Biometric
  { start: 64,  end: 91,  side: 'right' }, // Biometric to Work
  { start: 115, end: 142, side: 'right' }, // Work to Finance
  { start: 166, end: 194, side: 'right' }, // Finance to Service
  { start: 218, end: 245, side: 'left' },  // Service to BI
  { start: 269, end: 296, side: 'left' }   // BI to CRM
];

const getArcPath = (startAngle, endAngle, radius) => {
  const startRad = ((startAngle - 90) * Math.PI) / 180;
  const endRad = ((endAngle - 90) * Math.PI) / 180;
  const x1 = 220 + radius * Math.cos(startRad);
  const y1 = 220 + radius * Math.sin(startRad);
  const x2 = 220 + radius * Math.cos(endRad);
  const y2 = 220 + radius * Math.sin(endRad);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2}`;
};

const isSectorActive = (index, active) => {
  if (active === 0) return index === 6 || index === 0;
  if (active === 1) return index === 0 || index === 1;
  if (active === 2) return index === 1 || index === 2;
  if (active === 3) return index === 2 || index === 3;
  if (active === 4) return index === 3 || index === 4;
  if (active === 5) return index === 4 || index === 5;
  if (active === 6) return index === 5 || index === 6;
  return false;
};

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
        
        {/* Top Centered Split Heading */}
        <div className="split-comp-header-wrapper">
          <h2 className="split-comp-title">
            <span className="split-title-left">One Platform.</span>
            <span className="split-title-right">Every Department.</span>
          </h2>
        </div>

        {/* Left-aligned Description paragraph on the grey side */}
        <div className="split-comp-desc-container">
          <p className="split-comp-desc">
            Eliminate disconnected tools and manage your entire business from a single cloud-based platform.
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
            <div className="module-card-header">
              <div className="module-card-icon-container">
                {activeData.iconSvg}
              </div>
              <h3 className="module-card-title">{activeData.title}</h3>
            </div>

            <p className="module-card-desc">{activeData.subtitle}</p>
            <p className="module-card-desc">{activeData.desc}</p>

            {activeModule === 4 ? (
              <div className="finance-nested-sections">
                {/* Financial Management Sub-section */}
                <div className="module-features-title-row">
                  Financial Management
                </div>
                <ul className="module-features-list" style={{ marginBottom: '2rem' }}>
                  {[
                    "General Ledger",
                    "Accounts Payable & Receivable",
                    "Cash Flow Management",
                    "Budget Planning",
                    "GST Billing & Compliance",
                    "E-Invoicing",
                    "Profit & Loss Reporting"
                  ].map((feature, idx) => (
                    <li key={idx} className="module-feature-item">
                      <svg className="feature-checkbox-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="4" stroke="#111827" strokeWidth="2" fill="none" />
                        <path d="M7 11.5L10.5 15L17 7.5" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Purchase Management Sub-section */}
                <div className="module-features-title-row">
                  Purchase Management
                </div>
                <ul className="module-features-list" style={{ marginBottom: '2.5rem' }}>
                  {[
                    "Vendor Management",
                    "Purchase Requisitions",
                    "Purchase Orders",
                    "Approval Workflows",
                    "Supplier Performance Tracking"
                  ].map((feature, idx) => (
                    <li key={idx} className="module-feature-item">
                      <svg className="feature-checkbox-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="4" stroke="#111827" strokeWidth="2" fill="none" />
                        <path d="M7 11.5L10.5 15L17 7.5" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Inventory Management Sub-section */}
                <div className="module-features-title-row">
                  Inventory Management
                </div>
                <p className="module-card-desc" style={{ color: '#111827', fontStyle: 'italic', marginTop: '0.75rem', marginBottom: '0.75rem' }}>
                  Know What's in Stock Before It Becomes a Problem.
                </p>
                <p className="module-card-desc" style={{ fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                  Manage inventory seamlessly across warehouses, branches and locations from a single platform. Vellko ERP provides real-time stock visibility, streamlined warehouse operations and accurate inventory tracking helping you reduce stockouts, prevent overstocking and improve operational efficiency.
                </p>
                <div className="module-features-title-row">
                  Key Features
                </div>
                <ul className="module-features-list">
                  {[
                    "Real-Time Stock Tracking",
                    "Multi-Warehouse Management",
                    "Stock Transfers",
                    "Batch & Lot Tracking",
                    "Inventory Valuation",
                    "Purchase Integration",
                    "Sales Integration"
                  ].map((feature, idx) => (
                    <li key={idx} className="module-feature-item">
                      <svg className="feature-checkbox-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="4" stroke="#111827" strokeWidth="2" fill="none" />
                        <path d="M7 11.5L10.5 15L17 7.5" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                <div className="module-features-title-row">
                  {activeData.featuresTitle || "Key Features"}
                </div>

                <ul className="module-features-list">
                  {activeData.features.map((feature, idx) => (
                    <li key={idx} className="module-feature-item">
                      <svg className="feature-checkbox-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="4" stroke="#111827" strokeWidth="2" fill="none" />
                        <path d="M7 11.5L10.5 15L17 7.5" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="circular-graphic-container">
            {/* SVG containing the concentric rings and split alternating arcs */}
            <svg className="circular-ring-svg" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
              {sectorAngles.map((sector, index) => {
                // Static color assignments: outer line is grey, inner line is crimson
                const outerColor = '#cbd5e1';
                const innerColor = '#DC1436';
                
                return (
                  <g key={index}>
                    {/* Outer Arc */}
                    <path
                      d={getArcPath(sector.start, sector.end, 160)}
                      stroke={outerColor}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Inner Arc */}
                    <path
                      d={getArcPath(sector.start, sector.end, 148)}
                      stroke={innerColor}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Feature Labels */}
            {[
              { title: "CRM\n& Lead\nManagement", x: 22.6, y: 28.2, moduleId: 0 },
              { title: "HRMS &\nWorkforce\nManagement", x: 50.0, y: 15.0, moduleId: 1 },
              { title: "Biometric\nAttendance\nIntegration", x: 77.4, y: 28.2, moduleId: 2 },
              { title: "Work & Project\nManagement", x: 84.1, y: 57.8, moduleId: 3 },
              { title: "Finance &\nPurchase\nManagement", x: 65.2, y: 81.5, moduleId: 4 },
              { title: "Service\nManagement &\nCustomer Support", x: 34.8, y: 81.5, moduleId: 5 },
              { title: "Business\nIntelligence &\nAnalytics", x: 15.9, y: 57.8, moduleId: 6 }
            ].map((item, index) => {
              const isLabelActive = activeModule === item.moduleId;
              return (
                <button
                  key={index}
                  className={`circular-label-button ${isLabelActive ? 'active' : ''}`}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                  onClick={() => setActiveModule(item.moduleId)}
                >
                  {item.title}
                </button>
              );
            })}

            {/* Dashboard Monitor Image in the center */}
            <div className="dashboard-monitor-wrapper-absolute">
              <img src={dashboardMonitor} alt="Vellko ERP Dashboard Mockup" className="dashboard-monitor-img" />
            </div>

          </div>
        </div>
      </section>

      {/* Every Industry Has Different Challenges Section */}
      <section className="industry-section">
        <div className="industry-container">
          
          {/* Left Column: Heading, 8 Cards Grid, and bottom subtitle */}
          <div className="industry-left-col">
            <h2 className="industry-title">
              Every Industry Has Different Challenges. <span className="red-highlight">Every Business Deserves the Same Visibility.</span>
            </h2>

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

            <p className="industry-bottom-highlight">
              Synchronize orders, inventory, customers and business operations seamlessly.<br />
              Your business is unique. Your ERP should be too.
            </p>
          </div>

          {/* Right Column: Globe, Description Paragraphs, and Action buttons */}
          <div className="industry-right-col">
            <div className="industry-globe-wrapper">
              <img src={globeGif} alt="Rotating Globe" className="industry-globe-img" />
            </div>

            <div className="industry-right-content">
              <p className="industry-bottom-p1">
                Businesses rarely struggle because they lack information. They struggle because information is scattered across different tools, departments and people. When nobody sees the complete picture, decisions become slower, errors increase and growth becomes difficult to manage.
              </p>
              <p className="industry-bottom-p2">
                <span className="red-highlight">Vellko ERP</span> creates a single source of truth, giving every department access to the same accurate information at the right time.
              </p>

              <div className="industry-bottom-actions">
                <button className="industry-btn-filled">Explore Your Industry Solution</button>
                <button className="industry-btn-outline">Get Started</button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why Do Businesses Need an ERP System Split Section */}
      {/* Why Do Businesses Need an ERP System Redesigned Section */}
      <section className="need-erp-section">
        
        <div className="need-centered-title-wrapper">
          <h2 className="need-centered-title">
            Why Do Businesses Need an <span className="red-highlight">ERP System?</span>
          </h2>
        </div>

        {/* Table Card */}
        <div className="need-table-card">
          <table className="need-table">
            <thead>
              <tr>
                <th>Business Challenge</th>
                <th>How Vellko ERP Solves It</th>
              </tr>
            </thead>
            <tbody>
              {needErpData.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="need-cell-content">
                      <span className="need-cell-text">{item.challenge}</span>
                      <span className="need-icon-cross">✕</span>
                    </div>
                  </td>
                  <td>
                    <div className="need-cell-content">
                      <span className="need-cell-text">{item.solution}</span>
                      <span className="need-icon-check">✓</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Centered Paragraphs */}
        <div className="need-bottom-block">
          <p className="need-bottom-p1">
            As your business grows, managing operations through spreadsheets, emails and disconnected software becomes inefficient, expensive and difficult to scale.
          </p>
          <p className="need-bottom-p1">
            An ERP system brings every department together giving your teams one centralized platform to manage operations, automate workflows and access real-time business data.
          </p>
          <p className="need-bottom-p1">
            With <span className="red-highlight">Vellko ERP</span>, you can eliminate operational bottlenecks, reduce manual work and gain complete visibility across your business.
          </p>
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
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="result-bullet-text">Save time by automating daily operations</span>
                </li>

                <li className="result-bullet-item">
                  <div className="result-check-circle">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="result-bullet-text">Reduce operational costs and manual errors</span>
                </li>

                <li className="result-bullet-item">
                  <div className="result-check-circle">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="result-bullet-text">Increase team productivity and accountability</span>
                </li>

                <li className="result-bullet-item">
                  <div className="result-check-circle">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="result-bullet-text">Make faster, data-driven decisions</span>
                </li>

                <li className="result-bullet-item">
                  <div className="result-check-circle">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="result-bullet-text">Scale your business without adding complexity</span>
                </li>
              </ul>
            </div>

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
                <svg className="step-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="#DC1436" strokeWidth="5.5" strokeLinecap="square" strokeLinejoin="miter">
                  <polyline points="4 7 12 16 20 7" />
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
                <svg className="step-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="#DC1436" strokeWidth="5.5" strokeLinecap="square" strokeLinejoin="miter">
                  <polyline points="4 7 12 16 20 7" />
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
                <svg className="step-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="#DC1436" strokeWidth="5.5" strokeLinecap="square" strokeLinejoin="miter">
                  <polyline points="4 7 12 16 20 7" />
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

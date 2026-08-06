import { useState, useEffect, useRef } from 'react';
import dashboardMonitor from '../../assets/images/dashboard-monitor.png';

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
    features: [
      "Financial Accounting",
      "Cash Flow & Budgeting",
      "GST & Compliance",
      "Purchase Management",
      "Vendor & Supplier Management"
    ],
    iconSvg: (
      <svg className="module-card-icon-svg" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    title: "Inventory Management",
    subtitle: "Know What's in Stock Before It Becomes a Problem.",
    desc: "Manage inventory seamlessly across warehouses, branches and locations from a single platform. Vellko ERP provides real-time stock visibility, streamlined warehouse operations and accurate inventory tracking helping you reduce stockouts, prevent overstocking and improve operational efficiency.",
    features: [
      "Real-Time Stock Tracking",
      "Multi-Warehouse Management",
      "Stock Transfers",
      "Batch & Lot Tracking",
      "Inventory Valuation",
      "Purchase Integration",
      "Sales Integration"
    ],
    iconSvg: (
      <svg className="module-card-icon-svg" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
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

const sectorAngles = [
  { start: 324, end: 351, side: 'left' },  // CRM to HRMS
  { start: 9,   end: 36,  side: 'right' }, // HRMS to Biometric
  { start: 54,  end: 81,  side: 'right' }, // Biometric to Work
  { start: 99,  end: 126, side: 'right' }, // Work to Finance
  { start: 144, end: 171, side: 'right' }, // Finance to Inventory
  { start: 189, end: 216, side: 'left' },  // Inventory to Service
  { start: 234, end: 261, side: 'left' },  // Service to BI
  { start: 279, end: 306, side: 'left' }   // BI to CRM
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

export default function AllInOneSection() {
  const [activeModule, setActiveModule] = useState(0);
  const activeData = modulesData[activeModule];
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 1024) return;
      if (!scrollWrapperRef.current) return;
      
      const rect = scrollWrapperRef.current.getBoundingClientRect();
      const stickyTop = 90;
      const scrolled = stickyTop - rect.top;
      const totalScrollable = rect.height - window.innerHeight;
      
      if (totalScrollable <= 0) return;
      
      // Scale down active scrollable area by 0.85 to trigger final active state before unpinning
      const progress = Math.max(0, Math.min(1, scrolled / (totalScrollable * 0.85)));
      const index = Math.min(7, Math.floor(progress * 8));
      setActiveModule(index);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleModuleClick = (idx) => {
    if (window.innerWidth <= 1024 || !scrollWrapperRef.current) {
      setActiveModule(idx);
      return;
    }
    
    const rect = scrollWrapperRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    
    const progress = (idx + 0.5) / 8;
    const targetScrollY = window.scrollY + rect.top - 90 + (progress * totalScrollable * 0.85);
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  return (
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

      <div className="all-in-one-scroll-wrapper" ref={scrollWrapperRef}>
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
        </div>

        <div className="circular-graphic-container">
          {/* SVG containing concentric rings and split alternating arcs */}
          <svg className="circular-ring-svg" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg">
            {sectorAngles.map((sector, index) => {
              const outerColor = '#cbd5e1';
              const innerColor = '#DC1436';
              
              return (
                <g key={index}>
                  {/* Outer Arc */}
                  <path
                    d={getArcPath(sector.start, sector.end, 156)}
                    stroke={outerColor}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Inner Arc */}
                  <path
                    d={getArcPath(sector.start, sector.end, 150)}
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
            { title: "CRM\n& Lead\nManagement", x: 25.3, y: 25.3, moduleId: 0 },
            { title: "HRMS &\nWorkforce\nManagement", x: 50.0, y: 15.0, moduleId: 1 },
            { title: "Biometric\nAttendance\nIntegration", x: 74.7, y: 25.3, moduleId: 2 },
            { title: "Work & Project\nManagement", x: 85.0, y: 50.0, moduleId: 3 },
            { title: "Finance &\nPurchase\nManagement", x: 74.7, y: 74.7, moduleId: 4 },
            { title: "Inventory\nManagement", x: 50.0, y: 85.0, moduleId: 5 },
            { title: "Service\nManagement &\nCustomer Support", x: 25.3, y: 74.7, moduleId: 6 },
            { title: "Business\nIntelligence &\nAnalytics", x: 15.0, y: 50.0, moduleId: 7 }
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
                onClick={() => handleModuleClick(item.moduleId)}
              >
                {item.title}
              </button>
            );
          })}

          {/* Dashboard Monitor Image in center */}
          <div className="dashboard-monitor-wrapper-absolute">
            <img src={dashboardMonitor} alt="Vellko ERP Dashboard Mockup" className="dashboard-monitor-img" />
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}

import IndustryPage from './IndustryPage';

export default function RealEstateErp() {
  const beyondFeaturesList = [
    "Property Management",
    "Sales & Lead Management",
    "Leasing & Tenant Management",
    "Maintenance Management",
    "Finance & Accounting",
    "CRM & Customer Management",
    "Vendor & Contractor Management",
    "Real-Time Analytics & Reporting"
  ];

  const splitLeftListItems = [
    "Property data across multiple systems",
    "Manual tenant tracking",
    "Spreadsheet-based sales tracking",
    "Paper-based lease management",
    "Delayed maintenance requests",
    "Limited business insights",
    "Manual rent collection",
    "Difficult portfolio management"
  ];

  const splitRightListItems = [
    "Centralized property database",
    "Automated tenant management",
    "Real-time sales pipeline",
    "Digital lease workflows",
    "Automated maintenance tracking",
    "Live dashboards and analytics",
    "Automated payment tracking",
    "Centralized portfolio visibility"
  ];

  const allInOneModulesList = [
    {
      circleName: "Property\nManagement",
      title: "Property Management",
      subtitle: "Every Property. One Secure Platform.",
      desc: "Manage commercial, residential industrial, mixed-use, and residential properties using a centralized system. Keep property information such as floor plans, ownership records documents, occupancy details.",
      features: [
        "Property Database",
        "Unit Management",
        "Property Documents",
        "Ownership Records",
        "Occupancy Tracking",
        "Asset Management",
        "Property Categorization"
      ]
    },
    {
      circleName: "Sales &\nLead",
      title: "Sales & Lead Management",
      subtitle: "Convert More Leads into Property Sales.",
      desc: "Take leads from various channels, distribute these leads to your sales team, keep track of the progress of leads, schedule visits to sites and manage the whole sales pipeline.",
      features: [
        "Lead Capture",
        "Lead Assignment",
        "Follow-Up Management",
        "Sales Pipeline Tracking",
        "Site Visit Scheduling",
        "Deal Management",
        "Sales Reporting"
      ]
    },
    {
      circleName: "Leasing &\nTenant",
      title: "Leasing & Tenant Management",
      subtitle: "Simplify Leasing Operations.",
      desc: "Control the tenant's records, lease agreements renewals, rent schedules deposits, and communications on one platform.",
      features: [
        "Tenant Profiles",
        "Lease Management",
        "Rent Collection Tracking",
        "Security Deposits",
        "Lease Renewals",
        "Tenant Communication",
        "Occupancy Reports"
      ]
    },
    {
      circleName: "Finance &\nAccounting",
      title: "Finance & Accounting",
      subtitle: "Complete Financial Control for Your Properties.",
      desc: "Automate rental collection, invoicing, expenses, budgeting, payments to vendors, and financial reports.",
      features: [
        "Rent Invoicing",
        "Accounts Receivable",
        "Accounts Payable",
        "Budget Management",
        "Vendor Payments",
        "Financial Statements",
        "Revenue Tracking"
      ]
    },
    {
      circleName: "Maintenance\nManagement",
      title: "Maintenance Management",
      subtitle: "Keep Properties Running Efficiently.",
      desc: "Monitor maintenance requests and give tasks and tasks to contractor contractors, keep track of the progress and keep the service records of each property.",
      features: [
        "Maintenance Requests",
        "Work Order Management",
        "Contractor Assignments",
        "Service Scheduling",
        "Asset Maintenance History",
        "Cost Tracking",
        "Maintenance Reports"
      ]
    },
    {
      circleName: "CRM &\nCustomer",
      title: "CRM & Customer Management",
      subtitle: "Build Stronger Customer Relationships.",
      desc: "Control buyers, prospects tenants, investors and property owners with one CRM system that is integrated.",
      features: [
        "Customer Profiles",
        "Contact Management",
        "Communication History",
        "Automated Follow-Ups",
        "Customer Segmentation",
        "Inquiry Tracking",
        "Relationship Management"
      ]
    },
    {
      circleName: "Vendor &\nContractor",
      title: "Vendor & Contractor Management",
      subtitle: "Manage Service Providers Efficiently.",
      desc: "Keep records of vendor contracts, contract information as well as invoices, performance history, and payment schedules all on one central platform.",
      features: [
        "Vendor Database",
        "Contract Management",
        "Purchase Orders",
        "Service Agreements",
        "Invoice Tracking",
        "Performance Evaluation",
        "Vendor Reports"
      ]
    },
    {
      circleName: "Real Estate\nAnalytics",
      title: "Real Estate Analytics",
      subtitle: "Make Better Business Decisions.",
      desc: "Transform customer and property data into actionable insights that will help increase occupancy rates and rental revenue, sales performance and the growth of your portfolio.",
      features: [
        "Portfolio Dashboard",
        "Occupancy Analytics",
        "Rental Performance Reports",
        "Sales Analytics",
        "Revenue Reports",
        "Maintenance Insights",
        "Executive Dashboards"
      ]
    }
  ];

  const chooseRowsList = [
    { left: "Property data scattered across systems", right: "Centralized property records" },
    { left: "Manual rent tracking", right: "Automated rent management" },
    { left: "Poor lead follow-up", right: "CRM-driven sales workflows" },
    { left: "Lease management complexity", right: "Digital lease management" },
    { left: "Delayed maintenance response", right: "Automated maintenance workflows" },
    { left: "Limited portfolio visibility", right: "Real-time dashboards" },
    { left: "Financial tracking difficulties", right: "Integrated accounting" },
    { left: "Manual reporting", right: "Automated analytics and reports" }
  ];

  const worksStepsList = [
    {
      stepNum: 1,
      title: "Schedule a Free ERP Demo",
      desc: "See how Vellko ERP can automate and track your listings, tenants, and portfolios in a live demonstration."
    },
    {
      stepNum: 2,
      title: "Understand Your Real Estate Operations",
      desc: "We analyze your tenancy terms, lease schedules, billing cycles, sales funnels, and maintenance protocols."
    },
    {
      stepNum: 3,
      title: "Configure Workflows & Import Property Data",
      desc: "We import your property profiles, tenant ledgers, and configure automated billing and service request tracking."
    },
    {
      stepNum: 4,
      title: "Train Your Team & Go Live",
      desc: "Your property agents, finance executives, maintenance dispatchers, and managers undergo training to go live."
    }
  ];

  const supportStepsList = [
    "Property Data Migration",
    "Secure Data Transfer",
    "Workflow Configuration",
    "Financial System Setup",
    "Staff Training",
    "Ongoing Technical Support",
    "Future-Ready Platform Enhancements"
  ];

  const faqItemsList = [
    {
      question: "Is Vellko Real Estate ERP suitable for small and large real estate companies?",
      answer: "Yes. The platform can scale starting from smaller property management companies to massive real estate corporations."
    },
    {
      question: "Can it manage multiple properties and locations?",
      answer: "Yes. There is the ability to control multiple buildings, projects branches, properties, and projects through one dashboard."
    },
    {
      question: "Does it support lease and tenant management?",
      answer: "Yes. The system is able to manage leases renewals lease schedules, rent plans, tenants' records and occupancy monitoring."
    },
    {
      question: "Can finance and property management work together?",
      answer: "Yes. Maintenance, finance, leasing and sales operations are completely integrated."
    },
    {
      question: "Can the ERP be customized?",
      answer: "Absolutely. Workflows and reports, processes for approval and modules can be customized to meet your company's requirements."
    }
  ];

  return (
    <IndustryPage
      title="Manage Your Real Estate Business with"
      highlight="Complete Visibility"
      tagline="One Real Estate Platform. Smarter Property Management."
      desc="Vellko Real Estate ERP a cloud-based property management software that integrates leasing, sales property management Finance maintenance, CRM and reporting onto an intelligent platform. It allows real estate firms to manage tenants, properties, agents, and operations in complete control and with confidence."
      beyondTitle="Real Estate Management Shouldn't Be"
      beyondHighlight="Complicated"
      beyondSubCol1={
        <>
          <span className="red-highlight">Real estate companies that are growing</span> shouldn't have to struggle with disconnected systems and manual procedures.
        </>
      }
      beyondSubCol2={
        <>
          <span className="red-highlight">A lot of companies</span> are facing challenges because property information, customer queries leasing agreements, requests for maintenance and financial data are scattered across spreadsheets, emails, and various software applications.
        </>
      }
      beyondDesc="Vellko Real Estate ERP consolidates the entire property system, streamlines routine operations, and provides real-time transparency across every department."
      beyondFeatures={beyondFeaturesList}
      splitTitleLeft="Traditional Real Estate Operations"
      splitTitleRight="Vellko Real Estate ERP"
      splitDescLeft="Property data scattered across multiple systems and tracking manual"
      splitDescRight="with centralized property database profiles and real-time sales pipelines."
      splitHeaderLeft="Traditional Real Estate Management"
      splitHeaderRight="Vellko Real Estate ERP"
      splitLeftList={splitLeftListItems}
      splitRightList={splitRightListItems}
      splitClass="industry-split-comparison-section"
      allInOneTitle="Everything Your Real Estate Team Needs in"
      allInOneHighlight="One Platform"
      allInOneTagline="The modern approach to managing real estate goes far more than simply tracking properties."
      allInOneDesc="Vellko Real Estate ERP integrates property management and leasing, sales and maintenance, finance customer relationships, as well as reporting into one unified platform that allows teams to save time in administration and spend more time focusing on growing their business."
      allInOneModules={allInOneModulesList}
      chooseTitle="Why Businesses Choose"
      chooseHighlight="Vellko Real Estate ERP"
      chooseSub1="Property management manual slows growth and causes inefficiencies."
      chooseSub2="Vellko Real Estate ERP helps businesses streamline their operations, increase the visibility of their properties, cut down on administrative work and improve the performance of their property."
      chooseHeaderLeft="Real Estate Challenge"
      chooseHeaderRight="How Vellko Real Estate ERP Solves It"
      chooseRows={chooseRowsList}
      worksTitle="How Vellko Real Estate"
      worksHighlight="ERP Works"
      worksSteps={worksStepsList}
      supportTitle="Dedicated Real Estate"
      supportHighlight="ERP Implementation Support"
      supportSub1="The process of implementing an ERP system goes beyond software installation. It is about changing the way that your real estate business functions."
      supportSub2="Our implementation specialists aid with system configuration as well as property data migration customizing workflows, user training and ongoing support."
      supportSteps={supportStepsList}
      faqTitle="Frequently Asked"
      faqHighlight="Questions"
      faqIntroQ=""
      faqIntroA=""
      faqItems={faqItemsList}
      ctaTitle="Build a Smarter Real Estate Business with Vellko Real Estate ERP"
      ctaDesc="Replace disconnected systems with one intelligent platform that helps you manage properties, automate operations, improve customer experiences, and make better business decisions."
      // Common industry class names
      heroClass="industry-hero-section"
      beyondClass="industry-beyond-section"
      compareClass="industry-need-erp-section"
      allInOneClass="industry-all-in-one-section"
      chooseClass="industry-need-erp-section"
      worksClass="industry-works-section"
      supportClass="industry-support-section"
      faqClass="industry-faq-section"
      ctaClass="industry-final-cta-section"
    />
  );
}

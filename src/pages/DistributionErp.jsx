import { Link } from 'react-router-dom';
import IndustryPage from './IndustryPage';

export default function DistributionErp() {
  const heroBadges = [
    { type: 'img', text: ['One Distribution', 'Platform'] },
    { type: 'svg', text: ['Smarter Supply Chain', 'Management'] }
  ];

  const beyondFeaturesList = [
    { title: "Inventory Management", alt: "Vellko Distribution ERP inventory management dashboard" },
    { title: "Warehouse Management", alt: "Distribution warehouse management software" },
    { title: "Procurement & Purchasing", alt: "Distribution procurement management system" },
    { title: "Sales & Order Management", alt: "Wholesale distribution ERP software" },
    { title: "Supplier Management", alt: "Supplier Management" },
    { title: "Logistics & Delivery Tracking", alt: "Distribution logistics and delivery tracking dashboard" },
    { title: "Finance & Accounting", alt: "Finance & Accounting" },
    { title: "Analytics & Reporting", alt: "Distribution ERP analytics and reporting dashboard" }
  ];

  const splitLeftListItems = [
    "Inventory tracked manually",
    "Separate systems for purchasing and sales",
    "Frequent stock shortages",
    "Manual order processing",
    "Limited warehouse visibility",
    "Difficult supplier management",
    "Delayed reporting",
    "Reactive operations"
  ];

  const splitRightListItems = [
    "Real-time inventory visibility",
    "Unified procurement and sales workflows",
    "Automated stock monitoring",
    "Automated order management",
    "Live warehouse tracking",
    "Centralized supplier management",
    "Real-time business dashboards",
    "Data-driven decision making"
  ];

  const allInOneModulesList = [
    {
      circleName: "Inventory\nManagement",
      title: "Inventory Management",
      subtitle: "Complete Inventory Visibility Across All Locations",
      desc: "Keep track of inventory levels, stock movement, batch numbers, serial numbers, levels of reorders, and availability of products across branches and warehouses at a glance in real time.",
      features: [
        "Real-Time Inventory Tracking",
        "Multi-Warehouse Inventory",
        "Batch & Serial Number Tracking",
        "Stock Transfers",
        "Reorder Alerts",
        "Product Categorization",
        "Inventory Valuation"
      ]
    },
    {
      circleName: "Warehouse\nManagement",
      title: "Warehouse Management",
      subtitle: "Optimize Warehouse Operations",
      desc: "Control the process of receiving, put-away, packing, picking, and inventory movement, all while ensuring complete warehouse visibility.",
      features: [
        "Warehouse Tracking",
        "Bin & Rack Management",
        "Goods Receiving",
        "Picking & Packing",
        "Inventory Transfers",
        "Barcode Scanning",
        "Warehouse Reports"
      ]
    },
    {
      circleName: "Procurement\n& Purchasing",
      title: "Procurement & Purchasing",
      subtitle: "Smarter Purchasing Decisions",
      desc: "Automate the purchase workflow, from purchases to supplier orders, while ensuring optimal levels of inventory.",
      features: [
        "Purchase Requisitions",
        "Purchase Orders",
        "Supplier Quotations",
        "Vendor Management",
        "Goods Receipt Notes",
        "Purchase Approvals",
        "Procurement Reports"
      ]
    },
    {
      circleName: "Sales & Order\nManagement",
      title: "Sales & Order Management",
      subtitle: "Faster Order Processing",
      desc: "Control customers' orders: pricing, invoicing, fulfillment, and returns from centrally managed systems.",
      features: [
        "Sales Orders",
        "Quotation Management",
        "Customer Pricing",
        "Invoice Generation",
        "Order Tracking",
        "Returns Management",
        "Sales Reports"
      ]
    },
    {
      circleName: "Supplier\nManagement",
      title: "Supplier Management",
      subtitle: "Stronger Supplier Relationships",
      desc: "Keep track of supplier information and contract information, performance records, pricing agreements, and procurement history on one platform.",
      features: [
        "Supplier Database",
        "Contract Management",
        "Vendor Performance Tracking",
        "Supplier Communication",
        "Purchase History",
        "Supplier Payments",
        "Vendor Reports"
      ]
    },
    {
      circleName: "Logistics &\nDelivery",
      title: "Logistics & Delivery Management",
      subtitle: "Deliver Orders with Confidence",
      desc: "Monitor deliveries, shipments, as well as transportation costs. Delivery of orders from the warehouse to the customer.",
      features: [
        "Delivery Scheduling",
        "Shipment Tracking",
        "Route Planning",
        "Fleet Monitoring",
        "Delivery Status Updates",
        "Transportation Reports",
        "Logistics Analytics"
      ]
    },
    {
      circleName: "Finance &\nAccounting",
      title: "Finance & Accounting",
      subtitle: "Financial Control Across Operations",
      desc: "Integrate purchasing, inventory logistics, sales, and inventory with accounting, ensuring accurate financial records and increasing the visibility of your business.",
      features: [
        "Accounts Payable",
        "Accounts Receivable",
        "General Ledger",
        "Cash Flow Management",
        "Tax Management",
        "Financial Reporting",
        "Budget Monitoring"
      ]
    },
    {
      circleName: "Analytics\n& Reports",
      title: "Business Analytics & Reporting",
      subtitle: "Make Smarter Business Decisions",
      desc: "Transform the operational information into useful insights to enhance inventory planning as well as sales growth, supplier performance and profitability.",
      features: [
        "Business Dashboards",
        "Inventory Analytics",
        "Sales Performance Reports",
        "Procurement Reports",
        "Supplier Analytics",
        "Financial Reports",
        "KPI Tracking"
      ]
    }
  ];

  const chooseRowsList = [
    { left: "Inventory inaccuracies", right: "Real-time inventory tracking" },
    { left: "Stock shortages", right: "Automated reorder management" },
    { left: "Delayed order fulfillment", right: "Streamlined order workflows" },
    { left: "Poor warehouse visibility", right: "Live warehouse monitoring" },
    { left: "Supplier management challenges", right: "Centralized supplier management" },
    { left: "Manual procurement processes", right: "Automated purchasing workflows" },
    { left: "Disconnected departments", right: "Integrated business operations" },
    { left: "Limited reporting", right: "Real-time dashboards and analytics" }
  ];

  const worksStepsList = [
    {
      stepNum: 1,
      title: "Schedule a Free Distribution ERP Demo",
      desc: "See how Vellko ERP can automate and track your entire supply chain and logistics in a live demonstration."
    },
    {
      stepNum: 2,
      title: "Understand Your Distribution Processes",
      desc: "We analyze your order routing, warehouse layouts, supplier networks, and shipping schedules."
    },
    {
      stepNum: 3,
      title: "Configure Workflows & Import Business Data",
      desc: "We import your client and supplier profiles, configure automated reorder levels, and set up invoice flows."
    },
    {
      stepNum: 4,
      title: "Train Your Team & Go Live",
      desc: "Your logistics, inventory, purchasing, and sales managers receive detailed training for a smooth rollout."
    }
  ];

  const supportStepsList = [
    "Distribution Process Mapping",
    "Secure Data Migration",
    "Inventory & Warehouse Setup",
    "Procurement Configuration",
    "Sales Workflow Configuration",
    "Team Training",
    "Ongoing Product Support",
    "Future System Enhancements"
  ];

  const faqItemsList = [
    {
      question: "Is Vellko Distribution ERP suitable for small and growing distributors?",
      answer: "Yes. The platform was built to be scalable from small-scale distributors to multi-location distribution companies."
    },
    {
      question: "Can it manage multiple warehouses?",
      answer: "Yes. You can control transfers, inventory, and warehouse operations across several locations using a central system."
    },
    {
      question: "Does it support supplier and procurement management?",
      answer: (
        <>
          Yes. The platform offers purchase orders, supplier management, procurement workflows, and vendor performance monitoring with integrated <Link to="/service-management" className="hero-inline-link">service management</Link>.
        </>
      )
    },
    {
      question: "Can finance and inventory work together?",
      answer: "Yes. Sales, inventory, purchasing, and accounting are integrated to provide greater visibility into financial and operational performance."
    },
    {
      question: "Can the system be customized?",
      answer: (
        <>
          Absolutely. Workflows, approvals, reports, user roles, and dashboards can be configured to meet the requirements of your business, including for <Link to="/service-business-erp" className="hero-inline-link">service businesses</Link>.
        </>
      )
    }
  ];

  return (
    <IndustryPage
      title="Cloud based Distribution ERP for"
      highlight="Complete Visibility"
      tagline="One Distribution Platform. Smarter Supply Chain Management."
      desc={
        <>
          Vellkoerp is a Cloud based Distribution ERP software solution that connects <Link to="/inventory-management" className="hero-inline-link">inventory</Link>, procurement, warehouse operations, sales, logistics, supplier management, <Link to="/finance-accounting" className="hero-inline-link">finance</Link>, and reporting on one platform. It helps distributors streamline workflows, improve inventory visibility, manage orders efficiently, and gain greater control over their supply chain.
        </>
      }
      beyondTitle="Distribution Management Shouldn't Be"
      beyondHighlight="Complicated"
      beyondSubCol1={
        <>
          <span className="red-highlight">Distribution companies that are growing</span> struggle due to their operations being spread across spreadsheets as well as manually-generated records, disconnected programs, and many systems.
        </>
      }
      beyondSubCol2={
        <>
          <span className="red-highlight">Vellko Distribution ERP solutions</span> consolidate operations across <Link to="/manufacturing-erp" className="hero-inline-link">Manufacturing ERP</Link>, <Link to="/retail-erp" className="hero-inline-link">Retail ERP</Link>, and <Link to="/e-commerce-erp" className="hero-inline-link">E-Commerce ERP</Link>, giving each department access to precise and real-time business information.
        </>
      }
      beyondDesc="One Platform for Your Entire Distribution Network"
      beyondFeatures={beyondFeaturesList}
      splitTitleLeft="Traditional Distribution"
      splitTitleRight="Vellko Distribution ERP"
      splitDescLeft="Inventory tracked manually and purchasing/sales"
      splitDescRight="systems disconnected with unified operations control."
      splitHeaderLeft="Traditional Distribution"
      splitHeaderRight="Vellko Distribution ERP"
      splitLeftList={splitLeftListItems}
      splitRightList={splitRightListItems}
      splitClass="industry-split-comparison-section"
      allInOneTitle="Everything Your Distribution Business Needs in"
      allInOneHighlight="One Platform"
      allInOneTagline="Modern distribution is more than just inventory tracking."
      allInOneDesc="Vellko Distribution ERP systems integrate inventory, procurement, sales, warehousing, finance, logistics, and analytics into a single platform, allowing businesses to reduce operating costs, increase efficiency, and grow more quickly."
      allInOneModules={allInOneModulesList}
      chooseTitle="Why Businesses Choose"
      chooseHighlight="Vellko Distribution ERP Systems"
      chooseSub1="Manual processes and unconnected systems slow the growth of distribution."
      chooseSub2={
        <>
          Vellko Distribution ERP integrates with our <Link to="/crm-lead-management" className="hero-inline-link">CRM &amp; lead management</Link>, <Link to="/hrms-payroll" className="hero-inline-link">HRMS &amp; payroll</Link>, and <Link to="/project-management" className="hero-inline-link">project management</Link> tools to help companies automate workflows, increase inventory accuracy, and gain complete supply chain transparency.
        </>
      }
      chooseHeaderLeft="Distribution Challenge"
      chooseHeaderRight="How Vellko Distribution ERP Solves It"
      chooseRows={chooseRowsList}
      worksTitle="How Vellko Distribution"
      worksHighlight="ERP Works"
      worksSteps={worksStepsList}
      supportTitle="Dedicated Distribution"
      supportHighlight="ERP Implementation Support"
      supportSub1="Incorporating a distributed ERP involves more than just deploying software. It's about changing the way you run your business."
      supportSub2="Our experts in implementation help with the setup of the system and inventory migration, user training, workflow configuration, and support for the long-term to ensure the success of your deployment."
      supportSteps={supportStepsList}
      faqTitle="Frequently Asked"
      faqHighlight="Questions"
      faqIntroQ=""
      faqIntroA=""
      faqItems={faqItemsList}
      ctaTitle="Build a More Efficient Distribution Network with Vellko Distribution ERP"
      ctaDesc="Replace outdated systems and manual processes using one platform that lets you organize inventory, automate operations, increase visibility of the supply chain, and accelerate the growth of your business."
      badges={heroBadges}
      splitIllustrationAlt="Wholesale distribution ERP software"
      allInOneAlt="Distribution ERP software dashboard"
      worksAlt="Distribution logistics and delivery tracking dashboard"
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

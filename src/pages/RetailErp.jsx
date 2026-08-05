import IndustryPage from './IndustryPage';

export default function RetailErp() {
  const heroBadges = [
    { type: 'img', text: ['One Retail', 'Platform'] },
    { type: 'svg', text: ['Smarter Business', 'Management'] }
  ];

  const beyondFeaturesList = [
    "Inventory Management",
    "Multi-Store Management",
    "Point of Sale (POS)",
    "Procurement & Purchasing",
    "Warehouse Management",
    "Customer Relationship Management (CRM)",
    "Finance & Accounting",
    "Analytics & Reporting"
  ];

  const splitLeftListItems = [
    "Inventory tracked manually",
    "Separate software for each department",
    "Delayed stock updates",
    "Manual purchase planning",
    "Limited sales insights",
    "Multiple data sources",
    "Frequent stock-outs",
    "Time-consuming reporting",
    "Difficult multi-store management"
  ];

  const splitRightListItems = [
    "Real-time inventory management",
    "Unified retail platform",
    "Live inventory visibility",
    "Automated procurement workflows",
    "Real-time business dashboards",
    "Centralized business data",
    "Smart inventory forecasting",
    "Automated reports & analytics",
    "Centralized multi-location control"
  ];

  const allInOneModulesList = [
    {
      circleName: "Inventory\nManagement",
      title: "Inventory Management",
      subtitle: "Complete Control Over Your Inventory",
      desc: "Monitor inventory levels, movement of products, as well as stock valuation and replenishment across all warehouses and store,s all in real time.",
      features: [
        "Real-Time Inventory Tracking",
        "Product Catalog Management",
        "Stock Transfers",
        "Barcode Management",
        "Batch & Serial Tracking",
        "Stock Valuation",
        "Inventory Alerts"
      ]
    },
    {
      circleName: "Multi-Store\nManagement",
      title: "Multi-Store Management",
      subtitle: "Manage Multiple Stores from One Dashboard",
      desc: "Control inventory, sales employees, inventory, and operations across multiple retail stores from an integrated platform.",
      features: [
        "Multi-Branch Management",
        "Centralized Inventory",
        "Store Performance Tracking",
        "Inter-Store Transfers",
        "Unified Reporting",
        "User Access Controls",
        "Branch-Wise Analytics"
      ]
    },
    {
      circleName: "Point of Sale\n(POS)",
      title: "Point of Sale (POS)",
      subtitle: "Fast, Accurate & Connected Sales",
      desc: "Automatically process sales and quickly updating the inventory, customer records, and financial information.",
      features: [
        "Retail POS System",
        "Barcode Scanning",
        "Multiple Payment Methods",
        "Discount Management",
        "Invoice Generation",
        "Return & Refund Processing",
        "Real-Time Sales Sync"
      ]
    },
    {
      circleName: "Procurement\n& Purchasing",
      title: "Procurement & Purchasing",
      subtitle: "Purchase Smarter. Reduce Stock Shortages.",
      desc: "Automate your purchasing workflows and maintain optimal stock levels with intelligent procurement planning.",
      features: [
        "Purchase Requisitions",
        "Vendor Management",
        "Purchase Orders",
        "Goods Receipt Tracking",
        "Supplier Performance Monitoring",
        "Approval Workflows",
        "Procurement Reports"
      ]
    },
    {
      circleName: "Warehouse\nManagement",
      title: "Warehouse Management",
      subtitle: "Optimize Warehouse Operations",
      desc: "Improve accuracy in inventory and warehouse efficiency with efficient inventory management.",
      features: [
        "Warehouse Tracking",
        "Stock Allocation",
        "Receiving & Dispatch",
        "Bin Management",
        "Inventory Audits",
        "Warehouse Transfers",
        "Shipment Tracking"
      ]
    },
    {
      circleName: "Customer\nCRM",
      title: "Customer Relationship Management (CRM)",
      subtitle: "Build Stronger Customer Relationships",
      desc: "Monitor customer interactions, purchase history, loyalty programs, and more from one location.",
      features: [
        "Customer Database",
        "Purchase History",
        "Loyalty Programs",
        "Customer Segmentation",
        "Promotions Management",
        "Customer Support Tracking",
        "Marketing Insights"
      ]
    },
    {
      circleName: "Finance &\nAccounting",
      title: "Finance & Accounting",
      subtitle: "Keep Your Financials Accurate & Up-to-Date",
      desc: "Automatically synchronize purchases, sales, inventory valuations, and expenses with accounting processes.",
      features: [
        "General Ledger",
        "Accounts Payable",
        "Accounts Receivable",
        "Tax Management",
        "Expense Tracking",
        "Financial Reporting",
        "Budget Management"
      ]
    },
    {
      circleName: "Analytics\n& Reports",
      title: "Retail Analytics & Reporting",
      subtitle: "Make Better Business Decisions",
      desc: "Convert operational and sales data into actionable insights to increase profitability and improve business performance.",
      features: [
        "Sales Dashboards",
        "Inventory Reports",
        "Product Performance Analysis",
        "Store Performance Reports",
        "Customer Analytics",
        "Profitability Reports",
        "Executive Dashboards"
      ]
    }
  ];

  const chooseRowsList = [
    { left: "Inventory inaccuracies", right: "Real-time inventory tracking" },
    { left: "Multiple disconnected systems", right: "Unified retail platform" },
    { left: "Stock shortages", right: "Automated replenishment planning" },
    { left: "Slow reporting", right: "Live dashboards & reports" },
    { left: "Multi-store complexity", right: "Centralized store management" },
    { left: "Manual purchasing", right: "Automated procurement workflows" },
    { left: "Poor customer visibility", right: "Integrated CRM" },
    { left: "Financial reconciliation issues", right: "Integrated accounting system" }
  ];

  const worksStepsList = [
    {
      stepNum: 1,
      title: "Schedule a Free Retail ERP Demo",
      desc: "See how Vellko ERP can connect and automate your checkout counters and stockroom in a live demonstration."
    },
    {
      stepNum: 2,
      title: "Understand Your Retail Processes",
      desc: "We analyze your store transactions, multi-branch operations, warehouse sync requirements, and POS checkouts."
    },
    {
      stepNum: 3,
      title: "Configure Workflows & Import Business Data",
      desc: "We import your products catalog, establish stock transfers between locations, and set up automated supplier alerts."
    },
    {
      stepNum: 4,
      title: "Train Your Team & Go Live",
      desc: "Your cashiers, store managers, and procurement staff undergo hands-on system training for a smooth launch."
    }
  ];

  const supportStepsList = [
    "Retail Process Assessment",
    "Secure Data Migration",
    "Inventory & Product Setup",
    "Workflow Configuration",
    "Staff Training",
    "Ongoing Technical Support",
    "Future-Ready ERP Enhancements"
  ];

  const faqItemsList = [
    {
      question: "Is Vellko Retail ERP suitable for small and large retail businesses?",
      answer: "Yes. The platform can scale from single-store stores to multi-location chain stores."
    },
    {
      question: "Can it manage multiple stores and warehouses?",
      answer: "Yes. Vellko Retail industry software ERP provides centralized control of multiple warehouses, stores, inventory, operations, and warehouses."
    },
    {
      question: "Does it support barcode scanning?",
      answer: "Yes. The system is compatible with inventory management using barcodes and POS operations."
    },
    {
      question: "Can inventory be tracked in real time?",
      answer: "Absolutely. Stock level is automatically adjusted following every purchase, sale, transfer, or the adjustment of stock."
    },
    {
      question: "Does it integrate finance and procurement?",
      answer: "Yes. Purchase inventory, accounting, and vendor management integrate into one platform."
    },
    {
      question: "Can different departments have different permissions?",
      answer: "Yes. Role-based access control allows companies to set the rights of store managers, cashiers, finance teams, warehouse employees, and administrators."
    }
  ];

  return (
    <IndustryPage
      title="Manage Your Retail Business with"
      highlight="Complete Visibility"
      tagline="One Retail Platform. Smarter Business Management."
      desc="Vellko Retail ERP software is a cloud-based retail management system that integrates inventory and sales, purchasing, warehouses, and customers with finance and reporting to one sophisticated platform. It assists retailers in streamlining their operations, cutting costs, and making faster business decisions with total control and insight."
      beyondTitle="Retail Management Shouldn't Be"
      beyondHighlight="Complicated"
      beyondSubCol1={
        <>
          <span className="red-highlight">Businesses that are expanding in retail</span> often have to contend with the inability of systems to communicate.
        </>
      }
      beyondSubCol2={
        <>
          <span className="red-highlight">Inventory is tracked</span> using Excel spreadsheets. Sales data is kept within POS systems, while purchasing is handled separately, and finance teams deal with outdated data.
        </>
      }
      beyondDesc="Vellko Retail ERP centralizes every retail business. It automates routine procedures and gives real-time information across warehouses, stores, and departments."
      beyondFeatures={beyondFeaturesList}
      splitTitleLeft="Traditional Retail Management"
      splitTitleRight="Vellko Retail ERP"
      splitDescLeft="Inventory tracked manually and department software"
      splitDescRight="disconnected with unified retail dashboard synchronization."
      splitHeaderLeft="Traditional Retail Management"
      splitHeaderRight="Vellko Retail ERP"
      splitLeftList={splitLeftListItems}
      splitRightList={splitRightListItems}
      splitClass="industry-split-comparison-section"
      allInOneTitle="Everything Your Retail Business Needs in"
      allInOneHighlight="One Platform"
      allInOneTagline="Modern retailing is more than just selling goods."
      allInOneDesc="Vellko Retail ERP software integrates the management of inventory, sales procurement, warehousing and financial management, customer management and reporting into a single system that enables retailers to run effectively and grow with confidence."
      allInOneModules={allInOneModulesList}
      chooseTitle="Why Retailers Choose"
      chooseHighlight="Vellko Retail ERP"
      chooseSub1="Manual retail operations restrict growth."
      chooseSub2="Vellko Retail ERP helps businesses automate their processes, improve the accuracy of inventory, improve purchasing, and gain total control over their processes."
      chooseHeaderLeft="Retail Challenge"
      chooseHeaderRight="How Vellko Retail ERP Solves It"
      chooseRows={chooseRowsList}
      worksTitle="How Vellko Retail"
      worksHighlight="ERP Works"
      worksSteps={worksStepsList}
      supportTitle="Dedicated Retail"
      supportHighlight="ERP Implementation Support"
      supportSub1="Successful ERP implementation goes beyond software deployment."
      supportSub2="Our experts in retail help with the transfer of data as well as inventory setting, workflow configuration, employee training, and continuous assistance to ensure an easy transition."
      supportSteps={supportStepsList}
      faqTitle="Frequently Asked"
      faqHighlight="Questions"
      faqIntroQ=""
      faqIntroA=""
      faqItems={faqItemsList}
      ctaTitle="Build a More Efficient Retail Business with Vellko Retail ERP"
      ctaDesc="Replace disconnected retail systems with one intelligent platform that helps you manage inventory, sales, purchasing, finance, and customer relationships while making smarter business decisions."
      badges={heroBadges}
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

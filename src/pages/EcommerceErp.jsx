import IndustryPage from './IndustryPage';

export default function EcommerceErp() {
  const beyondFeaturesList = [
    "Product Information Management",
    "Inventory & Warehouse Management",
    "Order Management",
    "Customer Management (CRM)",
    "Sales & Payment Management",
    "Purchase & Supplier Management",
    "Marketplace Integration",
    "Reports & Business Analytics"
  ];

  const compareRowsList = [
    { left: "Product data managed manually", right: "Centralized product database" },
    { left: "Inventory tracked through spreadsheets", right: "Real-time inventory management" },
    { left: "Manual order processing", right: "Automated order workflows" },
    { left: "Multiple marketplace management issues", right: "Unified marketplace management" },
    { left: "Delayed sales reporting", right: "Live sales dashboards" },
    { left: "Manual purchase tracking", right: "Automated procurement workflows" },
    { left: "Poor customer visibility", right: "Complete customer insights" },
    { left: "Difficult business scaling", right: "Scalable e-commerce operations" }
  ];

  const allInOneModulesList = [
    {
      circleName: "Product\nInformation",
      title: "Product Information Management",
      subtitle: "Manage Every Product from One Secure Location",
      desc: "Maintain all product information including pricing, categories Images, variants inventory information, as well as documentation of the product in one central system.",
      features: [
        "Centralized Product Catalog",
        "Product Categories Management",
        "Product Variants Management",
        "Pricing Management",
        "Product Images & Documents",
        "SKU Management",
        "Bulk Product Updates"
      ]
    },
    {
      circleName: "Inventory\n& Warehouse",
      title: "Inventory & Warehouse Management",
      subtitle: "Real-Time Inventory Without Manual Tracking",
      desc: "Monitor inventory levels and warehouse operations, as well as movements of inventory, and product availability in real-time. Automate stock updates to prevent stock shortages or overstocking.",
      features: [
        "Real-Time Stock Tracking",
        "Multi-Warehouse Management",
        "Stock Alerts",
        "Inventory Transfers",
        "Barcode Integration",
        "Stock Reports",
        "Inventory Forecasting"
      ]
    },
    {
      circleName: "Order\nManagement",
      title: "Order Management System",
      subtitle: "Manage Orders Faster and Smarter",
      desc: "Automate your entire order lifecycle from ordering to delivery by automating workflows. Keep track of every order's status to enhance customer satisfaction.",
      features: [
        "Order Processing Automation",
        "Order Tracking",
        "Invoice Generation",
        "Returns & Refund Management",
        "Shipping Management",
        "Order Status Updates",
        "Bulk Order Processing"
      ]
    },
    {
      circleName: "Customer\nCRM",
      title: "Customer Relationship Management (CRM)",
      subtitle: "Build Stronger Customer Relationships",
      desc: "Control customer information such as purchase history, customer communications and engagement through one platform.",
      features: [
        "Customer Database",
        "Customer Purchase History",
        "Customer Segmentation",
        "Communication Management",
        "Loyalty Management",
        "Customer Reports",
        "Feedback Tracking"
      ]
    },
    {
      circleName: "Sales &\nPayment",
      title: "Sales & Payment Management",
      subtitle: "Simplify Your Sales Operations",
      desc: "Keep track of your sales and transactions, payments, and sales performance using exact reports.",
      features: [
        "Sales Tracking",
        "Payment Gateway Integration",
        "Invoice Management",
        "Revenue Reports",
        "Tax Management",
        "Transaction History",
        "Sales Analytics"
      ]
    },
    {
      circleName: "Purchase &\nSupplier",
      title: "Purchase & Supplier Management",
      subtitle: "Manage Procurement Efficiently",
      desc: "Automate the management of suppliers and purchasing procedures to ensure that inventory is in a steady flow.",
      features: [
        "Supplier Management",
        "Purchase Orders",
        "Vendor Tracking",
        "Procurement Workflows",
        "Purchase Reports",
        "Cost Management",
        "Supplier Performance Tracking"
      ]
    },
    {
      circleName: "Marketplace\nIntegration",
      title: "Marketplace Integration",
      subtitle: "Manage Multiple Sales Channels Easily",
      desc: "Connect to multiple marketplaces online and manage inventory, products and orders on one dashboard.",
      features: [
        "Marketplace Integration",
        "Multi-Channel Selling",
        "Automated Inventory Sync",
        "Order Synchronization",
        "Product Listing Management",
        "Sales Channel Reports"
      ]
    },
    {
      circleName: "Analytics\n& Reports",
      title: "E-Commerce Analytics & Reports",
      subtitle: "Make Better Business Decisions with Data",
      desc: "Transform your company's data into valuable insights that will enhance sales performance and enhance customer satisfaction.",
      features: [
        "Sales Dashboard",
        "Revenue Analytics",
        "Product Performance Reports",
        "Customer Analytics",
        "Inventory Reports",
        "Order Insights",
        "Business KPI Reports"
      ]
    }
  ];

  const chooseRowsList = [
    { left: "Product data scattered across systems", right: "Centralized product management" },
    { left: "Inventory mistakes", right: "Real-time inventory tracking" },
    { left: "Manual order processing", right: "Automated order workflows" },
    { left: "Poor sales visibility", right: "Live sales dashboards" },
    { left: "Supplier management issues", right: "Integrated procurement system" },
    { left: "Customer data scattered", right: "Centralized CRM" },
    { left: "Difficult scaling", right: "Flexible ERP infrastructure" }
  ];

  const worksStepsList = [
    {
      stepNum: 1,
      title: "Schedule a Free E-Commerce ERP Demo",
      desc: "See how Vellko ERP can unify your online store, sales channels and inventory in a live demonstration."
    },
    {
      stepNum: 2,
      title: "Understand Your Business Requirements",
      desc: "We analyze your e-commerce operations, store integrations and warehouse workflows to configure the system."
    },
    {
      stepNum: 3,
      title: "Configure Products, Inventory & Workflows",
      desc: "We set up product database imports, synchronize your store channels, and configure automated fulfillment processes."
    },
    {
      stepNum: 4,
      title: "Train Your Team & Start Managing Operations",
      desc: "Your e-commerce team is trained for smooth system adoption, allowing you to launch and run with complete visibility."
    }
  ];

  const supportStepsList = [
    "E-Commerce Workflow Setup",
    "Secure Data Migration",
    "Product & Inventory Configuration",
    "Marketplace Integration Support",
    "Team Training",
    "Continuous Technical Support",
    "Future Feature Enhancements"
  ];

  const faqItemsList = [
    {
      question: "Is Vellko E-Commerce ERP suitable for small businesses?",
      answer: "Yes. Vellko ERP is designed to support startups, SMEs, and large enterprises with scalable e-commerce solutions."
    },
    {
      question: "Can it manage multiple online stores?",
      answer: "Yes. Companies are able to manage several stores, channels for sales and marketplaces on one central platform.."
    },
    {
      question: "Does it support inventory management?",
      answer: "Yes. The system offers real-time inventory tracking and warehouse management, alerts for stock and reports."
    },
    {
      question: "Can it integrate with marketplaces?",
      answer: "Yes. Vellko ERP can integrate with marketplaces to allow synchronization of inventory, products as well as orders."
    },
    {
      question: "Can businesses manage customer data?",
      answer: "Yes. The integrated CRM can help businesses manage customer profiles as well as purchase history and engagement."
    },
    {
      question: "Can the ERP be customized?",
      answer: "Absolutely. Workflows, reports, integrations, and business processes can be customized according to your requirements."
    }
  ];

  return (
    <IndustryPage
      title="Manage Your E-Commerce Operations with"
      highlight="Complete Visibility"
      tagline="One E-Commerce Platform. Smarter Business Management."
      desc="Vellko ERP is a cloud-based E-commerce management system that integrates customers, orders, inventory sales, payments procuring, analytics, as well as other data onto one intelligent platform, assisting companies run their online operations with full control and effectiveness."
      beyondTitle="E-Commerce Management Shouldn't Be"
      beyondHighlight="Complicated"
      beyondSubCol1={
        <>
          <span className="red-highlight">The most successful businesses</span> struggle due to the fact that their e-commerce operations are scattered across various platforms, spreadsheets, markets, and payment gateways along with disconnected applications.
        </>
      }
      beyondSubCol2={
        <>
          <span className="red-highlight">Controlling inventory</span>, products, and orders, as well as suppliers, customers and sales by hand leads to delays, errors as well as missed chances.
        </>
      }
      beyondDesc="Vellko E-Commerce ERP centralizes your entire online business, streamlines everyday operations, and gives immediate insights that assist you in making faster and more informed decisions."
      beyondFeatures={beyondFeaturesList}
      compareTitle="Traditional E-Commerce vs"
      compareHighlight="Vellko E-Commerce ERP"
      compareHeaderLeft="Traditional E-Commerce"
      compareHeaderRight="Vellko E-Commerce ERP"
      compareRows={compareRowsList}
      allInOneTitle="Everything Your E-Commerce Team Needs in"
      allInOneHighlight="One Platform"
      allInOneTagline="Modern e-commerce is more than selling products online."
      allInOneDesc="Vellko E-Commerce ERP integrates product management, inventory, orders, customers, sales, procurement, and analytics into one intelligent system, helping businesses reduce manual work and improve operational efficiency."
      allInOneModules={allInOneModulesList}
      chooseTitle="Why Businesses Choose"
      chooseHighlight="Vellko E-Commerce ERP"
      chooseSub1="The manual management of e-commerce hinders growth of businesses."
      chooseSub2="Vellko E-Commerce ERP can help businesses improve efficiency, decrease mistakes, enhance customer service and give them complete visibility into their online presence."
      chooseHeaderLeft="E-Commerce Challenge"
      chooseHeaderRight="How Vellko ERP Solves It"
      chooseRows={chooseRowsList}
      worksTitle="How Vellko E-Commerce"
      worksHighlight="ERP Works"
      worksSteps={worksStepsList}
      supportTitle="Dedicated E-Commerce"
      supportHighlight="Implementation Support"
      supportSub1="The process of implementing an ERP system isn't only about technology. It is about enhancing the way your company runs."
      supportSub2="Our specialists assist you with setup and process migrations, modification and training as well as continuous assistance to ensure smooth transition"
      supportSteps={supportStepsList}
      faqTitle="Frequently Asked"
      faqHighlight="Questions"
      faqIntroQ="What is eCommerce ERP Software?"
      faqIntroA="eCommerce ERP Software is a centralized solution that helps businesses manage products, inventory, orders, customers, procurement, finance, shipping, and reporting from one integrated platform."
      faqItems={faqItemsList}
    />
  );
}

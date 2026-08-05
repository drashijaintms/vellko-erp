import IndustryPage from './IndustryPage';

export default function InventoryManagement() {
  const heroBadges = [
    { type: 'img', text: ['One Unified', 'Platform'] },
    { type: 'svg', text: ['Complete Inventory', 'Control'] }
  ];

  const beyondFeaturesList = [
    "Real-Time Stock Tracking",
    "Multi-Warehouse Management",
    "Purchase & Sales Integration",
    "Batch & Lot Tracking",
    "Barcode & QR Code Support",
    "Inventory Valuation",
    "Stock Transfers",
    "Live Inventory Analytics"
  ];

  const splitLeftListItems = [
    "Manual stock updates",
    "Multiple inventory records",
    "Frequent stock discrepancies",
    "Delayed purchasing decisions",
    "Difficult warehouse coordination",
    "Manual stock reconciliation",
    "Limited inventory reporting",
    "Hard to scale operations"
  ];

  const splitRightListItems = [
    "Live inventory tracking",
    "Centralized inventory database",
    "Real-time inventory accuracy",
    "Smart stock visibility",
    "Multi-location inventory management",
    "Automated inventory workflows",
    "Live dashboards & analytics",
    "Flexible cloud-based inventory system"
  ];

  const allInOneModulesList = [
    {
      circleName: "Real-Time\nStock",
      title: "Real-Time Stock Management",
      subtitle: "Always Know What's Available.",
      desc: "Monitor inventory levels in each warehouse and at any given time. Track incoming and outgoing inventory, and the current inventory levels without waiting for a manual update.",
      features: [
        "Live Stock Tracking",
        "Available Stock Monitoring",
        "Low Stock Alerts",
        "Stock Adjustments",
        "Inventory Dashboard",
        "Product Catalog",
        "Stock History"
      ]
    },
    {
      circleName: "Multi-Warehouse\nManagement",
      title: "Multi-Warehouse Management",
      subtitle: "Manage Every Warehouse from One Dashboard.",
      desc: "If you manage multiple retail outlets, warehouses, and distribution centres, Vellko Inventory gives you full visibility into the inventory at all locations.",
      features: [
        "Multi-Warehouse Support",
        "Warehouse Transfers",
        "Location-Based Inventory",
        "Warehouse Performance",
        "Bin & Rack Management",
        "Warehouse Reports",
        "Centralized Monitoring"
      ]
    },
    {
      circleName: "Purchase\n& Procurement",
      title: "Purchase & Procurement Integration",
      subtitle: "Purchase Smarter. Never Run Out of Stock.",
      desc: "Connect your inventory directly to procurement to streamline the purchase process based on stock availability as well as reorder levels and demand.",
      features: [
        "Purchase Requisitions",
        "Purchase Orders",
        "Vendor Management",
        "Goods Receipt Notes",
        "Automated Reordering",
        "Supplier Tracking",
        "Procurement Reports"
      ]
    },
    {
      circleName: "Batch &\nLot Tracking",
      title: "Batch & Lot Tracking",
      subtitle: "Maintain Complete Product Traceability.",
      desc: "Monitor inventory through lots, batches, and serial numbers to ensure quality control, product recalls, and compliance.",
      features: [
        "Batch Management",
        "Lot Tracking",
        "Serial Number Tracking",
        "Manufacturing Dates",
        "Expiry Tracking",
        "Product Traceability",
        "Quality Monitoring"
      ]
    },
    {
      circleName: "Barcode\n& QR Code",
      title: "Barcode & QR Code Management",
      subtitle: "Speed Up Inventory Operations.",
      desc: "Scan barcodes and generate QR codes to make it easier to receive transfers, picking, and stock verification. This will reduce mistakes made by hand.",
      features: [
        "Barcode Generation",
        "QR Code Support",
        "Mobile Scanning",
        "Product Identification",
        "Fast Stock Verification",
        "Inventory Audits",
        "Warehouse Mobility"
      ]
    },
    {
      circleName: "Valuation &\nCost Control",
      title: "Inventory Valuation & Cost Control",
      subtitle: "Understand the True Value of Your Inventory.",
      desc: "Monitor inventory costs with precision by using standard valuation techniques when monitoring inventory value, cost of carrying, and aging.",
      features: [
        "Inventory Valuation",
        "Stock Cost Reports",
        "Stock Aging Analysis",
        "Inventory Turnover",
        "Cost Tracking",
        "Financial Integration",
        "Profitability Insights"
      ]
    },
    {
      circleName: "Stock\nTransfers",
      title: "Stock Allocation & Transfers",
      subtitle: "Inter-Branch & Warehouse Stock Movement.",
      desc: "Simplify inter-store and warehouse stock transfers, optimize routing, and track shipments in real time to avoid stock discrepancies.",
      features: [
        "Inter-Warehouse Transfers",
        "Stock Requisitions",
        "Shipment Tracking",
        "Goods Dispatch Controls",
        "Barcode Verification",
        "Dispatch Reporting"
      ]
    },
    {
      circleName: "Analytics\n& Reports",
      title: "Inventory Analytics & Reporting",
      subtitle: "Make Better Inventory Decisions.",
      desc: "Transform information from inventory into actionable information that can aid in reducing carrying costs, improving your purchasing decisions, and increasing the availability of stock.",
      features: [
        "Inventory Dashboards",
        "Fast & Slow Moving Items",
        "Stock Aging Reports",
        "Reorder Analysis",
        "Warehouse Analytics",
        "Purchase Reports",
        "Inventory Performance KPIs"
      ]
    }
  ];

  const chooseRowsList = [
    { left: "Inventory spread across multiple systems", right: "Centralized inventory platform" },
    { left: "Frequent stock shortages", right: "Real-time stock visibility" },
    { left: "Overstocking and excess inventory", right: "Smart reorder management" },
    { left: "Manual stock updates", right: "Automated inventory tracking" },
    { left: "Warehouse coordination issues", right: "Multi-location inventory control" },
    { left: "Inventory discrepancies", right: "Accurate stock movement records" },
    { left: "Poor inventory reporting", right: "Live dashboards and analytics" },
    { left: "Business growth increasing complexity", right: "Scalable inventory management" }
  ];

  const worksStepsList = [
    {
      stepNum: 1,
      title: "Schedule a Free Demo",
      desc: "See how Vellko Inventory can track your stock, scan barcodes, and sync your warehouses in a live demonstration."
    },
    {
      stepNum: 2,
      title: "Understand Your Inventory & Warehouse Processes",
      desc: "We analyze your storage locations, picking routes, supplier terms, and barcode setups."
    },
    {
      stepNum: 3,
      title: "Configure Warehouses, Products & Inventory Workflows",
      desc: "We configure your warehouse layout, import product catalogs, and set up automated reorder alerts."
    },
    {
      stepNum: 4,
      title: "Import Inventory Data & Go Live",
      desc: "We import your active stock balances, print barcode labels, and train your team for live operations."
    }
  ];

  const supportStepsList = [
    "Guided inventory implementation",
    "Secure product & stock migration",
    "Warehouse configuration",
    "Barcode setup assistance",
    "User training & onboarding",
    "Ongoing technical support"
  ];

  const faqItemsList = [
    {
      question: "Can Vellko Inventory manage multiple warehouses?",
      answer: "Yes. You can manage and monitor inventory across multiple branches, warehouses, and storage sites through one dashboard."
    },
    {
      question: "Does it support barcode and QR code scanning?",
      answer: "Yes. The system can support barcode or QR code creation as well as scanning to speed up inventory processes."
    },
    {
      question: "Can inventory integrate with purchases and sales?",
      answer: "Absolutely. The inventory updates automatically when there are purchases, receipts of goods, as well as sales transactions, removing the need for manual updates to stock."
    },
    {
      question: "Can I receive alerts for low stock?",
      answer: "Yes. You can control your reorder levels as well as receive automated low-stock alerts to avoid shortages."
    },
    {
      question: "Is inventory valuation included?",
      answer: "Yes. Vellko Inventory offers inventory valuation and reports on the aging of stock along with analysis of inventory turnover, and many other financial insights."
    }
  ];

  return (
    <IndustryPage
      title="Manage Your Inventory with"
      highlight="Complete Visibility"
      tagline="One Platform. Complete Control."
      desc="Get complete transparency into your cloud-based warehouse management system and stock movements with a smart platform that minimizes inventory shortages, avoids overstocking and helps you make better buying choices."
      beyondTitle="Move Beyond Spreadsheets &"
      beyondHighlight="Manual Stock Tracking"
      beyondSubCol1={
        <>
          <span className="red-highlight">Businesses that are growing</span> frequently are unable to save time and money as inventory information is scattered between warehouses, spreadsheets, and other software.
        </>
      }
      beyondSubCol2={
        <>
          <span className="red-highlight">Vellko Inventory Management</span> streamlines your cloud-based inventory management. It automates stock movement and gives real-time information across all locations, so that teams know what's on hand and what requires attention.
        </>
      }
      beyondDesc="One Platform That Powers Your Entire Supply Chain."
      beyondFeatures={beyondFeaturesList}
      splitTitleLeft="Traditional Inventory"
      splitTitleRight="Vellko Inventory ERP"
      splitDescLeft="Manual stock updates and multiple scattered inventory records"
      splitDescRight="with live inventory tracking and a centralized inventory database."
      splitHeaderLeft="Traditional Inventory"
      splitHeaderRight="Vellko Inventory ERP"
      splitLeftList={splitLeftListItems}
      splitRightList={splitRightListItems}
      splitClass="industry-split-comparison-section"
      allInOneTitle="Everything You Need to Manage"
      allInOneHighlight="Inventory Efficiently"
      allInOneTagline="Inventory includes more than simply counting the number of items."
      allInOneDesc="Vellko Inventory Management connects procurement warehouses, inventory movements, and sales to a single, intelligent platform that gives your team members complete visibility and control over each item within your company."
      allInOneModules={allInOneModulesList}
      chooseTitle="Why Businesses Choose"
      chooseHighlight="Vellko Cloud-Based Inventory Management"
      chooseSub1="Manually managing inventory can result in unnecessary delays, costs, as well as operational inefficiency."
      chooseSub2="Vellko Inventory Management provides your team members complete transparency across operations in the inventory automates repetitive work, and increases the accuracy of inventory."
      chooseHeaderLeft="Business Challenge"
      chooseHeaderRight="How Vellko Inventory Solves It"
      chooseRows={chooseRowsList}
      worksTitle="How Vellko Inventory Management"
      worksHighlight="ERP Works"
      worksSteps={worksStepsList}
      supportTitle="Dedicated Inventory"
      supportHighlight="Implementation Support"
      supportSub1="Transferring inventory operations to the new system is a process that requires meticulous planning."
      supportSub2="Our implementation experts help you set up warehouses, import product data from products, create inventory workflows, and prepare your team to make the transition smooth."
      supportSteps={supportStepsList}
      faqTitle="Frequently Asked"
      faqHighlight="Questions"
      faqIntroQ=""
      faqIntroA=""
      faqItems={faqItemsList}
      ctaTitle="Take Control of Your Inventory with Complete Visibility"
      ctaDesc="Replace disconnected inventory tools with one intelligent platform that helps you track stock in real time, optimize warehouse operations, and make smarter inventory decisions."
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

import IndustryPage from './IndustryPage';

export default function ManufacturingErp() {
  const beyondFeaturesList = [
    "Production Planning & Scheduling",
    "Inventory Management",
    "Procurement Management",
    "Warehouse Management",
    "Quality Control",
    "Supply Chain Management",
    "Finance & Accounting",
    "Manufacturing Analytics & Reports"
  ];

  const splitLeftListItems = [
    "Production managed manually",
    "Inventory tracked in spreadsheets",
    "Procurement handled separately",
    "Delayed production updates",
    "Limited quality tracking",
    "Manual reporting",
    "Disconnected departments",
    "Reactive decision-making"
  ];

  const splitRightListItems = [
    "Automated production planning",
    "Real-time inventory visibility",
    "Integrated procurement workflows",
    "Live production monitoring",
    "End-to-end quality management",
    "Real-time dashboards and analytics",
    "Unified business operations",
    "Data-driven manufacturing management"
  ];

  const allInOneModulesList = [
    {
      circleName: "Production\nPlanning",
      title: "Production Planning & Management",
      subtitle: "Plan Better. Produce Faster.",
      desc: "Control production orders, work centers, production schedules, production schedules and bill of materials (BOM), and manufacturing workflows with centrally managed systems.",
      features: [
        "Production Planning",
        "Work Order Management",
        "Bill of Materials (BOM)",
        "Production Scheduling",
        "Capacity Planning",
        "Shop Floor Monitoring",
        "Manufacturing Workflow Automation"
      ]
    },
    {
      circleName: "Inventory\nManagement",
      title: "Inventory Management",
      subtitle: "Real-Time Inventory Control.",
      desc: "Monitor raw materials, work-in-progress (WIP), and finished goods, as well as stock movements in total transparency across warehouses.",
      features: [
        "Raw Material Tracking",
        "Finished Goods Management",
        "Inventory Valuation",
        "Stock Transfers",
        "Barcode Management",
        "Inventory Alerts",
        "Batch & Lot Tracking"
      ]
    },
    {
      circleName: "Procurement\nManagement",
      title: "Procurement Management",
      subtitle: "Simplify Purchasing Operations.",
      desc: "Automate procurement requests, procurement, management of suppliers purchases, vendor management, along with procurement workflows.",
      features: [
        "Purchase Requisitions",
        "Purchase Orders",
        "Vendor Management",
        "Supplier Performance Tracking",
        "Approval Workflows",
        "Procurement Reports",
        "Contract Management"
      ]
    },
    {
      circleName: "Warehouse\nManagement",
      title: "Warehouse Management",
      subtitle: "Optimize Warehouse Efficiency.",
      desc: "Control warehouse operations: inventory locations, inventory movements, stock movements, picking, packing, and dispatch in one place.",
      features: [
        "Warehouse Tracking",
        "Multi-Warehouse Management",
        "Stock Movement Control",
        "Barcode Scanning",
        "Goods Receipt Management",
        "Dispatch Management",
        "Warehouse Reports"
      ]
    },
    {
      circleName: "Quality\nControl",
      title: "Quality Control Management",
      subtitle: "Maintain Consistent Product Quality.",
      desc: "Inspections of quality, monitoring, and compliance standards. Tracking along with corrective steps throughout the manufacturing process.",
      features: [
        "Quality Inspections",
        "Quality Checklists",
        "Defect Tracking",
        "Compliance Monitoring",
        "Non-Conformance Management",
        "Corrective Actions",
        "Quality Reports"
      ]
    },
    {
      circleName: "Supply Chain\nManagement",
      title: "Supply Chain Management",
      subtitle: "Improve Supply Chain Visibility.",
      desc: "Control procurement, suppliers, as well as logistics, inventory flow, and demand forecasting with more control.",
      features: [
        "Supplier Management",
        "Demand Forecasting",
        "Supply Planning",
        "Logistics Coordination",
        "Vendor Performance Analysis",
        "Procurement Analytics",
        "Supply Chain Reporting"
      ]
    },
    {
      circleName: "Finance &\nAccounting",
      title: "Finance & Accounting",
      subtitle: "Keep Manufacturing Finances Under Control.",
      desc: "Integrate manufacturing processes with finance to ensure exact costing, budgeting, and financial reporting and accounting.",
      features: [
        "Cost Accounting",
        "Production Cost Tracking",
        "Accounts Payable",
        "Accounts Receivable",
        "Budget Management",
        "Financial Statements",
        "Tax Management"
      ]
    },
    {
      circleName: "Analytics\n& Reports",
      title: "Manufacturing Analytics & Reports",
      subtitle: "Make Better Business Decisions.",
      desc: "Transform manufacturing data into useful insights that increase efficiency, productivity, and profitability in addition to operational effectiveness.",
      features: [
        "Production Dashboards",
        "Inventory Analytics",
        "Procurement Reports",
        "Cost Analysis",
        "Quality Metrics",
        "Supply Chain Insights",
        "Executive Reporting"
      ]
    }
  ];

  const chooseRowsList = [
    { left: "Inventory inaccuracies", right: "Real-time inventory management" },
    { left: "Production delays", right: "Automated production planning" },
    { left: "Procurement inefficiencies", right: "Integrated procurement workflows" },
    { left: "Quality issues", right: "Quality management system" },
    { left: "Disconnected departments", right: "Unified ERP platform" },
    { left: "Lack of visibility", right: "Real-time dashboards" },
    { left: "Cost overruns", right: "Manufacturing cost tracking" },
    { left: "Supply chain disruptions", right: "End-to-end supply chain visibility" }
  ];

  const worksStepsList = [
    {
      stepNum: 1,
      title: "Schedule a Free ERP Demo",
      desc: "See how Vellko ERP can automate and connect your manufacturing shop floor in a live demonstration."
    },
    {
      stepNum: 2,
      title: "Analyze Your Manufacturing Processes",
      desc: "We analyze your production lines, assembly steps, quality checklists, and material flows."
    },
    {
      stepNum: 3,
      title: "Configure Workflows & Import Business Data",
      desc: "We import your bill of materials (BOM), set up work centers, and configure inventory control workflows."
    },
    {
      stepNum: 4,
      title: "Train Your Team & Go Live",
      desc: "Your production managers, procurement officers, and floor team undergo training for a smooth live transition."
    }
  ];

  const supportStepsList = [
    "Manufacturing Process Assessment",
    "Secure Data Migration",
    "Inventory & BOM Setup",
    "Production Workflow Configuration",
    "User Training",
    "Ongoing Technical Support",
    "Future ERP Enhancements"
  ];

  const faqItemsList = [
    {
      question: "Is Vellko Manufacturing ERP suitable for small and medium manufacturers?",
      answer: "Yes. The platform was built to be scalable from small manufacturing units to multi-location companies."
    },
    {
      question: "Can it manage multiple factories or production plants?",
      answer: "Yes. Vellko Manufacturing ERP can handle multi-factory operations, with centralized monitoring and control."
    },
    {
      question: "Does it support inventory and warehouse management?",
      answer: "Yes. The system offers real-time inventory tracking inventory management, inventory management, stock transfers, and inventory analytics."
    },
    {
      question: "Can production planning and procurement work together?",
      answer: "Absolutely. Production requirements are automatically connected to procurement workflows to ensure the availability of materials."
    },
    {
      question: "Does it support quality control processes?",
      answer: "Yes. The platform provides inspection management as well as quality checks and the tracking of defects, compliance monitoring and reporting."
    },
    {
      question: "Can finance and manufacturing work together?",
      answer: "Yes. Manufacturing operations can be integrated directly with budgeting, accounting, costing and financial reporting."
    }
  ];

  return (
    <IndustryPage
      title="Manage Your Manufacturing Operations with"
      highlight="Complete Visibility"
      tagline="One Manufacturing Platform. Smarter Production Management."
      desc="Vellko Manufacturing ERP software (or manufacturing) is a cloud-based manufacturing control system that connects production, inventory, procurement, and warehouse operations, quality control, finance, and supply chain management onto one platform. It assists manufacturers in streamlining their processes, cutting expenses, boosting productivity, and taking complete control of production processes."
      beyondTitle="Manufacturing Management Shouldn't Be"
      beyondHighlight="Complicated"
      beyondSubCol1={
        <>
          <span className="red-highlight">Manufacturers in the process of growing</span> often face challenges with inefficient systems as well as manual processes, inaccurate inventory, production delays, and insufficient real-time visibility.
        </>
      }
      beyondSubCol2={
        <>
          <span className="red-highlight">The production data</span> can be found scattered throughout spreadsheets, old software warehouse systems, and across multiple departments.
        </>
      }
      beyondDesc="Vellko Manufacturing ERP unifies the entire manufacturing process. It automates routine operations and provides all stakeholders with real-time, accurate business information."
      beyondFeatures={beyondFeaturesList}
      splitTitleLeft="Traditional Manufacturing"
      splitTitleRight="Vellko Manufacturing ERP"
      splitDescLeft="Eliminate manual data entries and disconnected"
      splitDescRight="production departments with a single cloud-based platform."
      splitHeaderLeft="Traditional Manufacturing"
      splitHeaderRight="Vellko Manufacturing ERP"
      splitLeftList={splitLeftListItems}
      splitRightList={splitRightListItems}
      splitClass="industry-split-comparison-section"
      allInOneTitle="Everything Your Manufacturing Team Needs in"
      allInOneHighlight="One Platform"
      allInOneTagline="The modern manufacturing process requires much more than just production management."
      allInOneDesc="Vellko Manufacturing ERP integrates manufacturing and procurement, inventory, logistics in warehouses, assurance, financial reporting, and finance into one platform that assists businesses in reducing operational complexity and increasing efficiency."
      allInOneModules={allInOneModulesList}
      chooseTitle="Why Manufacturers Choose"
      chooseHighlight="Vellko Manufacturing ERP"
      chooseSub1="Manual processes for manufacturing slow down the growth rate and can increase operating costs."
      chooseSub2="Vellko Manufacturing ERP allows businesses to automate their production workflows, improve efficiency of inventory, decrease the amount of waste, and boost operational efficiency in operations while providing full control across the company."
      chooseHeaderLeft="Manufacturing Challenge"
      chooseHeaderRight="How Vellko Manufacturing ERP Solves It"
      chooseRows={chooseRowsList}
      worksTitle="How Vellko Manufacturing"
      worksHighlight="ERP Works"
      worksSteps={worksStepsList}
      supportTitle="Dedicated ERP"
      supportHighlight="Implementation Support"
      supportSub1="The process of implementing an erp system for manufacturing is not just about software installation. It's about changing the way you operate."
      supportSub2="Our experts in implementation assist in the setup of systems and configuration, mapping of processes, inventory transfer, and workflow configuration for production. We also provide employee training and continuous assistance to ensure a smooth transition."
      supportSteps={supportStepsList}
      faqTitle="Frequently Asked"
      faqHighlight="Questions"
      faqIntroQ=""
      faqIntroA=""
      faqItems={faqItemsList}
      ctaTitle="Build a Smarter Manufacturing Business with Vellko Manufacturing ERP"
      ctaDesc="Replace outdated systems and manual processes by utilizing one platform that lets you control production and inventory, procurement, finance, quality, and supply chain operations all from one platform."
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

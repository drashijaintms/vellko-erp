import IndustryPage from './IndustryPage';

export default function ServiceBusinessErp() {
  const heroBadges = [
    { type: 'img', text: ['One Platform', 'Smarter Service'] },
    { type: 'svg', text: ['Complete Service', 'Operations'] }
  ];

  const beyondFeaturesList = [
    "Customer Relationship Management",
    "Service Request Management",
    "Work Order Management",
    "Technician Scheduling",
    "Field Service Management",
    "Inventory & Spare Parts Management",
    "Billing & Invoicing",
    "AMC & Contract Management",
    "Finance & Accounting",
    "Business Reports & Analytics"
  ];

  const splitLeftListItems = [
    "Customer information scattered across systems",
    "Manual service scheduling",
    "Paper-based work orders",
    "Difficult technician tracking",
    "Manual invoice generation",
    "Poor inventory visibility",
    "Limited business insights",
    "Missed service contracts",
    "Reactive service operations"
  ];

  const splitRightListItems = [
    "Centralized customer database",
    "Automated job scheduling",
    "Digital work order management",
    "Live technician tracking",
    "Automated billing & invoicing",
    "Real-time inventory management",
    "Live business dashboards",
    "Automated AMC reminders",
    "Proactive service management"
  ];

  const allInOneModulesList = [
    {
      circleName: "Customer\nCRM",
      title: "Customer Relationship Management (CRM)",
      subtitle: "Every Customer. One Complete Profile.",
      desc: "Keep complete customer records, including contact information and service history, quotations invoicing, complaints contracts, and history of communications through a central database.",
      features: [
        "Customer Database",
        "Contact Management",
        "Service History",
        "Lead Management",
        "Quotation Management",
        "Customer Communication",
        "Customer Portal"
      ]
    },
    {
      circleName: "Service\nRequests",
      title: "Service Request Management",
      subtitle: "Never Miss a Service Request.",
      desc: "Make sure to capture service requests via email, phone calls websites, phone calls, or mobile apps and allocate them to the appropriate team.",
      features: [
        "Complaint Registration",
        "Ticket Management",
        "Service Categories",
        "Priority Management",
        "Customer Notifications",
        "SLA Tracking",
        "Request History"
      ]
    },
    {
      circleName: "Work Order\nControl",
      title: "Work Order Management",
      subtitle: "Organize Every Service Job Efficiently.",
      desc: "Design digitally-generated work order, assign technician to keep track of job progress, create service reports and close the job with customer approval.",
      features: [
        "Digital Work Orders",
        "Technician Assignment",
        "Job Status Tracking",
        "Customer Signatures",
        "Service Reports",
        "Image Uploads",
        "Work Order History"
      ]
    },
    {
      circleName: "Field &\nTechnicians",
      title: "Technician & Field Service Management",
      subtitle: "Manage Your Field Workforce Smarter.",
      desc: "Track technician schedules, attendance, job locations, travel, and service completion in real time.",
      features: [
        "Technician Scheduling",
        "Mobile App Access",
        "GPS Tracking",
        "Route Planning",
        "Attendance Tracking",
        "Job Completion Updates",
        "Performance Monitoring"
      ]
    },
    {
      circleName: "Inventory &\nSpares",
      title: "Inventory & Spare Parts Management",
      subtitle: "Keep Every Spare Part Under Control.",
      desc: "Keep track of the inventory of spare parts, movement of stock transfer to warehouses Purchase orders, material usage in service tasks.",
      features: [
        "Inventory Tracking",
        "Spare Parts Management",
        "Warehouse Management",
        "Purchase Orders",
        "Stock Alerts",
        "Barcode Support",
        "Vendor Management"
      ]
    },
    {
      circleName: "Billing &\nInvoicing",
      title: "Billing & Invoicing",
      subtitle: "Faster Billing. Faster Payments.",
      desc: "Automatically generate invoices, quotations as well as GST-compliant bills, payments receipts and outstanding reports from completed service tasks.",
      features: [
        "GST Invoicing",
        "Automated Billing",
        "Payment Tracking",
        "Outstanding Reports",
        "Credit Notes",
        "Online Payments",
        "Invoice History"
      ]
    },
    {
      circleName: "AMC &\nContracts",
      title: "AMC & Contract Management",
      subtitle: "Manage Service Contracts with Ease.",
      desc: "Monitor annual maintenance contracts (AMC) and warranty terms and preventive maintenance schedules. renewals and customer service agreements.",
      features: [
        "AMC Management",
        "Warranty Tracking",
        "Renewal Reminders",
        "Preventive Maintenance",
        "Contract History",
        "Service Scheduling",
        "Customer Notifications"
      ]
    },
    {
      circleName: "Finance &\nAccounting",
      title: "Finance & Accounting",
      subtitle: "Complete Financial Control.",
      desc: "Manage your business's expenses purchase, vendor payments taxes, income and financial reports with an integrated accounting system.",
      features: [
        "General Ledger",
        "Accounts Payable",
        "Accounts Receivable",
        "Expense Tracking",
        "GST Compliance",
        "Financial Reports",
        "Budget Management"
      ]
    },
    {
      circleName: "Reports &\nAnalytics",
      title: "Reports & Business Analytics",
      subtitle: "Make Better Business Decisions.",
      desc: "Change operational data to valuable business insights that increase efficiency as well as satisfaction of customers, technician performance and profit.",
      features: [
        "Service Dashboard",
        "Technician Performance",
        "Revenue Reports",
        "Customer Reports",
        "Inventory Reports",
        "AMC Reports",
        "Business KPIs"
      ]
    }
  ];

  const chooseRowsList = [
    { left: "Customer data scattered", right: "Centralized customer records" },
    { left: "Manual job scheduling", right: "Automated service scheduling" },
    { left: "Delayed service delivery", right: "Real-time technician assignment" },
    { left: "Inventory shortages", right: "Live inventory tracking" },
    { left: "Billing delays", right: "Automated invoicing" },
    { left: "Missed AMC renewals", right: "Automated reminders" },
    { left: "Limited business visibility", right: "Live operational dashboards" },
    { left: "Time-consuming administration", right: "Workflow automation" }
  ];

  const workflowStepsList = [
    {
      stepNum: 1,
      title: "Schedule a Free ERP Demo",
      desc: "Connect with our service ERP experts to see how Vellko streamlines your field teams, work orders, and billing."
    },
    {
      stepNum: 2,
      title: "Understand Your Business Processes",
      desc: "Analyze customer SLA expectations, technician dispatch workflows, spare parts tracking, and financial compliance."
    },
    {
      stepNum: 3,
      title: "Configure Workflows & Import Business Data",
      desc: "Set up service categories, AMC renewal rules, inventory warehouses, and import existing customer and contract data."
    },
    {
      stepNum: 4,
      title: "Train Your Team & Go Live",
      desc: "Train dispatch managers, field technicians, and accounting staff to launch full service management operations."
    }
  ];

  const supportIncludesList = [
    "Business Process Consultation",
    "Secure Data Migration",
    "Workflow Configuration",
    "Inventory Setup",
    "Finance & GST Configuration",
    "User Training",
    "Continuous Technical Support",
    "Future ERP Enhancements"
  ];

  const faqItemsList = [
    {
      question: "Is Vellko Service Business ERP suitable for small businesses?",
      answer: "Yes. It was designed specifically for small and medium-sized businesses, startups as well as large service companies and features that can be scaled to expand with your business."
    },
    {
      question: "Can we manage field technicians?",
      answer: "Yes. The ERP includes scheduling for technicians and mobile access. GPS monitoring, tracking attendance as well as job-status updates to ensure effective field management of service."
    },
    {
      question: "Does it support AMC and warranty management?",
      answer: "Yes. You can manage Annual Maintenance Contracts (AMC), warranty periods, preventive maintenance schedules, renewals, and customer service agreements from one platform."
    },
    {
      question: "Can inventory and billing work together?",
      answer: "Yes. Inventory spare parts procurement, billing and finance are completely integrated, which ensures precise stock updates as well as automated invoicing."
    },
    {
      question: "Can the ERP be customized for our service business?",
      answer: "Absolutely. Workflows, approval processes, service categories, forms, reports, and dashboards can be customized to match your business operations."
    }
  ];

  return (
    <IndustryPage
      title="Manage Your Entire Service Business with"
      highlight="Complete Visibility"
      tagline="One Platform. Smarter Service Operations."
      desc="Vellko Service Business ERP is cloud-based service management software that connects customer enquiries job scheduling, customer service inventory, billing and finance to a single, intelligent platform. It aids service companies in streamlining their routine operations, improving the customer experience, and boosting the profitability of their business."
      badges={heroBadges}
      
      beyondTitle="Service Management Shouldn't Be"
      beyondHighlight="Complicated"
      beyondSubCol1={
        <>
          <span className="red-highlight">Businesses that are expanding in service</span> frequently struggle with incompatible systems. Schedules for technicians, customer requests invoices, inventory, and payments are centralized across sheets, WhatsApp, emails, and various software applications.
        </>
      }
      beyondSubCol2={
        <>
          <span className="red-highlight">Vellko Service Business ERP</span> coordinates your complete Service workflow, automates routine procedures, and gives you full transparency into each service request, from initial request to payment.
        </>
      }
      beyondDesc="One Platform for Your Entire Service Business"
      beyondFeatures={beyondFeaturesList}
      
      splitTitleLeft="Traditional Service Management"
      splitTitleRight="Vellko Service Business ERP"
      splitDescLeft="Customer info scattered across systems & manual scheduling"
      splitDescRight="with a centralized customer database & live technician tracking."
      splitHeaderLeft="Traditional Service Management"
      splitHeaderRight="Vellko Service Business ERP"
      splitLeftList={splitLeftListItems}
      splitRightList={splitRightListItems}
      splitClass="industry-split-comparison-section"
      
      allInOneTitle="Everything Your Service Business Needs in"
      allInOneHighlight="One Platform"
      allInOneTagline="Modern service companies require more than simply scheduling technicians."
      allInOneDesc="Vellko Service Business ERP blends fields operations, customer service invoice, inventory, contracts accounting, reporting, and more into a single platform which allows teams to concentrate on providing exceptional service, not juggling the paperwork."
      allInOneModules={allInOneModulesList}
      
      chooseTitle="Why Businesses Choose"
      chooseHighlight="Vellko Service Business ERP"
      chooseSub1="Hand-managed service operations can slow the rate of growth of a business."
      chooseSub2="Vellko Service Business ERP streamlines the process of servicing, boosts technician efficiency, decreases operational expenses and improves customer satisfaction, while providing full insight into all aspects of your company."
      chooseHeaderLeft="Business Challenge"
      chooseHeaderRight="How Vellko ERP Solves It"
      chooseRows={chooseRowsList}
      
      worksTitle="How Vellko Service Business ERP"
      worksHighlight="Works"
      worksSteps={workflowStepsList}
      
      supportTitle="Dedicated ERP"
      supportHighlight="Implementation Support"
      supportSub1="Implementing ERP is not just about installing software."
      supportSub2="It's about changing your business operations. Our experts in implementation help with data migration as well as workflow configuration inventory setup, financial Integration, training for employees and provide ongoing assistance to ensure a smooth transition."
      supportSteps={supportIncludesList}
      
      faqTitle="Frequently Asked"
      faqHighlight="Questions"
      faqIntroQ=""
      faqIntroA=""
      faqItems={faqItemsList}
      
      ctaTitle="Deliver Exceptional Service with Vellko Service Business ERP"
      ctaDesc="Replace disconnected tools and manual processes with one intelligent platform that helps you manage customers, technicians, inventory, billing, and business operations—all from a single dashboard."
      
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

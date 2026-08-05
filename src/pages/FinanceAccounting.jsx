import IndustryPage from './IndustryPage';

export default function FinanceAccounting() {
  const heroBadges = [
    { type: 'img', text: ['One Unified', 'Platform'] },
    { type: 'svg', text: ['Complete Financial', 'Control'] }
  ];

  const beyondFeaturesList = [
    "General Ledger",
    "Accounts Payable",
    "Accounts Receivable",
    "Cash Flow Management",
    "GST & Tax Compliance",
    "Budget Planning",
    "Financial Reporting",
    "Multi-Company Accounting"
  ];

  const splitLeftListItems = [
    "Multiple accounting tools",
    "Manual bookkeeping",
    "Delayed financial reports",
    "Spreadsheet-based budgeting",
    "Manual tax calculations",
    "Limited cash flow visibility",
    "Time-consuming reconciliations",
    "Difficult to scale"
  ];

  const splitRightListItems = [
    "Unified financial platform",
    "Automated accounting workflows",
    "Real-time financial dashboards",
    "Intelligent budget management",
    "Automated GST & tax compliance",
    "Live cash flow monitoring",
    "Faster financial reconciliation",
    "Built for growing businesses"
  ];

  const allInOneModulesList = [
    {
      circleName: "General\nLedger",
      title: "General Ledger",
      subtitle: "Build Financial Accuracy from the Ground Up.",
      desc: "Create a central chart of accounts, and then automate the recording of the financial transactions of each department to ensure the accuracy of your financial statements.",
      features: [
        "General Ledger Setup",
        "Journal Entries & Ledgers",
        "Chart of Accounts",
        "Account Reconciliation",
        "Financial Period Closing Controls",
        "Multi-Branch Accounting Sync",
        "Auditable Trail Logs"
      ]
    },
    {
      circleName: "Accounts\nPayable",
      title: "Accounts Payable",
      subtitle: "Manage Every Payment with Confidence.",
      desc: "Monitor invoices of vendors as well as payment schedules and other outstanding liabilities, while reducing approval processes and increasing the accuracy of payments.",
      features: [
        "Vendor Invoice Management",
        "Payment Scheduling Control",
        "Three-Way Purchase Invoice Matching",
        "Approval Workflows Routing",
        "Outstanding Payables Dashboards",
        "Detailed Vendor Statements",
        "Vendor Payment Reports"
      ]
    },
    {
      circleName: "Accounts\nReceivable",
      title: "Accounts Receivable",
      subtitle: "Improve Cash Flow with Faster Collections.",
      desc: "Control customer invoices, payment management, and outstanding receivables all from the same platform and reduce delay in collecting.",
      features: [
        "Customer Invoicing & Billing",
        "Real-Time Payment Tracking",
        "Outstanding Receivables Aging",
        "Client Credit Management",
        "Automated Payment Reminders",
        "Accounts Collection Reports",
        "Customer Ledger Statements"
      ]
    },
    {
      circleName: "Cash Flow\nManagement",
      title: "Cash Flow Management",
      subtitle: "Know Where Your Money Is Going.",
      desc: "Track cash inflows and outflows in real time to increase liquidity and predict future cash needs to make smart financial choices.",
      features: [
        "Live Cash Flow Dashboards",
        "Predictive Cash Forecasting",
        "Bank Transactions Matching",
        "Real-Time Expense Monitoring",
        "Outgoing Payment Tracking",
        "Strategic Financial Planning",
        "Cash Position Reports"
      ]
    },
    {
      circleName: "GST & Tax\nCompliance",
      title: "GST & Tax Compliance",
      subtitle: "Stay Compliant Without the Complexity.",
      desc: "Automate GST calculation, taxes, tax reporting, and compliance procedures to cut down on manual work while also ensuring that the statutory reporting is accurate.",
      features: [
        "GST Compliant Billing",
        "Automated Tax Calculations",
        "GST Return Data Reports",
        "Government E-Invoicing Integration",
        "Compliance Deadline Tracking",
        "Detailed Tax Ledgers",
        "Audit Documentation Support"
      ]
    },
    {
      circleName: "Budgeting\n& Planning",
      title: "Budgeting & Financial Planning",
      subtitle: "Plan Better. Spend Smarter.",
      desc: "Set up budgets, keep track of the actual performance, and analyse the variances in financials to ensure that spending is in line with the business's goals.",
      features: [
        "Strategic Budget Creation",
        "Department-Wise Budgets",
        "Budget vs Actual Analysis",
        "Dynamic Forecast Planning",
        "Cost Center & Project Tracking",
        "Financial Trend Projections",
        "Variance Analysis Reports"
      ]
    },
    {
      circleName: "Multi-Company\nAccounting",
      title: "Multi-Company Accounting",
      subtitle: "Centralized Multi-Entity Controls.",
      desc: "Consolidate accounts, track inter-company transactions, and manage multiple branches or sister companies from a single login.",
      features: [
        "Multi-Entity Consolidation",
        "Inter-Company Transactions",
        "Segment Reporting",
        "Global Ledger Controls",
        "Group Financial Reports",
        "Centralized Tax Filing"
      ]
    },
    {
      circleName: "Financial\nAnalytics",
      title: "Financial Reports & Analytics",
      subtitle: "Turn Financial Data into Better Business Decisions.",
      desc: "Get real-time Financial reports and dashboards that aid executives in understanding profitability, assess the business's performance, and finding growth opportunities.",
      features: [
        "Profit & Loss (P&L) Statements",
        "Balance Sheet Generation",
        "Statement of Cash Flows Reports",
        "Trial Balance Sheets",
        "Revenue Growth Analytics",
        "Expense Analysis Insights",
        "Executive Financial Dashboard"
      ]
    }
  ];

  const chooseRowsList = [
    { left: "Financial data across multiple systems", right: "Centralized financial management" },
    { left: "Manual accounting processes", right: "Automated accounting workflows" },
    { left: "Delayed financial reporting", right: "Live financial dashboards" },
    { left: "Poor cash flow visibility", right: "Real-time cash flow insights" },
    { left: "GST compliance complexity", right: "Built-in tax automation" },
    { left: "Invoice processing delays", right: "Streamlined billing workflows" },
    { left: "Budget overruns", right: "Budget planning & variance tracking" },
    { left: "Growing financial complexity", right: "Scalable cloud-based accounting" }
  ];

  const worksStepsList = [
    {
      stepNum: 1,
      title: "Schedule a Free Demo",
      desc: "See how Vellko Accounting can centralize, track, and reconcile your finances in a live demonstration."
    },
    {
      stepNum: 2,
      title: "Review Your Financial Processes & Requirements",
      desc: "We analyze your chart of accounts, invoicing flows, tax compliance needs, and reporting structures."
    },
    {
      stepNum: 3,
      title: "Configure Accounting Structure & Import Data",
      desc: "We set up cost centers, import historical general ledger records, and establish bank feeds."
    },
    {
      stepNum: 4,
      title: "Train Your Finance Team & Go Live",
      desc: "Your accountants, cashiers, audit leads, and executives undergo system training to launch live operations."
    }
  ];

  const supportStepsList = [
    "Guided implementation of accounting",
    "Secure financial data migration",
    "GST and tax configuration",
    "Customized financial workflows",
    "Training and onboarding for users",
    "Technical support continues to be available"
  ];

  const faqItemsList = [
    {
      question: "Can Vellko manage multiple companies or branches?",
      answer: "Yes. You can manage your financial operations of multiple business branches, business units, and branches on a single platform."
    },
    {
      question: "Does the system support GST compliance?",
      answer: "Yes. Vellko includes GST calculation, tax billing as well as e-invoicing, compliance reporting and tax calculations to help you comply with statutory requirements."
    },
    {
      question: "Can I track cash flow in real time?",
      answer: "Absolutely. Live dashboards offer insight into cash outflows, cash inflows, along with overall financial wellness."
    },
    {
      question: "Does it integrate with purchasing and inventory?",
      answer: "Yes. Financial transactions are linked to inventory, purchases, sales, as well as other ERP modules. This eliminates the need for duplicate entries."
    },
    {
      question: "Can I generate financial reports instantly?",
      answer: "Yes. Profit & loss statements, balance sheets, and tax reports are updated automatically with every posted entry, allowing instant exports."
    }
  ];

  return (
    <IndustryPage
      title="Gain Complete"
      highlight="Financial Visibility"
      tagline="One Platform. Complete Financial Control."
      desc="Utilizing Vellko ERP, you can control the flow of cash, ERP and accounting, as well as tax compliance, on one platform having real-time financial insight to make smarter, faster, and more reliable business decisions."
      beyondTitle="Move Beyond Traditional"
      beyondHighlight="Accounting"
      beyondSubCol1={
        <>
          <span className="red-highlight">Controlling financial finances</span> with multiple systems can cause delays as well as duplicate work, which can lead to costly mistakes.
        </>
      }
      beyondSubCol2={
        <>
          <span className="red-highlight">As your business expands</span> and your financial records become more accurate, keeping track of them becomes more challenging.
        </>
      }
      beyondDesc="Vellko Accounting and Financial Management integrates all financial processes to one platform, providing your finance team real-time information on automated workflows and dependable financial reports."
      beyondFeatures={beyondFeaturesList}
      splitTitleLeft="Traditional Accounting"
      splitTitleRight="Vellko Financial Management"
      splitDescLeft="Multiple accounting tools and bookkeeping calculated manual"
      splitDescRight="with a unified financial platform and real-time financial dashboards."
      splitHeaderLeft="Traditional Accounting"
      splitHeaderRight="Vellko Financial Management"
      splitLeftList={splitLeftListItems}
      splitRightList={splitRightListItems}
      splitClass="industry-split-comparison-section"
      allInOneTitle="Everything Your Finance Team Needs in"
      allInOneHighlight="One Platform"
      allInOneTagline="Modern finance encompasses more than the recording of transactions."
      allInOneDesc="Vellko Accounting and Financial Management brings taxation, accounting, billing, as well as budgeting, payments, and reports into one unified system that allows finance teams to get more done while giving leaders full financial transparency."
      allInOneModules={allInOneModulesList}
      chooseTitle="Why Businesses Choose"
      chooseHighlight="Vellko Accounting & Financial Management"
      chooseSub1="Financial processes that are not connected make it challenging to manage costs, ensure compliance, and make sure that you are making business decisions."
      chooseSub2="Vellko Accounting & Financial Management integrates all financial functions on one system, increasing efficiency, reducing manual effort and giving your business full financial transparency."
      chooseHeaderLeft="Business Challenge"
      chooseHeaderRight="How Vellko Solves It"
      chooseRows={chooseRowsList}
      worksTitle="How Vellko Accounting & Financial"
      worksHighlight="Management Works"
      worksSteps={worksStepsList}
      supportTitle="Dedicated Financial"
      supportHighlight="Implementation Support"
      supportSub1="Moving to a new financial management system requires precision and planning."
      supportSub2="Our experts will help you configure the accounting system, move financial records, establish tax compliance, and make sure your finance department is in place from the beginning."
      supportSteps={supportStepsList}
      faqTitle="Frequently Asked"
      faqHighlight="Questions"
      faqIntroQ=""
      faqIntroA=""
      faqItems={faqItemsList}
      ctaTitle="Build Stronger Financial Operations with Complete Visibility"
      ctaDesc="Replace disconnected accounting systems with one intelligent platform that helps you automate finance, improve accuracy, and make every financial decision with confidence."
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

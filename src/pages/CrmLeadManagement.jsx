import IndustryPage from './IndustryPage';

export default function CrmLeadManagement() {
  const heroBadges = [
    { type: 'img', text: ['One CRM', 'Platform'] },
    { type: 'svg', text: ['Smarter Sales', 'Management'] }
  ];

  const beyondFeaturesList = [
    "Lead Management",
    "Contact & Customer Management",
    "Sales Pipeline Management",
    "Follow-Up & Task Management",
    "Lead Assignment & Distribution",
    "Communication Management",
    "Quotation & Deal Management",
    "Sales Analytics & Reports"
  ];

  const splitLeftListItems = [
    "Customer data stored across multiple systems",
    "Leads tracked manually",
    "Follow-ups managed through spreadsheets",
    "Limited sales pipeline visibility",
    "Leads assigned manually",
    "Missed follow-ups",
    "Difficult customer tracking",
    "Limited sales insights",
    "Manual sales reporting",
    "Reactive sales management"
  ];

  const splitRightListItems = [
    "Centralized customer database",
    "Automated lead tracking",
    "Automated follow-up management",
    "Real-time sales pipeline",
    "Structured lead assignment",
    "Follow-up reminders and task management",
    "Complete customer interaction history",
    "Live CRM dashboards",
    "Automated sales reports",
    "Data-driven sales management"
  ];

  const allInOneModulesList = [
    {
      circleName: "Lead\nManagement",
      title: "Lead Management",
      subtitle: "Capture Every Lead. Convert More Opportunities.",
      desc: "Leads from different sources can be managed all in one system. Monitor lead details such as source, status, the salesperson assigned, their history of communications Follow-ups, the progress of conversion.",
      features: [
        "Lead Capture",
        "Lead Source Tracking",
        "Lead Assignment",
        "Lead Status Management",
        "Lead Qualification",
        "Lead Scoring",
        "Lead Conversion",
        "Duplicate Lead Management",
        "Lead History",
        "Lead Reports"
      ]
    },
    {
      circleName: "Sales\nPipeline",
      title: "Sales Pipeline Management",
      subtitle: "Know Where Every Deal Stands.",
      desc: "Create and manage a structured sales pipeline that gives your team complete visibility into every opportunity—from initial contact to negotiation and final conversion.",
      features: [
        "Visual Sales Pipeline",
        "Deal Tracking",
        "Opportunity Management",
        "Sales Stages",
        "Deal Value Tracking",
        "Expected Closing Dates",
        "Win/Loss Tracking",
        "Pipeline Forecasting",
        "Sales Probability",
        "Opportunity Reports"
      ]
    },
    {
      circleName: "Contact &\nCustomer",
      title: "Contact & Customer Management",
      subtitle: "Every Customer. One Complete Profile.",
      desc: "Keep contact and customer information in a single database. Your sales team will have quick access to the customer's details, including communication history, prior interactions as well as deals and other events.",
      features: [
        "Customer Profiles",
        "Contact Management",
        "Customer History",
        "Company Accounts",
        "Communication History",
        "Customer Segmentation",
        "Notes & Activities",
        "Document Management",
        "Customer Status",
        "Relationship Tracking"
      ]
    },
    {
      circleName: "Follow-Up &\nTasks",
      title: "Follow-Up & Task Management",
      subtitle: "Never Miss a Sales Follow-Up.",
      desc: "Maintain your sales team's organization with central tracking and task management. Set up meetings, calls, email reminders, and other tasks to ensure that each opportunity gets attention promptly.",
      features: [
        "Follow-Up Scheduling",
        "Task Management",
        "Call Reminders",
        "Meeting Scheduling",
        "Activity Tracking",
        "Automated Reminders",
        "Sales Tasks",
        "Priority Management",
        "Follow-Up History",
        "Team Activity Tracking"
      ]
    },
    {
      circleName: "Lead\nAssignment",
      title: "Lead Assignment & Sales Team Management",
      subtitle: "Get the Right Lead to the Right Salesperson.",
      desc: "You can efficiently distribute leads throughout your sales team according to the business rules, departments and territories, product, or any other criteria for assignment.",
      features: [
        "Automatic Lead Assignment",
        "Manual Lead Assignment",
        "Salesperson Mapping",
        "Department-Based Assignment",
        "Territory Management",
        "Lead Ownership",
        "Assignment Rules",
        "Team Performance Tracking",
        "Sales Activity Monitoring"
      ]
    },
    {
      circleName: "Communication\nMgmt",
      title: "Communication Management",
      subtitle: "Keep Every Customer Interaction Connected.",
      desc: "Centralize sales and customer communications processes so that your staff can know the entire background of every interaction with each lead and client.",
      features: [
        "Call Tracking",
        "Email Communication",
        "Customer Notes",
        "Interaction History",
        "Activity Logs",
        "Follow-Up Reminders",
        "Meeting Records",
        "Communication Timeline"
      ]
    },
    {
      circleName: "Quotation &\nDeals",
      title: "Quotation & Deal Management",
      subtitle: "Move Opportunities from Lead to Deal Faster.",
      desc: "Manage proposals, quotes deals, and customer needs from a central CRM system. Give sales teams the tools needed to track prospects throughout the selling cycle.",
      features: [
        "Quotation Management",
        "Deal Management",
        "Product & Service Selection",
        "Pricing Management",
        "Discount Tracking",
        "Proposal Tracking",
        "Deal Approval",
        "Sales Order Integration",
        "Deal History"
      ]
    },
    {
      circleName: "CRM Analytics\n& Reports",
      title: "CRM Analytics & Reports",
      subtitle: "Turn Sales Data Into Better Decisions.",
      desc: "Transform sales and customer data into actionable information. Check lead generation and conversion rates and pipeline performance, sales results, and team efficiency with live dashboards and reports.",
      features: [
        "Sales Dashboard",
        "Lead Analytics",
        "Conversion Reports",
        "Pipeline Reports",
        "Salesperson Performance",
        "Lead Source Analysis",
        "Revenue Reports",
        "Win/Loss Analysis",
        "Follow-Up Reports",
        "CRM KPI Reports"
      ]
    }
  ];

  const chooseRowsList = [
    { left: "Lead data spread across systems", right: "Centralized lead database" },
    { left: "Manual lead tracking", right: "Automated lead management" },
    { left: "Missed follow-ups", right: "Follow-up reminders and task management" },
    { left: "Poor pipeline visibility", right: "Real-time sales pipeline" },
    { left: "Leads assigned manually", right: "Structured lead assignment" },
    { left: "Customer information is difficult to find", right: "Centralized customer profiles" },
    { left: "Limited sales visibility", right: "Live CRM dashboards" },
    { left: "Manual sales reports", right: "Automated reporting" },
    { left: "Slow sales processes", right: "Workflow automation" },
    { left: "Difficult performance tracking", right: "Sales team analytics" }
  ];

  const worksStepsList = [
    {
      stepNum: 1,
      title: "Schedule a Free CRM Demo",
      desc: "Learn the ways Vellko CRM can be a good fit for your lead management and sales needs."
    },
    {
      stepNum: 2,
      title: "Understand Your Sales Process",
      desc: "Our team reviews your current lead sources, sales pipeline, customer monitoring, follow-up processes, and reporting needs."
    },
    {
      stepNum: 3,
      title: "Configure Workflows & Import CRM Data",
      desc: "Create lead assignment rules, customer fields, workflows, and reports while safely importing your CRM information."
    },
    {
      stepNum: 4,
      title: "Train Your Sales Team & Go Live",
      desc: "Your sales team should be trained on the platform and start using your CRM, with ongoing support."
    }
  ];

  const supportStepsList = [
    "CRM Process Implementation",
    "Secure Lead & Customer Data Migration",
    "Sales Pipeline Configuration",
    "Lead Assignment Configuration",
    "Workflow Customization",
    "Hands-On Sales Team Training",
    "Ongoing Product Support",
    "Future-Ready CRM Enhancements"
  ];

  const faqItemsList = [
    {
      question: "Can Vellko CRM manage leads from multiple sources?",
      answer: "Yes. Vellko CRM allows you to centralize leads from multiple sources, which allows the sales staff to monitor leads' details, sources, ownership, status, follow-ups, conversion, and more on one platform."
    },
    {
      question: "Can we assign leads to different salespeople?",
      answer: "Yes. Leads may be assigned to sales reps or teams, based upon your sales structure and workflow specifications."
    },
    {
      question: "Can Vellko CRM track the complete sales pipeline?",
      answer: "Yes. Vellko CRM offers sales pipeline management. It assists teams in tracking opportunities throughout various stages, tracking the value of deals, and pinpointing opportunities that require a lot of attention."
    },
    {
      question: "Can sales teams manage customer follow-ups?",
      answer: "Yes. Sales reps can schedule appointments, monitor tasks, track activities, and receive reminders to keep opportunities from being missed."
    },
    {
      question: "Can Vellko CRM manage customer information?",
      answer: "Yes. Contact information and customer details can be stored in central profiles that allow users with access rights to view pertinent customer information such as interactions, activities, and the history of deals."
    },
    {
      question: "Does Vellko CRM provide sales reports?",
      answer: "Yes. Vellko CRM has dashboards and reports on leads and sales pipelines, the performance of salespersons, lead sources, sales, deals, and many other key sales KPIs."
    },
    {
      question: "Can the CRM be customized?",
      answer: "Absolutely. CRM workflows, fields, approval processes, sales stages, reports, and more can be customized to suit your company's requirements."
    },
    {
      question: "Is Vellko CRM suitable for small and large businesses?",
      answer: "Yes. Vellko CRM was specifically designed to assist growing businesses and SMEs, as well as larger companies, by offering the ability to scale lead, customer, and sales management capabilities."
    }
  ];

  return (
    <IndustryPage
      title="Manage Your Cloud Based CRM Software & Leads with"
      highlight="Complete Visibility"
      tagline="One CRM Platform. Smarter Sales Management."
      desc="Vellko ERP is a cloud based CRM Software and lead management software that integrates lead capture, pipelines for sales monitoring of customers, follow-ups as well as reporting in one platform. It helps sales teams handle each opportunity with total assurance and control."
      beyondTitle="CRM Management Shouldn't Be"
      beyondHighlight="Complicated"
      beyondSubCol1={
        <>
          <span className="red-highlight">Companies that are growing</span> shouldn't need to worry about losing sales due to the fact that customers' information is scattered throughout spreadsheets and emails, as well as messages, phone calls, and a variety of sales tools.
        </>
      }
      beyondSubCol2={
        <>
          <span className="red-highlight">Vellko ERP</span> consolidates your lead and customer data, automates routine sales tasks, and gives sales representatives live insight into each lead and opportunity, follow-up, and interaction with customers.
        </>
      }
      beyondDesc="One Platform for Your Entire Sales Process"
      beyondFeatures={beyondFeaturesList}
      splitTitleLeft="Traditional CRM"
      splitTitleRight="Vellko CRM"
      splitDescLeft="Customer data stored across multiple systems & manual tracking"
      splitDescRight="with centralized customer database & automated sales pipelines."
      splitHeaderLeft="Traditional CRM"
      splitHeaderRight="Vellko CRM"
      splitLeftList={splitLeftListItems}
      splitRightList={splitRightListItems}
      splitClass="industry-split-comparison-section"
      splitIllustrationAlt="Lead management and follow-up tracking in Vellko CRM"
      allInOneTitle="Everything Your Sales Team Needs in"
      allInOneHighlight="One Platform"
      allInOneTagline="Modern CRM goes beyond the storage of customer data."
      allInOneDesc="Vellko CRM combines the management of leads, customer pipelines for sales, follow-ups, quotes, communication, and analytics into a single, intelligent software, allowing sales teams to reduce the time they spend managing spreadsheets and spend more time converting leads into customers."
      allInOneModules={allInOneModulesList}
      allInOneAlt="Cloud Based CRM Software sales pipeline dashboard"
      chooseTitle="Why Businesses Choose"
      chooseHighlight="Vellko CRM"
      chooseSub1="Manual sales management can impede growth and cause opportunities to be lost."
      chooseSub2="Vellko CRM assists businesses in automating sales processes, consolidating customer data to improve follow-ups, and gives sales managers full visibility into their sales processes."
      chooseHeaderLeft="CRM Challenge"
      chooseHeaderRight="How Vellko CRM Solves It"
      chooseRows={chooseRowsList}
      worksTitle="How Vellko CRM"
      worksHighlight="Works"
      worksSteps={worksStepsList}
      worksAlt="Vellko CRM implementation and onboarding support"
      supportTitle="Dedicated CRM"
      supportHighlight="Implementation Support"
      supportSub1="The process of implementing a CRM isn't just about installing software. It's about helping your sales staff improve their methods to manage the leads as well as customers."
      supportSub2="Our CRM experts help with data migration and workflow setting, sales pipeline configuration and user training, as well as customization and ongoing support to make sure that the transition is smooth."
      supportSteps={supportStepsList}
      faqTitle="Frequently Asked"
      faqHighlight="Questions"
      faqIntroQ=""
      faqIntroA=""
      faqItems={faqItemsList}
      badges={heroBadges}
      heroClass="industry-hero-section"
      beyondClass="industry-beyond-section"
      compareClass="industry-need-erp-section"
      allInOneClass="industry-all-in-one-section"
      chooseClass="industry-need-erp-section"
      worksClass="industry-works-section"
      supportClass="industry-support-section"
      faqClass="industry-faq-section"
    />
  );
}

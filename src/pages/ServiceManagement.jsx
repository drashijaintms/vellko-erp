import IndustryPage from './IndustryPage';

export default function ServiceManagement() {
  const heroBadges = [
    { type: 'img', text: ['One Service', 'Platform'] },
    { type: 'svg', text: ['Smarter Service', 'Management'] }
  ];

  const beyondFeaturesList = [
    "Service Request Management",
    "Work Order Management",
    "Field Service Management",
    "Technician Scheduling",
    "Asset & Equipment Management",
    "Preventive Maintenance",
    "Customer Support Management",
    "Service Analytics & Reports"
  ];

  const splitLeftListItems = [
    "Service requests tracked manually",
    "Paper-based work orders",
    "Difficult technician scheduling",
    "Reactive maintenance approach",
    "Limited service visibility",
    "Delayed customer updates",
    "Disconnected service records",
    "Manual reporting"
  ];

  const splitRightListItems = [
    "Centralized service dashboard",
    "Digital work order management",
    "Automated technician assignment",
    "Preventive maintenance scheduling",
    "Real-time service tracking",
    "Automated customer notifications",
    "Complete service history",
    "Live service analytics"
  ];

  const allInOneModulesList = [
    {
      circleName: "Request\nManagement",
      title: "Service Request Management",
      subtitle: "Track Every Service Request Efficiently.",
      desc: "Track, assign, prioritize, and manage requests for service coming from various channels, while ensuring prompt resolution and satisfaction of the customer.",
      features: [
        "Service Ticket Creation",
        "Priority Management",
        "Request Categorization",
        "Service Status Tracking",
        "Escalation Management",
        "Customer Notifications",
        "Service History Records"
      ]
    },
    {
      circleName: "Work Order\nManagement",
      title: "Work Order Management",
      subtitle: "Organize Service Work Without Confusion.",
      desc: "Create, assign, and track work orders while keeping track of the progress of work, resources, and completion status in real time.",
      features: [
        "Digital Work Orders",
        "Task Assignment",
        "Work Progress Tracking",
        "Service Documentation",
        "Labor Tracking",
        "Material Consumption",
        "Completion Verification"
      ]
    },
    {
      circleName: "Field Service\nManagement",
      title: "Field Service Management",
      subtitle: "Manage Field Teams More Effectively.",
      desc: "Monitor field technicians' job progress and enhance the speed of response with real-time service access.",
      features: [
        "Technician Assignment",
        "Mobile Workforce Management",
        "GPS Tracking",
        "Job Status Updates",
        "Route Optimization",
        "Field Reporting",
        "Real-Time Communication"
      ]
    },
    {
      circleName: "Technician\nScheduling",
      title: "Technician Scheduling",
      subtitle: "Put the Right Technician on the Right Job.",
      desc: "Automate scheduling based on the technician's availability, skills, location, and workload.",
      features: [
        "Shift Scheduling",
        "Technician Availability",
        "Skill-Based Assignment",
        "Calendar Management",
        "Emergency Dispatching",
        "Resource Allocation",
        "Schedule Optimization"
      ]
    },
    {
      circleName: "Asset &\nEquipment",
      title: "Asset & Equipment Management",
      subtitle: "Maintain Complete Asset Visibility.",
      desc: "Monitor equipment, machinery warranties, maintenance records, and service history using an online platform.",
      features: [
        "Asset Registry",
        "Equipment Tracking",
        "Warranty Management",
        "Service History",
        "Asset Lifecycle Management",
        "Asset Documentation",
        "Maintenance Records"
      ]
    },
    {
      circleName: "Preventive\nMaintenance",
      title: "Preventive Maintenance Management",
      subtitle: "Reduce Downtime with Scheduled Maintenance.",
      desc: "Automatically plan maintenance tasks and inspections to avoid equipment failures and increase efficiency.",
      features: [
        "Maintenance Scheduling",
        "Inspection Checklists",
        "Recurring Service Plans",
        "Automated Reminders",
        "Maintenance Tracking",
        "Compliance Monitoring",
        "Downtime Analysis"
      ]
    },
    {
      circleName: "Customer\nSupport",
      title: "Customer Support Management",
      subtitle: "Deliver Better Customer Experiences.",
      desc: "Handle customer complaints, inquiries, support tickets, customer inquiries and service requests all from one platform.",
      features: [
        "Customer Support Tickets",
        "Complaint Management",
        "Service Escalation",
        "Customer Communication",
        "SLA Tracking",
        "Feedback Collection",
        "Customer History"
      ]
    },
    {
      circleName: "Service Analytics\n& Reports",
      title: "Service Analytics & Reporting",
      subtitle: "Make Better Service Decisions.",
      desc: "Get actionable insights on the efficiency of service, the productivity of technicians, customer satisfaction, and operational efficiency.",
      features: [
        "Service Dashboard",
        "Technician Performance Reports",
        "SLA Reports",
        "Maintenance Analytics",
        "Customer Satisfaction Metrics",
        "Service Cost Analysis",
        "Custom Reports"
      ]
    }
  ];

  const chooseRowsList = [
    { left: "Service requests scattered across systems", right: "Centralized service platform" },
    { left: "Manual work order management", right: "Automated work order workflows" },
    { left: "Scheduling conflicts", right: "Smart technician scheduling" },
    { left: "Poor service visibility", right: "Real-time tracking dashboards" },
    { left: "Equipment downtime", right: "Preventive maintenance planning" },
    { left: "Delayed customer updates", right: "Automated notifications" },
    { left: "Lack of service insights", right: "Advanced service analytics" },
    { left: "Inefficient field operations", right: "Mobile field service tools" }
  ];

  const worksStepsList = [
    {
      stepNum: 1,
      title: "Schedule a Free Demo",
      desc: "See how Vellko Service ERP can connect and coordinate your tickets and field team in a live demonstration."
    },
    {
      stepNum: 2,
      title: "Analyze Your Service Processes",
      desc: "We analyze your dispatch flows, technician availability, customer SLAs, and equipment records."
    },
    {
      stepNum: 3,
      title: "Configure Workflows & Import Data",
      desc: "We configure your dispatch dashboard, upload technician skill profiles, and import asset details."
    },
    {
      stepNum: 4,
      title: "Train Your Team & Go Live",
      desc: "Your dispatch managers, field technicians, and customer service staff undergo training to launch live."
    }
  ];

  const supportStepsList = [
    "Service Workflow Configuration",
    "Secure Data Migration",
    "Asset & Equipment Setup",
    "Technician Training",
    "Custom Process Configuration",
    "Ongoing Product Support",
    "Future Service Enhancements"
  ];

  const faqItemsList = [
    {
      question: "Is Vellko Service Management suitable for small businesses?",
      answer: "Yes. The platform was created to cater to startups, small businesses, and large corporations that run service operations."
    },
    {
      question: "Can it manage field service technicians?",
      answer: "Yes. It allows scheduling of technicians' tasks, assignment of tasks, mobile access, and real-time tracking of jobs."
    },
    {
      question: "Does it support preventive maintenance?",
      answer: "Yes. The system lets businesses program regular maintenance tasks as well as inspections."
    },
    {
      question: "Can customers track service requests?",
      answer: "Yes. Customers will receive periodic messages and updates on their service requests as well as the status of their jobs."
    },
    {
      question: "Can the platform be customized?",
      answer: "Absolutely. Workflows, approval procedures, reports, categories of service, and dashboards can be set up in accordance with your company's needs."
    }
  ];

  return (
    <IndustryPage
      title="Manage Your Service Operations with"
      highlight="Complete Visibility"
      tagline="One Platform. Smarter Service Management."
      desc="Vellko ERP is a cloud-based ERP Service Management System that helps businesses to manage service requests, field teams, work orders, maintenance schedules, customer support, and performance of service from the same central location. Enhance efficiency, speed up time, and offer an excellent customer experience."
      beyondTitle="Service Management Shouldn't Be"
      beyondHighlight="Complicated"
      beyondSubCol1={
        <>
          <span className="red-highlight">Businesses that provide services to customers</span> often face challenges because customer requests, service communications, schedules for technicians, along with work order requests, are scattered across spreadsheets, emails, telephone calls, and other disconnected software.
        </>
      }
      beyondSubCol2={
        <>
          <span className="red-highlight">Vellko Service Management</span> is a centralization tool for the service operation. It automates workflows and gives teams full control over each service request from the time of creation until its completion.
        </>
      }
      beyondDesc="One Platform for Your Entire Service Operations"
      beyondFeatures={beyondFeaturesList}
      splitTitleLeft="Traditional Service Operations"
      splitTitleRight="Vellko Service Management"
      splitDescLeft="Service requests tracked manually and paper-based work orders"
      splitDescRight="with a centralized service dashboard and digital work order management."
      splitHeaderLeft="Traditional Service Management"
      splitHeaderRight="Vellko Service Management"
      splitLeftList={splitLeftListItems}
      splitRightList={splitRightListItems}
      splitClass="industry-split-comparison-section"
      allInOneTitle="Everything Your Service Team Needs in"
      allInOneHighlight="One Platform"
      allInOneTagline="Modern ERP service companies require more than simple ticket management."
      allInOneDesc="Vellko Service Management integrates customer demands, orders for work, field operations, maintenance assets, customer communications, and reports into one intelligent platform that allows teams to deliver more efficient and efficient service."
      allInOneModules={allInOneModulesList}
      chooseTitle="Why Businesses Choose"
      chooseHighlight="Vellko Service Management"
      chooseSub1="Manual processes hinder productivity, increase response times, and negatively impact customer satisfaction."
      chooseSub2="Vellko Service Management aids companies automatize their service operations, increase the efficiency of technicians, and providing extraordinary customer experiences."
      chooseHeaderLeft="Service Challenge"
      chooseHeaderRight="How Vellko Service Management Solves It"
      chooseRows={chooseRowsList}
      worksTitle="How Vellko Service"
      worksHighlight="Management Works"
      worksSteps={worksStepsList}
      supportTitle="Dedicated"
      supportHighlight="Implementation Support"
      supportSub1="A successful implementation goes beyond the deployment of software."
      supportSub2="Our experts assist in the creation of service workflows, including data migration, the onboarding of technicians, configuration, and long-term support to ensure a seamless transition."
      supportSteps={supportStepsList}
      faqTitle="Frequently Asked"
      faqHighlight="Questions"
      faqIntroQ=""
      faqIntroA=""
      faqItems={faqItemsList}
      ctaTitle="Deliver Better Service with Vellko Service Management"
      ctaDesc="Replace the disconnected service processes with an intelligent platform that can help you handle service requests, improve field operations, increase customer satisfaction, and grow your business effectively."
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

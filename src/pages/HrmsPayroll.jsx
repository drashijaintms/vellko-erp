import IndustryPage from './IndustryPage';

export default function HrmsPayroll() {
  const heroBadges = [
    { type: 'img', text: ['One HR', 'Platform'] },
    { type: 'svg', text: ['Smarter Workforce', 'Management'] }
  ];

  const beyondFeaturesList = [
    "Employee Information Management",
    "Attendance & Shift Management",
    "Leave & Holiday Management",
    "Payroll Automation",
    "Performance Management",
    "Recruitment & Onboarding",
    "Employee Self-Service Portal",
    "HR Analytics & Reports"
  ];

  const splitLeftListItems = [
    "Employee data stored across multiple systems",
    "Manual attendance calculations",
    "Payroll prepared manually",
    "Paper-based leave approvals",
    "Limited workforce insights",
    "Time-consuming onboarding",
    "Difficult compliance management",
    "Reactive HR operations"
  ];

  const splitRightListItems = [
    "Centralized employee database",
    "Real-time attendance automation",
    "Automated payroll processing",
    "Digital leave workflows",
    "Live HR dashboards",
    "Streamlined onboarding process",
    "Built-in compliance tracking",
    "Data-driven workforce management"
  ];

  const allInOneModulesList = [
    {
      circleName: "Employee\nManagement",
      title: "Employee Information Management",
      subtitle: "Every Employee Record. One Secure Location.",
      desc: "Manage and store complete employee profiles, including personal details, work history, documents, contracts, qualifications, and the hierarchy of their jobs from a single database.",
      features: [
        "Digital Employee Records",
        "Document Management",
        "Organizational Structure",
        "Employee Directory",
        "Employment History",
        "Role & Department Mapping",
        "Custom Employee Fields"
      ]
    },
    {
      circleName: "Attendance\n& Shifts",
      title: "Attendance & Shift Management",
      subtitle: "Accurate Attendance Without Manual Work.",
      desc: "Monitor the attendance of employees in real time by using biometric devices, mobile check-ins, or a web login. Automatically calculate overtime, working hours, late arrivals, shift schedules.",
      features: [
        "Biometric Integration",
        "Shift Scheduling",
        "Overtime Calculation",
        "Attendance Dashboard",
        "Remote Attendance",
        "Holiday Calendar",
        "Time Tracking"
      ]
    },
    {
      circleName: "Payroll\nManagement",
      title: "HR Payroll Management system",
      subtitle: "Payroll That Runs Itself.",
      desc: "Cloud-based Payroll system that automates the calculation of salary and bonuses, deductions, reimbursements, as well as tax calculations and statutory compliance, all the while decreasing payroll errors and processing time.",
      features: [
        "Automated Payroll",
        "Salary Structures",
        "Tax & Compliance",
        "PF & ESIC Management",
        "Reimbursements",
        "Payslip Generation",
        "Bank Transfer Reports"
      ]
    },
    {
      circleName: "Leave\nManagement",
      title: "Leave Management",
      subtitle: "Make Leave Requests Simple.",
      desc: "Employees can request leave online and managers will accept requests immediately. Monitor leaves, policies and holiday calendars with no paperwork.",
      features: [
        "Online Leave Requests",
        "Approval Workflows",
        "Leave Policies",
        "Holiday Management",
        "Leave Balance Tracking",
        "Multi-Level Approvals",
        "Leave Reports"
      ]
    },
    {
      circleName: "Recruitment\n& Onboarding",
      title: "Recruitment & Onboarding",
      subtitle: "Hire Faster. Onboard Smarter.",
      desc: "You can manage the hiring process from job postings to tracker of candidates to letters to offer and onboarding tasks - all from one place.",
      features: [
        "Job Openings",
        "Candidate Tracking",
        "Interview Scheduling",
        "Offer Management",
        "Digital Onboarding",
        "Employee Documentation",
        "Joining Checklists"
      ]
    },
    {
      circleName: "Performance\nManagement",
      title: "Performance Management",
      subtitle: "Build High-Performing Teams.",
      desc: "Set goals, review performance as well as feedback and development of employees by using a well-organized process for managing performance.",
      features: [
        "Goal Setting",
        "KPI Tracking",
        "Performance Reviews",
        "Manager Feedback",
        "Employee Self-Evaluation",
        "Skill Development",
        "Promotion Planning"
      ]
    },
    {
      circleName: "Employee\nPortal (ESS)",
      title: "Employee Self-Service Portal",
      subtitle: "Give Employees More Control.",
      desc: "Employees can access their pay slips and leave balances, attendance documents, personal information and other documents at any time, without relying on HR.",
      features: [
        "View Payslips",
        "Attendance History",
        "Apply for Leave",
        "Update Personal Information",
        "Download Documents",
        "Expense Claims",
        "Company Announcements"
      ]
    },
    {
      circleName: "HR Analytics\n& Reports",
      title: "HR Analytics",
      subtitle: "Make Better Workforce Decisions.",
      desc: "Transform data from the workforce into valuable insights that can help leaders improve productivity, retention and organization planning.",
      features: [
        "Workforce Dashboard",
        "Attendance Analytics",
        "Payroll Reports",
        "Employee Turnover",
        "Department Performance",
        "Leave Trends",
        "HR KPI Reports"
      ]
    }
  ];

  const chooseRowsList = [
    { left: "Employee data spread across systems", right: "Centralized employee records" },
    { left: "Manual attendance tracking", right: "Automated attendance management" },
    { left: "Payroll errors", right: "Automated payroll processing" },
    { left: "Delayed leave approvals", right: "Digital approval workflows" },
    { left: "Poor workforce visibility", right: "Live HR dashboards" },
    { left: "Compliance complexity", right: "Built-in statutory compliance" },
    { left: "Low employee engagement", right: "Employee self-service portal" },
    { left: "Time-consuming HR tasks", right: "Workflow automation" }
  ];

  const worksStepsList = [
    {
      stepNum: 1,
      title: "Schedule a Free HRMS Demo",
      desc: "See how Vellko HRMS can automate and sync your attendance, payroll, and recruiting in a live demonstration."
    },
    {
      stepNum: 2,
      title: "Understand Your HR Processes",
      desc: "We analyze your hiring steps, attendance rules, shift schedules, tax slabs, and leave policies."
    },
    {
      stepNum: 3,
      title: "Configure Workflows & Import Employee Data",
      desc: "We import your employee directories, set up payroll parameters, and configure approval hierarchies."
    },
    {
      stepNum: 4,
      title: "Train Your HR Team & Go Live",
      desc: "Your HR managers, recruitment officers, payroll executors, and employees undergo training to go live."
    }
  ];

  const supportStepsList = [
    "Implementation of HR guidelines",
    "Data migration of employees is secure",
    "Payroll configuration Assistance with payroll configuration",
    "Training hands-on",
    "Continuous product support",
    "Future-ready HR enhancements"
  ];

  const faqItemsList = [
    {
      question: "Is Vellko HRMS suitable for small businesses?",
      answer: "Yes. It is designed to scale from startups and SMEs to large enterprises."
    },
    {
      question: "Can it integrate with biometric attendance machines?",
      answer: "Yes. Attendance data syncs automatically with hr payroll management system."
    },
    {
      question: "Does it support payroll compliance?",
      answer: "Yes. The platform supports statutory payroll calculations and compliance workflows."
    },
    {
      question: "Can employees access HR information themselves?",
      answer: "Yes. Employees have access to a secure self-service portal for leave, attendance, payslips and personal information."
    },
    {
      question: "Can the HRMS be customized?",
      answer: "Absolutely. Workflows, approval processes, policies and reports can be configured according to your requirements."
    }
  ];

  return (
    <IndustryPage
      title="Manage your ERP system in human resource management with"
      highlight="Complete Visibility"
      tagline="One HR Platform. Smarter Workforce Management."
      desc="Vellko ERP is a cloud based hr system that connects attendance, recruitment, pay, performance, and payroll on one smart platform, aiding HR managers in controlling their employees with total control and confidence."
      beyondTitle="HR Management Shouldn't Be"
      beyondHighlight="Complicated"
      beyondSubCol1={
        <>
          <span className="red-highlight">Companies that are growing</span> do not have to struggle due to their lack of HR procedures.
        </>
      }
      beyondSubCol2={
        <>
          <span className="red-highlight">They are unable to do so</span> because information about employees is scattered between spreadsheets, emails, biometric systems, and dispersed software.
        </>
      }
      beyondDesc="Vellko HRMS centralizes your workforce, streamlines routine HR tasks, and grants each stakeholder access to precise and up-to-date employee data."
      beyondFeatures={beyondFeaturesList}
      splitTitleLeft="Traditional HR"
      splitTitleRight="Vellko HRMS"
      splitDescLeft="Employee data stored across multiple systems and attendance calculated manual"
      splitDescRight="with centralized employee database profiles and automated payroll processing."
      splitHeaderLeft="Traditional HR"
      splitHeaderRight="Vellko HRMS"
      splitLeftList={splitLeftListItems}
      splitRightList={splitRightListItems}
      splitClass="industry-split-comparison-section"
      allInOneTitle="Everything Your HR Team Needs in"
      allInOneHighlight="One Platform"
      allInOneTagline="Modern HR is more than managing employees."
      allInOneDesc="Vellko HRMS integrates hiring as well as payroll, attendance, performance, compliance, and employee engagement into a single, smart system to help HR professionals to spend less time in administration and spend more time creating great workplaces."
      allInOneModules={allInOneModulesList}
      chooseTitle="Why Businesses Choose"
      chooseHighlight="Vellko HRMS"
      chooseSub1="The manual management of employees slows the growth."
      chooseSub2="Vellko HRMS assists businesses in automating HR processes, cutting administrative work, and increasing productivity. A better employee experience while giving leadership complete workforce visibility."
      chooseHeaderLeft="HR Challenge"
      chooseHeaderRight="How Vellko HRMS Solves It"
      chooseRows={chooseRowsList}
      worksTitle="How Vellko HRMS"
      worksHighlight="Works"
      worksSteps={worksStepsList}
      supportTitle="Dedicated HR"
      supportHighlight="Implementation Support"
      supportSub1="It's not only about implementing a system, it's also about assisting your employees to change their ways of working."
      supportSub2="Our HR experts assist in the implementation and transfer of employee data, payroll setup, workflow modification training, and continuous assistance to ensure a smooth transition."
      supportSteps={supportStepsList}
      faqTitle="Frequently Asked"
      faqHighlight="Questions"
      faqIntroQ=""
      faqIntroA=""
      faqItems={faqItemsList}
      ctaTitle="Build a More Connected Workforce with Vellko HRMS"
      ctaDesc="Replace manual HR processes with one intelligent platform that helps you manage people, automate operations and make better workforce decisions."
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

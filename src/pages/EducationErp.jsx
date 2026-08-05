import IndustryPage from './IndustryPage';

export default function EducationErp() {
  const beyondFeaturesList = [
    "Student Information Management",
    "Admissions Management",
    "Attendance Management",
    "Fee Management",
    "Examination & Results",
    "Timetable Management",
    "Faculty Management",
    "Parent & Student Portal",
    "Library Management",
    "Transportation Management",
    "Hostel Management",
    "Reports & Analytics"
  ];

  const splitLeftListItems = [
    "Student records in multiple systems",
    "Manual attendance tracking",
    "Paper-based admissions",
    "Manual fee collection",
    "Separate academic systems",
    "Delayed communication",
    "Limited reporting",
    "Complex administrative processes"
  ];

  const splitRightListItems = [
    "Centralized student database",
    "Real-time attendance management",
    "Digital admission workflows",
    "Automated fee management",
    "Integrated academic operations",
    "Instant notifications & updates",
    "Live dashboards & analytics",
    "Automated workflows"
  ];

  const allInOneModulesList = [
    {
      circleName: "Admissions\n& Student PIM",
      title: "Admissions & Student Information",
      subtitle: "Every Student Record. One Secure Location.",
      desc: "Manage online applications, registration workflows, and complete student profiles including academic records, documents, parent info, and class allocations from a centralized database.",
      features: [
        "Student Profiles & Academic Records",
        "Online Admission Forms & Submissions",
        "Application Status Tracking",
        "Digital Document Verification",
        "Class & Batch Allocation",
        "Parent & Guardian Contact Directory",
        "Custom Student Fields"
      ]
    },
    {
      circleName: "Attendance\nManagement",
      title: "Attendance Management",
      subtitle: "Accurate Attendance Made Easy.",
      desc: "Keep track of attendance for faculty and students in real time using Biometric sensors, mobile apps, RFID cards, and web-based solutions.",
      features: [
        "Student Attendance Tracking",
        "Faculty & Staff Attendance",
        "Biometric & RFID Integration",
        "Absence Notifications to Parents",
        "Daily Attendance Monitoring",
        "Attendance Trend Analytics",
        "Leave Application Approvals"
      ]
    },
    {
      circleName: "Fee & Finance\nManagement",
      title: "Fee & Finance Management",
      subtitle: "Automate Fee Collection and Tracking.",
      desc: "Control fee structures, collections and receipts, as well as discounts, dues, scholarships and payment reminders using an integrated system.",
      features: [
        "Flexible Fee Structures",
        "Online Payment Gateway Sync",
        "Due Tracking & Dunning",
        "Scholarships & Discounts Allocation",
        "Instant Digital Receipt Generation",
        "Expense & Cost Center Tracking",
        "Integrated Financial Reports"
      ]
    },
    {
      circleName: "Academics\n& Exams",
      title: "Examination & Results Management",
      subtitle: "Streamline Academic Assessments & Schedules.",
      desc: "Control exams, timetables, class schedules, grading systems, report cards publishing, and academic performance monitoring.",
      features: [
        "Exam Timetable Scheduling",
        "Classroom & Room Allocation",
        "Grade & Marksheet Management",
        "Result Publishing & Notifications",
        "Academic Progress Tracking",
        "Conflict Detection Alerts",
        "Subject-Wise Performance Reports"
      ]
    },
    {
      circleName: "Faculty\nManagement",
      title: "Faculty Management",
      subtitle: "Empower Your Teaching Staff.",
      desc: "Control the faculty's records such as attendance, workload, department assignments, performance evaluations, leave management, and payroll integrations.",
      features: [
        "Faculty Profiles & Directories",
        "Attendance & Leave Tracking",
        "Workload & Subject Allocation",
        "Performance Evaluation Checklists",
        "Department Assignment Maps",
        "Faculty Load Analytics"
      ]
    },
    {
      circleName: "Parent & Student\nPortal",
      title: "Parent & Student Portal",
      subtitle: "Improve Communication and Engagement.",
      desc: "Students and parents can have security-grade access to attendance, results and announcements. Also, you can access fees and assignments as well as educational updates.",
      features: [
        "Real-Time Attendance Status",
        "Marksheet & Exam Result Access",
        "Fee Status & Online Payments",
        "Academic Progress Dashboards",
        "Assignments & Homework Submission",
        "Instant School Announcements",
        "Direct Parent-Teacher Communication"
      ]
    },
    {
      circleName: "Campus\nLogistics",
      title: "Library, Transport & Hostel Management",
      subtitle: "Simplify Facilities and Campus Logistics.",
      desc: "Manage book cataloging, route optimization, vehicle allocations, and room occupancy operations on a unified dashboard.",
      features: [
        "Library Book Cataloging & Circulation",
        "Library Fine & Membership Control",
        "Transport Route & Driver Logs",
        "Student Vehicle Allocations",
        "Hostel Room Allocation & Occupancy",
        "Visitor & Entry Management Logs",
        "Facilities Utility Reports"
      ]
    },
    {
      circleName: "Education\nAnalytics",
      title: "Education Analytics & Reports",
      subtitle: "Make Better Academic and Administrative Decisions.",
      desc: "Transform institutional data into actionable insights that improve student performance, operational efficiency, and strategic planning.",
      features: [
        "Academic Performance Analysis",
        "Attendance Analytics & Trends",
        "Fee Collection & Due Reports",
        "Admission Statistics & Funnels",
        "Faculty Resource Allocation Reports",
        "Institutional KPIs & Executive Dashboards"
      ]
    }
  ];

  const chooseRowsList = [
    { left: "Student data scattered across systems", right: "Centralized student records" },
    { left: "Manual attendance tracking", right: "Automated attendance management" },
    { left: "Fee collection inefficiencies", right: "Digital fee management" },
    { left: "Admission process delays", right: "Automated admissions workflow" },
    { left: "Limited academic visibility", right: "Real-time dashboards" },
    { left: "Communication gaps", right: "Parent & student portals" },
    { left: "Administrative complexity", right: "Workflow automation" },
    { left: "Reporting challenges", right: "Comprehensive analytics" }
  ];

  const worksStepsList = [
    {
      stepNum: 1,
      title: "Schedule a Free Education ERP Demo",
      desc: "See how Vellko ERP can automate and connect your admissions, classes, and fee tracking in a live demonstration."
    },
    {
      stepNum: 2,
      title: "Understand Your Academic & Administrative Processes",
      desc: "We analyze your class schedules, timetable patterns, fee structures, grading systems, and registration rules."
    },
    {
      stepNum: 3,
      title: "Configure Modules & Import Institutional Data",
      desc: "We import student and parent databases, configure timetable templates, and set up billing payment routes."
    },
    {
      stepNum: 4,
      title: "Train Staff & Go Live",
      desc: "Your administrative staff, teachers, registrars, and support personnel receive tailored training for a smooth launch."
    }
  ];

  const supportStepsList = [
    "Academic Process Implementation",
    "Secure Data Migration",
    "Fee & Examination Setup",
    "Staff Training",
    "Workflow Configuration",
    "Continuous Product Support",
    "Future-Ready Enhancements"
  ];

  const faqItemsList = [
    {
      question: "Is Vellko Education ERP suitable for schools and colleges?",
      answer: "Yes. It is designed to be used by universities, schools, colleges as well as coaching institutes and educational institutions of all sizes."
    },
    {
      question: "Can it manage online admissions?",
      answer: "Yes. The system is fully online and supports process for admission, tracking applications and the management of enrollment."
    },
    {
      question: "Does it support fee collection and online payments?",
      answer: "Yes. Institutions are able to manage fees, online payments such as receipts, dues, along with financial report."
    },
    {
      question: "Can parents and students access information online?",
      answer: "Yes. Secure portals allow parents as well as students to view information about attendance, results fee, assignments, and announcements."
    },
    {
      question: "Can the Education ERP be customized?",
      answer: "Absolutely. Workflows, approval procedures structure of academic reports and modules can be adapted to meet the requirements of your institution."
    }
  ];

  return (
    <IndustryPage
      title="Manage Your Educational Institution with"
      highlight="Complete Visibility"
      tagline="One Education Platform. Smarter Institution Management."
      desc="Vellko Education ERP, a cloud-based educational management system that integrates admissions academics, attendance, fees, exams and administration to one platform. It helps educational institutions to manage their operations efficiently and with confidence."
      beyondTitle="Education Management Shouldn't Be"
      beyondHighlight="Complicated"
      beyondSubCol1={
        <>
          <span className="red-highlight">The growing schools, colleges universities, coaching institutions</span> should not be struggling with inefficient systems and manual procedures.
        </>
      }
      beyondSubCol2={
        <>
          <span className="red-highlight">The problem</span> isn't managing students but rather managing data that is scattered between spreadsheets, paper records and multiple software systems and even departments.
        </>
      }
      beyondDesc="Vellko Education ERP combines administrative and academic processes It automates routine tasks and provides real-time information on the entire operation of your school."
      beyondFeatures={beyondFeaturesList}
      splitTitleLeft="Traditional Management"
      splitTitleRight="Vellko Education ERP"
      splitDescLeft="Student records scattered in multiple systems and tracking manual"
      splitDescRight="with centralized database profiles and integrated academic operations."
      splitHeaderLeft="Traditional Management"
      splitHeaderRight="Vellko Education ERP"
      splitLeftList={splitLeftListItems}
      splitRightList={splitRightListItems}
      splitClass="industry-split-comparison-section"
      allInOneTitle="Everything Your Institution Needs in"
      allInOneHighlight="One Platform"
      allInOneTagline="Modern educational institutions need more than just student record management."
      allInOneDesc="Vellko provides best erp for educational institutions combines admissions academics, attendance, exams, finances, communications and administration into a single, intelligent system that lets teachers focus on their education instead of tackling paperwork."
      allInOneModules={allInOneModulesList}
      chooseTitle="Why Educational Institutions Choose"
      chooseHighlight="Vellko Education ERP"
      chooseSub1="Manual administration slows educational growth."
      chooseSub2="Vellko Education ERP helps institutions automate operations, improve communication, increase transparency, and enhance academic outcomes."
      chooseHeaderLeft="Institution Challenge"
      chooseHeaderRight="How Vellko Education ERP Solves It"
      chooseRows={chooseRowsList}
      worksTitle="How Vellko Education"
      worksHighlight="ERP Works"
      worksSteps={worksStepsList}
      supportTitle="Dedicated Education"
      supportHighlight="ERP Implementation Support"
      supportSub1="Incorporating an ERP system is not just about software deployment. It's about revolutionizing institutional operations."
      supportSub2="Our experts help with the process of setting up and the migration of data, workflow modifications staff training, and regular assistance to ensure smooth transition."
      supportSteps={supportStepsList}
      faqTitle="Frequently Asked"
      faqHighlight="Questions"
      faqIntroQ=""
      faqIntroA=""
      faqItems={faqItemsList}
      ctaTitle="Build a Smarter Educational Institution with Vellko Education ERP"
      ctaDesc="Replace manual academic and administrative processes with one intelligent platform that helps you manage students, automate operations, improve learning outcomes, and make better institutional decisions."
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

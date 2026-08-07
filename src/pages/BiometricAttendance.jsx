import IndustryPage from './IndustryPage';

export default function BiometricAttendance() {
  const heroBadges = [
    { type: 'img', text: ['One Attendance', 'Platform'] },
    { type: 'svg', text: ['Complete Workforce', 'Tracking'] }
  ];

  const beyondFeaturesList = [
    "Biometric Attendance Tracking",
    "Face Recognition Attendance",
    "Shift & Roster Management",
    "Mobile Attendance",
    "Geo-Fencing Attendance",
    "Overtime Management",
    "Leave Integration",
    "Attendance Reports & Analytics"
  ];

  const splitLeftListItems = [
    "Manual attendance registers",
    "Risk of buddy punching",
    "Spreadsheet-based records",
    "Manual overtime calculation",
    "Delayed attendance reports",
    "Difficult shift management",
    "Attendance errors affect payroll",
    "Limited workforce visibility"
  ];

  const splitRightListItems = [
    "Automated attendance tracking",
    "Biometric verification",
    "Centralized attendance dashboard",
    "Automated overtime tracking",
    "Real-time reporting",
    "Smart shift scheduling",
    "Payroll-ready attendance data",
    "Live workforce insights"
  ];

  const allInOneModulesList = [
    {
      circleName: "Biometric\nTracking",
      title: "Biometric Attendance Tracking",
      subtitle: "Accurate Attendance with Biometric Verification",
      desc: "Keep track of employee attendance by using fingerprint scanners or face recognition devices RFID cards and biometric devices, while eliminating mistakes in attendance that are manually made.",
      features: [
        "Fingerprint Attendance",
        "Face Recognition Attendance",
        "RFID Card Integration",
        "Real-Time Attendance Logs",
        "Multi-Location Attendance",
        "Attendance Synchronization",
        "Device Management"
      ]
    },
    {
      circleName: "Shift &\nRosters",
      title: "Shift & Roster Management",
      subtitle: "Manage Complex Workforce Schedules Easily",
      desc: "Manage shifts and rotational schedules, including evening shifts and flexible work hours, and automatically calculate attendance against them.",
      features: [
        "Shift Scheduling",
        "Rotational Shift Management",
        "Night Shift Tracking",
        "Flexible Shift Rules",
        "Weekly Rosters",
        "Shift Assignments",
        "Attendance Policy Setup"
      ]
    },
    {
      circleName: "Mobile\nAttendance",
      title: "Mobile Attendance Management",
      subtitle: "Attendance Tracking for Remote Teams",
      desc: "Allow field employees, sales teams, and remote workers to mark attendance from mobile devices with location verification.",
      features: [
        "Mobile Check-In & Check-Out",
        "GPS Attendance Tracking",
        "Geo-Fencing",
        "Remote Workforce Monitoring",
        "Location Validation",
        "Field Staff Attendance",
        "Mobile Attendance Reports"
      ]
    },
    {
      circleName: "Overtime\nManagement",
      title: "Overtime Management",
      subtitle: "Calculate Overtime Automatically",
      desc: "Calculate overtime time automatically Based on time of attendance, shift times and company policy.",
      features: [
        "Overtime Calculation",
        "Extra Hours Tracking",
        "Overtime Approval Workflow",
        "Holiday Overtime",
        "Weekend Attendance Tracking",
        "Payroll Integration",
        "Overtime Reports"
      ]
    },
    {
      circleName: "Leave &\nAttendance",
      title: "Leave & Attendance Integration",
      subtitle: "Attendance and Leave in One Workflow",
      desc: "Consolidate attendance records with holiday applications, leave requests, and employee schedules to ensure worker accuracy.",
      features: [
        "Leave Integration",
        "Holiday Calendar",
        "Leave Balance Tracking",
        "Half-Day Attendance",
        "Attendance Exceptions",
        "Leave Approval Workflows",
        "Absence Management"
      ]
    },
    {
      circleName: "Payroll\nIntegration",
      title: "Payroll Attendance Integration",
      subtitle: "Attendance Data Ready for Payroll",
      desc: "Automatically transfer attendance records to payroll systems, reducing errors and eliminating manual calculations.",
      features: [
        "Payroll Integration",
        "Attendance-Based Salary Calculation",
        "Late Arrival Deductions",
        "Overtime Payroll Support",
        "Shift Allowance Management",
        "Attendance Summaries",
        "Payroll Reports"
      ]
    },
    {
      circleName: "Attendance\nAnalytics",
      title: "Attendance Analytics & Reports",
      subtitle: "Make Better Workforce Decisions",
      desc: "Transform the data on attendance into actionable information that can improve efficiency, workforce planning and operational performance.",
      features: [
        "Attendance Dashboard",
        "Employee Attendance Reports",
        "Shift Reports",
        "Overtime Reports",
        "Absenteeism Analysis",
        "Department Attendance Trends",
        "Workforce Analytics"
      ]
    },
    {
      circleName: "Device &\nWorkforce",
      title: "Biometric Device & Workforce Controls",
      subtitle: "Seamless Device Connectivity & Centralized Visibility",
      desc: "Connect multi-location biometric devices, face readers, and mobile check-ins into one centralized workforce control dashboard.",
      features: [
        "Device Management",
        "Multi-Location Sync",
        "Real-Time Monitoring",
        "Centralized Dashboard",
        "Employee Records",
        "Audit Logs",
        "Live Workforce Insights"
      ]
    }
  ];

  const chooseRowsList = [
    { left: "Manual attendance records", right: "Automated biometric tracking" },
    { left: "Buddy punching", right: "Biometric verification" },
    { left: "Attendance discrepancies", right: "Real-time attendance logs" },
    { left: "Overtime calculation errors", right: "Automated overtime management" },
    { left: "Shift scheduling complexity", right: "Smart roster management" },
    { left: "Payroll inaccuracies", right: "Payroll-ready attendance data" },
    { left: "Remote workforce tracking", right: "Mobile & GPS attendance" },
    { left: "Lack of workforce visibility", right: "Live attendance dashboards" }
  ];

  const worksStepsList = [
    {
      stepNum: 1,
      title: "Schedule a Free Demo",
      desc: "Connect with our workforce experts to explore how Vellko Biometric Attendance System fits your business."
    },
    {
      stepNum: 2,
      title: "Analyze Your Attendance Requirements",
      desc: "Define shift policies, overtime rules, leave structures, and device locations for seamless configuration."
    },
    {
      stepNum: 3,
      title: "Connect Devices & Configure Attendance Rules",
      desc: "Integrate biometric devices, face readers, mobile check-ins, and set up automated roster rules."
    },
    {
      stepNum: 4,
      title: "Train Your Team & Go Live",
      desc: "Educate administrators and employees, sync attendance data with payroll, and launch complete workforce tracking."
    }
  ];

  const supportStepsList = [
    "Biometric Device Integration",
    "Attendance Policy Configuration",
    "Employee Data Migration",
    "Shift & Roster Setup",
    "Payroll Synchronization",
    "User Training",
    "Ongoing Technical Support"
  ];

  const faqItemsList = [
    {
      question: "Is Vellko Biometric Attendance System suitable for small businesses?",
      answer: "Yes. The platform was designed to serve small and medium-sized businesses, as well as large corporations with features for managing attendance that are scalable."
    },
    {
      question: "Can it integrate with biometric attendance machines?",
      answer: "Yes. Vellko is compatible with fingerprint scanners as well as face recognition devices. RFID systems and various other hardware for biometric attendance."
    },
    {
      question: "Can employees mark attendance from mobile devices?",
      answer: "Yes. Employees are able to be able to check-in and out on mobile devices equipped with GPS and geo-fencing."
    },
    {
      question: "Does the system support multiple office locations?",
      answer: "Yes. You can track the attendance of multiple offices, branches warehouses, project sites from a single dashboard."
    },
    {
      question: "Can attendance data be integrated with payroll?",
      answer: "Absolutely. Attendance records sync automatically with payroll systems to ensure accurate payroll calculations and for conformance."
    },
    {
      question: "Does it support shift and overtime management?",
      answer: "Yes. The system can accommodate shift scheduling and overtime tracking night shifts, rotating shifts, and attendance automated."
    }
  ];

  return (
    <IndustryPage
      title="Track Attendance with Accuracy and"
      highlight="Complete Workforce Visibility"
      tagline="One Attendance Platform. Complete Workforce Tracking."
      desc="Vellko Biometric Attendance Management System helps businesses eliminate manually managed attendance tracking and streamline employee time management. Integrate biometric devices, facial recognition devices, smartphone attendance, and web-based check-ins to create a central platform to ensure accurate employee monitoring and payroll-ready attendance records."
      beyondTitle="Attendance Management Shouldn't Be"
      beyondHighlight="Complicated"
      beyondSubCol1={
        <>
          <span className="red-highlight">Businesses that are growing</span> often face challenges in the face of inaccurate records for attendance as well as, buddy punching, manually written timesheets, pay discrepancies and the scattered data of employees.
        </>
      }
      beyondSubCol2={
        <>
          <span className="red-highlight">Vellko Biometric Attendance Systems</span> centralizes tracking attendance is automated, which automates time calculations and gives real-time access to the hours of work shifts, overtime, and leave information.
        </>
      }
      beyondDesc="One Platform for Complete Attendance Control"
      beyondFeatures={beyondFeaturesList}
      splitTitleLeft="Traditional Attendance Tracking"
      splitTitleRight="Vellko Biometric Attendance System"
      splitDescLeft="Manual attendance registers & risk of buddy punching"
      splitDescRight="with biometric verification & real-time attendance logs."
      splitHeaderLeft="Traditional Attendance"
      splitHeaderRight="Vellko Biometric Attendance"
      splitLeftList={splitLeftListItems}
      splitRightList={splitRightListItems}
      splitClass="industry-split-comparison-section"
      allInOneTitle="Everything You Need for Attendance Management in"
      allInOneHighlight="One Platform"
      allInOneTagline="Modern workforce management involves more than simply recording employees' check-ins."
      allInOneDesc="Vellko Biometric Attendance System integrates the tracking of attendance as well as shift scheduling and the integration of leave, payroll sync and analysis of workforce data into one smart platform."
      allInOneModules={allInOneModulesList}
      chooseTitle="Why Businesses Choose"
      chooseHighlight="Vellko Biometric Attendance System"
      chooseSub1="Manual attendance management leads to payroll errors, productivity issues, and compliance issues."
      chooseSub2="The Vellko Biometric Attendance System assists businesses in automating attendance processes, boosting employee accountability, and providing full information about employee attendance patterns."
      chooseHeaderLeft="Attendance Challenge"
      chooseHeaderRight="How Vellko Solves It"
      chooseRows={chooseRowsList}
      worksTitle="How Vellko Biometric Attendance System"
      worksHighlight="Works"
      worksSteps={worksStepsList}
      supportTitle="Dedicated Attendance"
      supportHighlight="Implementation Support"
      supportSub1="Achieving successful attendance automation takes more than simply installing devices."
      supportSub2="Our experts in implementation assist companies integrate biometric devices, set up attendance policies, transferringtransfer workforce data, and educatingeducate administrators to make sure that the devices are used in a seamless manner."
      supportSteps={supportStepsList}
      faqTitle="Frequently Asked"
      faqHighlight="Questions"
      faqIntroQ=""
      faqIntroA=""
      faqItems={faqItemsList}
      ctaTitle="Transform Attendance Tracking with Vellko Biometric Attendance System"
      ctaDesc="Replace manual attendance registers and spreadsheets with one intelligent platform that automates attendance tracking, improves payroll accuracy, and gives complete workforce visibility."
      badges={heroBadges}
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

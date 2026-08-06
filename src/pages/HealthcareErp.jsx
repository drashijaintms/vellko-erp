import IndustryPage from './IndustryPage';

export default function HealthcareErp() {
  const heroBadges = [
    { type: 'img', text: ['One Healthcare', 'Platform'] },
    { type: 'svg', text: ['Better Patient', 'Care'] }
  ];

  const beyondFeaturesList = [
    "Patient Registration & EMR",
    "Appointment Management",
    "OPD & IPD Management",
    "Doctor & Staff Management",
    "Pharmacy Management",
    "Laboratory Management",
    "Billing & Insurance",
    "Inventory & Procurement",
    "Finance & Accounting",
    "HR & Payroll",
    "Reports & Analytics"
  ];

  const splitLeftListItems = [
    "Patient data across multiple systems",
    "Manual appointment scheduling",
    "Paper-based medical records",
    "Separate billing systems",
    "Manual pharmacy inventory",
    "Delayed laboratory reporting",
    "Difficult compliance management",
    "Limited reporting"
  ];

  const splitRightListItems = [
    "Centralized electronic medical records",
    "Online appointment management",
    "Digital patient history",
    "Integrated billing & insurance",
    "Real-time inventory tracking",
    "Automated lab workflows",
    "Built-in healthcare compliance",
    "Live operational dashboards"
  ];

  const allInOneModulesList = [
    {
      circleName: "Patient EMR\n& Records",
      title: "Patient Registration & Electronic Medical Records (EMR)",
      subtitle: "Every Patient Record. One Secure Location.",
      desc: "Maintain complete patient information, medical history, diagnoses, prescriptions, treatment plans, reports, insurance details, and visit history in a centralized database.",
      features: [
        "Digital Patient Records",
        "Electronic Medical Records (EMR)",
        "Patient History",
        "Prescription Management",
        "Medical Documents",
        "Insurance Information",
        "Patient Search"
      ]
    },
    {
      circleName: "Appointment\nManagement",
      title: "Appointment Management",
      subtitle: "Simplify Appointment Scheduling.",
      desc: "Manage online appointment bookings, doctor availability, queue management, SMS & email reminders, follow-up scheduling, and walk-in registrations seamlessly.",
      features: [
        "Online Appointment Booking",
        "Doctor Availability",
        "Queue Management",
        "SMS & Email Reminders",
        "Follow-up Scheduling",
        "Walk-in Registration",
        "Calendar Management"
      ]
    },
    {
      circleName: "OPD & IPD\nCare",
      title: "OPD & IPD Management",
      subtitle: "Manage Outpatient & Inpatient Care Efficiently.",
      desc: "Streamline OPD registration, IPD admissions, bed allocation, nursing notes, treatment plans, discharge summaries, and patient transfers.",
      features: [
        "OPD Registration",
        "IPD Admissions",
        "Bed Management",
        "Nursing Notes",
        "Treatment Plans",
        "Discharge Summary",
        "Patient Transfers"
      ]
    },
    {
      circleName: "Pharmacy\nManagement",
      title: "Pharmacy Management",
      subtitle: "Complete Pharmacy Control.",
      desc: "Manage inventory of medicines, purchase orders, prescriptions, stock levels, expiry dates, suppliers, and pharmacy billing.",
      features: [
        "Medicine Inventory",
        "Prescription Management",
        "Stock Alerts",
        "Batch & Expiry Tracking",
        "Purchase Management",
        "Pharmacy Billing",
        "Supplier Management"
      ]
    },
    {
      circleName: "Laboratory\nDiagnostics",
      title: "Laboratory Management",
      subtitle: "Faster Diagnostics. Better Patient Care.",
      desc: "Manage radiology, pathology tests for diagnostics, digital reports, and track samples using automated workflows.",
      features: [
        "Test Management",
        "Sample Collection",
        "Laboratory Workflow",
        "Digital Reports",
        "Report Sharing",
        "Diagnostic History",
        "Result Notifications"
      ]
    },
    {
      circleName: "Billing &\nInsurance",
      title: "Billing & Insurance Management",
      subtitle: "Faster Billing with Complete Financial Accuracy.",
      desc: "Create invoices, handle insurance claims, handle patient payments and monitor outstanding balances using one integrated billing system.",
      features: [
        "Patient Billing",
        "Insurance Claims",
        "Payment Tracking",
        "Invoice Generation",
        "Discount Management",
        "Refund Processing",
        "Financial Reports"
      ]
    },
    {
      circleName: "Inventory &\nProcurement",
      title: "Inventory & Procurement",
      subtitle: "Never Run Out of Critical Medical Supplies.",
      desc: "Monitor the movement of medical devices, equipment, consumables, medications, vendor requests, purchase orders, and stock movement in real-time.",
      features: [
        "Medical Inventory",
        "Purchase Orders",
        "Vendor Management",
        "Stock Transfers",
        "Asset Management",
        "Low Stock Alerts",
        "Procurement Reports"
      ]
    },
    {
      circleName: "Staff, Finance\n& Analytics",
      title: "Doctor, Staff, Finance & Analytics",
      subtitle: "Manage Workforce, Accounts & Operational Analytics.",
      desc: "Manage doctor schedules, staff shifts, general ledger, budgets, and real-time hospital dashboards for clinical performance and operational effectiveness.",
      features: [
        "Doctor Management & Staff Scheduling",
        "Shift Planning & Attendance",
        "General Ledger & Accounts",
        "Budget & Expense Tracking",
        "Hospital Live Dashboard",
        "Patient & Revenue Analytics",
        "Department & Doctor Performance"
      ]
    }
  ];

  const chooseRowsList = [
    { challenge: "Scattered patient records", solution: "Centralized EMR system" },
    { challenge: "Manual appointments", solution: "Automated appointment scheduling" },
    { challenge: "Billing delays", solution: "Integrated billing & insurance" },
    { challenge: "Pharmacy stock issues", solution: "Real-time inventory management" },
    { challenge: "Manual laboratory workflow", solution: "Digital laboratory management" },
    { challenge: "Poor departmental coordination", solution: "Unified healthcare platform" },
    { challenge: "Compliance challenges", solution: "Secure healthcare compliance" },
    { challenge: "Limited operational visibility", solution: "Live dashboards & analytics" }
  ];

  const worksStepsList = [
    {
      step: "01",
      title: "Schedule a Free Healthcare ERP Demo",
      desc: "Experience our cloud-based healthcare platform tailored for your hospital or clinic."
    },
    {
      step: "02",
      title: "Analyze Your Hospital Workflow",
      desc: "Our specialists study your OPD, IPD, lab, pharmacy, and billing operations."
    },
    {
      step: "03",
      title: "Configure Modules & Import Existing Data",
      desc: "We migrate patient records, medicine databases, and configure department permissions."
    },
    {
      step: "04",
      title: "Train Your Team & Go Live",
      desc: "Comprehensive staff training for doctors, nurses, pharmacists, and admins to ensure smooth onboarding."
    }
  ];

  const supportStepsList = [
    "Secure Patient Data Migration",
    "Hospital Workflow Configuration",
    "Pharmacy & Laboratory Setup",
    "Billing & Insurance Configuration",
    "Staff Training",
    "Continuous Technical Support",
    "Future-ready System Enhancements"
  ];

  const faqItemsList = [
    {
      question: "Can Vellko ERP manage multiple hospital branches?",
      answer: "Yes. The platform can be used to manage centrally of multiple branches or hospitals with separate patient documents, inventory, financials as well as reports specific to each one."
    },
    {
      question: "Can we integrate pharmacy inventory?",
      answer: "Yes. Vellko Healthcare ERP includes integrated pharmacy inventory management with stock tracking, expiry management, prescription processing, and purchase management."
    },
    {
      question: "Can different departments have different permissions?",
      answer: "Absolutely. The system offers access control based on role, which allows administrators to grant the right to access to nurses, doctors, receptionists, pharmacists, HR staff, accountants, and department directors."
    },
    {
      question: "Can we manage doctors' shifts?",
      answer: "Yes. The platform has doctor scheduling as well as shift management to manage appointments, rosters of duty attendance, and department-specific availability."
    },
    {
      question: "Does it support healthcare compliance?",
      answer: "Yes. Vellko Healthcare ERP allows you to keep secure patient records with audit trails, controlled access to users, as well as health data management practices that ensure compliance with regulatory requirements."
    },
    {
      question: "Can finance and procurement work together?",
      answer: "Yes. The modules for procurement and finance are fully integrated, which allows purchases, vendor management, procurement of inventory, invoice processing, payments tracking, and budget management all from the same platform."
    }
  ];

  return (
    <IndustryPage
      title="Manage Your Entire Healthcare Organization with"
      highlight="Complete Visibility."
      tagline="One Healthcare Platform. Better Patient Care."
      desc="Vellko Healthcare ERP a cloud-based hospital management software that integrates patient care, appointments as well as billing, pharmacy inventory, laboratory as well as HR and finance to a single platform. It assists hospitals, clinics, and health organizations in improving their efficiency, increasing the quality of care for patients, and taking informed decisions based on data."
      beyondTitle="Healthcare Management Shouldn't Be"
      beyondHighlight="Complicated"
      beyondSubCol1={
        <>
          The growing hospitals shouldn't be struggling with the disconnect of systems.
        </>
      }
      beyondSubCol2={
        <>
          Many hospitals manage patient records, billing appointments, lab reports as well as HR and inventory by using different software, which can lead to delays, duplicate data along with operational inefficiencies.
        </>
      }
      beyondDesc="Vellko Healthcare ERP consolidates each department onto a secure platform that allows healthcare professionals to provide more quickly, safer, and more efficient care to patients."
      beyondFeatures={beyondFeaturesList}
      splitTitleLeft="Traditional Hospital"
      splitTitleRight="Vellko Healthcare ERP"
      splitDescLeft="Patient data across multiple systems & paper-based records."
      splitDescRight="Centralized electronic medical records & digital workflows."
      splitHeaderLeft="Traditional Hospital"
      splitHeaderRight="Vellko Healthcare ERP"
      splitLeftList={splitLeftListItems}
      splitRightList={splitRightListItems}
      splitClass="industry-split-comparison-section"
      allInOneTitle="Everything Your Healthcare Organization Needs in"
      allInOneHighlight="One Platform"
      allInOneTagline="Modern healthcare is more than just patient care."
      allInOneDesc="Vellko Healthcare ERP combines clinical operations, patient records as well as finance, pharmacy labs, procurement, HR, compliance and reporting into one unified solution that allows healthcare professionals to concentrate on patient care and less on administration."
      allInOneModules={allInOneModulesList}
      chooseTitle="Why Healthcare Organizations Choose"
      chooseHighlight="Vellko Healthcare ERP"
      chooseSub1="A hospital with a lack of systems can increase costs, delay treatment of patients, and lowers efficiency in operations."
      chooseSub2="Vellko Healthcare ERP aids hospitals in automating administrative and clinical processes while enhancing the patient experience and overall performance."
      chooseHeaderLeft="Healthcare Challenge"
      chooseHeaderRight="How Vellko Healthcare ERP Solves It"
      chooseRows={chooseRowsList}
      worksTitle="How Vellko Healthcare ERP"
      worksHighlight="Works"
      worksSteps={worksStepsList}
      supportTitle="Dedicated Healthcare ERP"
      supportHighlight="Implementation Support"
      supportSub1="Implementing healthcare software requires careful planning."
      supportSub2="Our experts assist in the setup of hospital workflows as well as patient data migration. We also provide training for staff module configuration, compliance setup, and ongoing assistance to make sure that the transition is smooth."
      supportSteps={supportStepsList}
      faqTitle="Frequently Asked"
      faqHighlight="Questions"
      faqIntroQ="Is Vellko Healthcare ERP suitable for multi-specialty hospitals?"
      faqIntroA="Yes. It is designed for clinics, diagnostic centers, specialty hospitals, and multi-location healthcare organizations."
      faqItems={faqItemsList}
      ctaTitle="Improve Patient Care with Vellko Healthcare ERP"
      ctaDesc="Replace scattered systems with a secure, unified healthcare management platform. Schedule a free demo today."
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

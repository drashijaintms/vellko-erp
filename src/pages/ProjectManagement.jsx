import IndustryPage from './IndustryPage';

export default function ProjectManagement() {
  const heroBadges = [
    { type: 'img', text: ['One Project', 'Platform'] },
    { type: 'svg', text: ['Better Team', 'Collaboration'] }
  ];

  const beyondFeaturesList = [
    "Project Planning & Scheduling",
    "Task Management",
    "Team Collaboration",
    "Resource Management",
    "Time Tracking",
    "Budget Management",
    "Project Reporting",
    "Client & Stakeholder Management"
  ];

  const splitLeftListItems = [
    "Tasks managed across multiple tools",
    "Manual project updates",
    "Poor team communication",
    "Resource conflicts",
    "Budget tracking in spreadsheets",
    "Delayed project visibility",
    "Difficult deadline management",
    "Reactive decision-making"
  ];

  const splitRightListItems = [
    "Centralized project workspace",
    "Real-time project tracking",
    "Built-in collaboration tools",
    "Smart resource allocation",
    "Automated budget monitoring",
    "Live project dashboards",
    "Automated milestone tracking",
    "Data-driven project insights"
  ];

  const allInOneModulesList = [
    {
      circleName: "Project Planning\n& Scheduling",
      title: "Project Planning & Scheduling",
      subtitle: "Plan Projects with Confidence.",
      desc: "Create top project management tools, roadmaps, establish milestones, define deadlines, and arrange deliverables to ensure total transparency of the project.",
      features: [
        "Project Creation",
        "Project Templates",
        "Milestone Management",
        "Project Timelines",
        "Gantt Charts",
        "Dependency Management",
        "Project Calendars"
      ]
    },
    {
      circleName: "Task\nManagement",
      title: "Task Management",
      subtitle: "Keep Every Task Organized.",
      desc: "Assign tasks, establish priorities, monitor progress, and track workloads using a centralized dashboard.",
      features: [
        "Task Assignment",
        "Task Prioritization",
        "Due Date Tracking",
        "Subtasks Creation",
        "Task Status Updates",
        "Kanban Boards",
        "Task Notifications"
      ]
    },
    {
      circleName: "Team\nCollaboration",
      title: "Team Collaboration",
      subtitle: "Improve Team Communication.",
      desc: "Make sure that project discussions, file sharing, comments, and other updates are in one location to prevent communication gaps.",
      features: [
        "Team Discussions",
        "File Sharing Control",
        "Project Live Chat",
        "Activity Feeds",
        "Comment Threads",
        "Team Mentions",
        "Collaboration Workspace"
      ]
    },
    {
      circleName: "Resource\nManagement",
      title: "Resource Management",
      subtitle: "Optimize Team Resources.",
      desc: "Utilize resources efficiently and limit the number of team members who are overloaded while ensuring maximum efficiency.",
      features: [
        "Resource Allocation",
        "Workload Management",
        "Capacity Planning",
        "Team Scheduling",
        "Resource Utilization Reports",
        "Availability Tracking",
        "Department Resource Mapping"
      ]
    },
    {
      circleName: "Time\nTracking",
      title: "Time Tracking",
      subtitle: "Track Time Accurately.",
      desc: "Track productivity, project hours, and billable time by using automatic time monitoring tools.",
      features: [
        "Time Logs Tracking",
        "Timesheet Submissions",
        "Billable Hours Tracking",
        "Project Time Reports",
        "Productivity Monitoring",
        "Attendance Integration",
        "Automated Time Tracking"
      ]
    },
    {
      circleName: "Budget &\nCost",
      title: "Budget & Cost Management",
      subtitle: "Keep Projects Within Budget.",
      desc: "Track financial budgets, project costs, and billing milestones to ensure your business maintains optimal project profitability.",
      features: [
        "Budget Planning",
        "Cost Tracking",
        "Expense Management",
        "Project Profitability Analytics",
        "Invoice Tracking",
        "Budget Forecasting",
        "Financial Reports"
      ]
    },
    {
      circleName: "Client &\nStakeholders",
      title: "Client & Stakeholder Management",
      subtitle: "Improve Client Transparency.",
      desc: "Give stakeholders and clients information on progress, updates to projects, tasks, and collaboration tools.",
      features: [
        "Client Portals Access",
        "Project Status Updates",
        "Stakeholder Communication",
        "Approval Workflows",
        "Document Sharing",
        "Feedback Collection",
        "Project Reporting"
      ]
    },
    {
      circleName: "Project Analytics\n& Reports",
      title: "Project Reporting & Analytics",
      subtitle: "Make Better Project Decisions.",
      desc: "Transform the data from your project tracking software into actionable insights that can improve efficiency, performance, and delivery times.",
      features: [
        "Project Dashboards",
        "Resource Reports",
        "Budget Reports",
        "Time Tracking Analytics",
        "Project Performance Metrics",
        "Team Productivity Reports",
        "Custom Reports"
      ]
    }
  ];

  const chooseRowsList = [
    { left: "Disconnected project data", right: "Centralized project workspace" },
    { left: "Missed deadlines", right: "Automated milestone tracking" },
    { left: "Poor communication", right: "Integrated collaboration tools" },
    { left: "Resource conflicts", right: "Smart resource allocation" },
    { left: "Budget overruns", right: "Real-time cost monitoring" },
    { left: "Limited project visibility", right: "Live dashboards and reporting" },
    { left: "Manual project tracking", right: "Workflow automation" },
    { left: "Delayed decision-making", right: "Real-time project insights" }
  ];

  const worksStepsList = [
    {
      stepNum: 1,
      title: "Schedule a Free Demo",
      desc: "See how Vellko Project ERP can centralize your plans, task trackers, and team chats in a live demonstration."
    },
    {
      stepNum: 2,
      title: "Understand Your Project Workflows",
      desc: "We analyze your delivery schedules, project phases, client feedback loops, and billing parameters."
    },
    {
      stepNum: 3,
      title: "Configure Projects, Teams & Workflows",
      desc: "We set up workspace templates, configure Gantt timelines, assign user permissions, and establish time logs."
    },
    {
      stepNum: 4,
      title: "Train Your Team & Go Live",
      desc: "Your project managers, department leads, developers, and client liaisons undergo training to go live."
    }
  ];

  const supportStepsList = [
    "Project Workflow Setup",
    "Secure Data Migration",
    "Team Configuration",
    "Resource Planning Setup",
    "Hands-On Training",
    "Ongoing Product Support",
    "Future Project Management Enhancements"
  ];

  const faqItemsList = [
    {
      question: "Is Vellko Project Management Software suitable for small businesses?",
      answer: "Yes. Vellko Program Management Software has been specifically designed to help companies of all sizes, starting from small companies and startups to large companies. It assists teams in managing tasks, projects, timelines, collaboration, and resources in the same central location which makes it simpler to increase efficiency and stay well-organized as your business expands."
    },
    {
      question: "Can multiple teams work on the same project?",
      answer: "Yes. Teams from different departments can work together, share updates, and monitor progress in a single workspace."
    },
    {
      question: "Does it support resource allocation?",
      answer: "Yes. Managers can allocate staff, monitor workloads and maximize team capacity at any time."
    },
    {
      question: "Can clients view project progress?",
      answer: "Yes. Secure access to clients can be offered through dedicated portals for project management and dashboards for reporting."
    },
    {
      question: "Can the platform be customized?",
      answer: "Absolutely. Workflows, project phases, dashboards, permissions and reports can be set up in accordance to the needs of your business."
    }
  ];

  return (
    <IndustryPage
      title="Manage Project Management ERP with"
      highlight="Complete Visibility and Control"
      tagline="One Project Platform. Better Team Collaboration."
      desc="Vellko Project Management ERP is a cloud-based application that helps teams organize, track, work together, and complete projects with efficiency. From the management of tasks and resources to budgeting and reporting, everything is handled by one system centrally."
      beyondTitle="Project Management Shouldn't Be"
      beyondHighlight="Complicated"
      beyondSubCol1={
        <>
          <span className="red-highlight">Growing businesses struggle</span> with managing projects since information is scattered throughout spreadsheets and emails, chat tools, and a variety of software platforms.
        </>
      }
      beyondSubCol2={
        <>
          <span className="red-highlight">ERP for Project Management Software</span> combines the planning of project tasks, collaboration with teams, task tracking, as well as resource management and reporting into a single, intelligent platform that assists teams in remaining organized and ensuring that projects stay on track.
        </>
      }
      beyondDesc="One Platform for Every Project"
      beyondFeatures={beyondFeaturesList}
      splitTitleLeft="Traditional Project Management"
      splitTitleRight="Vellko Project Management"
      splitDescLeft="Tasks managed across multiple tools and project updates calculated manual"
      splitDescRight="with a centralized project workspace and real-time project tracking."
      splitHeaderLeft="Traditional Project Management"
      splitHeaderRight="Vellko Project Management"
      splitLeftList={splitLeftListItems}
      splitRightList={splitRightListItems}
      splitClass="industry-split-comparison-section"
      allInOneTitle="Everything Your Project Team Needs in"
      allInOneHighlight="One Platform"
      allInOneTagline="Modern project management demands more than task lists."
      allInOneDesc="Vellko Program Management Software integrates planning execution, collaboration, budgeting, and resource management, as well as monitoring of performance and reporting, into a single system, making it possible for teams to complete projects more quickly and effectively."
      allInOneModules={allInOneModulesList}
      chooseTitle="Why Businesses Choose"
      chooseHighlight="Vellko Project Management Software"
      chooseSub1="Manually managing projects slows down progress and can increase risks to projects."
      chooseSub2="ERP Project Management can help organisations automate workflows for their projects and improve collaboration among teams, decrease delays, and provide complete visibility into projects."
      chooseHeaderLeft="Project Challenge"
      chooseHeaderRight="How Vellko Solves It"
      chooseRows={chooseRowsList}
      worksTitle="How Vellko Project"
      worksHighlight="Management Works"
      worksSteps={worksStepsList}
      supportTitle="Dedicated Project"
      supportHighlight="Implementation Support"
      supportSub1="Implementing a system for managing projects is not just about the best task management software. It helps teams be more efficient."
      supportSub2="Our experts in implementation help with project setup as well as workflow configuration and data migration, as well as user training and ongoing assistance to ensure successful adoption."
      supportSteps={supportStepsList}
      faqTitle="Frequently Asked"
      faqHighlight="Questions"
      faqIntroQ=""
      faqIntroA=""
      faqItems={faqItemsList}
      ctaTitle="Deliver Projects Faster with Vellko Project Management Software"
      ctaDesc="Replace spreadsheets and disconnected tools with one intelligent platform that helps your teams plan better, collaborate efficiently, and deliver successful projects every time."
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

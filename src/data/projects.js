// DEMO CONCEPTS ONLY. These are illustrative placeholders, not delivered client work.
// Replace with real projects when they are supplied.
export const projectCategories = [
  { id: 'web', label: 'Web Applications' },
  { id: 'infrastructure', label: 'Server & Infrastructure' },
  { id: 'custom', label: 'Custom Software' },
  { id: 'support', label: 'Maintenance & Support' },
]

export const projects = [
  {
    slug: 'operations-dashboard', category: 'web', featured: true,
    title: 'Business Operations Dashboard',
    summary: 'A concept for a web dashboard that brings key operational data into one clear, role-based view.',
    overview: 'This demo concept shows how a business could replace scattered spreadsheets with a single web dashboard. It illustrates how we would approach data presentation, access by role, and an interface that stays clear as the amount of data grows.',
    highlights: ['Role-based views for different teams', 'Clear summary cards and trend charts', 'Admin area for managing users and settings', 'Responsive layout for desktop and tablet'],
    tags: ['ASP.NET Core', 'C#', 'SQL Server', 'JavaScript'],
  },
  {
    slug: 'customer-portal', category: 'web',
    title: 'Customer Self-Service Portal',
    summary: 'A concept for a secure portal where customers manage requests and view their account information.',
    overview: 'This demo concept explores a customer-facing web application: sign-in, request tracking, and account pages designed to be simple on any device. It illustrates our approach to usability, accessibility, and clean front-end code.',
    highlights: ['Account area with request history', 'Accessible forms and clear status messages', 'Mobile-friendly interface', 'API-ready structure for future integrations'],
    tags: ['ASP.NET Core', 'HTML5', 'CSS3', 'JavaScript'],
  },
  {
    slug: 'server-monitoring', category: 'infrastructure', featured: true,
    title: 'Server Monitoring Overview',
    summary: 'A concept for monitoring server health, so issues are visible before they affect users.',
    overview: 'This demo concept illustrates how infrastructure monitoring could be presented: server status, resource usage, and alerts in one place. It shows how we think about visibility, maintenance routines, and clear escalation paths.',
    highlights: ['Status overview of servers and services', 'Resource and performance indicators', 'Alert rules and maintenance notes', 'Documentation for the support team'],
    tags: ['Docker', 'Cloud Infrastructure'],
  },
  {
    slug: 'deployment-workflow', category: 'infrastructure',
    title: 'Managed Deployment Workflow',
    summary: 'A concept for repeatable, containerized deployments with a clear path from build to production.',
    overview: 'This demo concept outlines a deployment process that is consistent and easy to repeat. It illustrates how containers and a documented release routine can reduce surprises when new versions go live.',
    highlights: ['Containerized application builds', 'Consistent environments from test to production', 'Documented release and rollback steps', 'Deployment checklist for each release'],
    tags: ['Docker', 'Cloud Infrastructure', 'ASP.NET Core'],
  },
  {
    slug: 'workflow-automation', category: 'custom', featured: true,
    title: 'Workflow Automation Suite',
    summary: 'A concept for software that turns a manual, multi-step business process into a guided digital workflow.',
    overview: 'This demo concept shows how a repetitive internal process could become a structured application with defined steps, approvals, and records. It illustrates how we turn business rules into maintainable software.',
    highlights: ['Step-by-step task and approval flow', 'Central database of records', 'Notifications for pending work', 'Reporting on process status'],
    tags: ['C#', 'SQL Server', 'ASP.NET Core'],
  },
  {
    slug: 'support-workflow', category: 'support',
    title: 'Maintenance & Support Workflow',
    summary: 'A concept for tracking issues, updates, and improvements across a live application.',
    overview: 'This demo concept illustrates how ongoing maintenance can be organized: a clear way to report problems, prioritize fixes, and record improvements over time, so the software stays healthy long after launch.',
    highlights: ['Issue intake with priority levels', 'Change history for every fix and update', 'Performance improvement tracking', 'Regular maintenance routines'],
    tags: ['C#', 'SQL Server', 'JavaScript'],
  },
]

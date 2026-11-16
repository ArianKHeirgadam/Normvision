// All site copy lives here so pages stay presentational and the content
// can be reused (e.g. by a future localized or mobile build).
export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

export const services = [
  {
    id: 'web', icon: 'AppWindow', label: 'Web Applications', title: 'Web Application Development',
    short: 'Scalable, responsive, and intuitive web applications designed around your business requirements.',
    long: 'We design and develop modern, scalable, and intuitive web applications tailored to your business objectives.',
    items: ['Custom Web Applications', 'Enterprise Platforms', 'SaaS Development', 'Responsive Web Experiences', 'API Development & Integration', 'Dashboard & Admin Systems'],
    detail: 'From first wireframe to production release, we build interfaces and back-end services that are easy to use, easy to maintain, and ready to grow.',
    cta: 'Discuss Web Development',
  },
  {
    id: 'infrastructure', icon: 'Server', label: 'Server & Infrastructure', title: 'Server & Infrastructure',
    short: 'Reliable infrastructure management, server administration, monitoring, and maintenance.',
    long: 'We help businesses maintain reliable, secure, and efficient server environments through professional infrastructure management.',
    items: ['Server Setup & Configuration', 'Server Administration', 'Infrastructure Monitoring', 'Performance Optimization', 'Security & Maintenance', 'Deployment Management'],
    detail: 'We look after the environments your software runs on, so deployments are predictable and problems are caught early.',
    cta: 'Discuss Infrastructure',
  },
  {
    id: 'custom', icon: 'Code', label: 'Custom Software', title: 'Custom Software Development',
    short: 'Purpose-built software solutions that simplify complex workflows and business operations.',
    long: 'Purpose-built software designed to solve specific business challenges, automate processes, and improve operational efficiency.',
    items: ['Business Management Systems', 'Custom Enterprise Software', 'Workflow Automation', 'Database Solutions', 'Internal Business Applications', 'Software Integration'],
    detail: 'When off-the-shelf tools don’t fit, we build software around the way your team actually works, and integrate it with the systems you already use.',
    cta: 'Build Custom Software',
  },
  {
    id: 'support', icon: 'Wrench', label: 'Maintenance & Support', title: 'Maintenance & Technical Support',
    short: 'Continuous technical support, system optimization, and long-term software maintenance.',
    long: 'Reliable ongoing technical assistance to keep your applications, systems, and infrastructure running smoothly.',
    items: ['Application Maintenance', 'Technical Troubleshooting', 'Bug Fixing', 'Performance Improvements', 'System Updates', 'Ongoing Technical Support'],
    detail: 'Software needs care after launch. We stay available to fix, update, and improve the systems you depend on.',
    cta: 'Request Technical Support',
  },
]

export const homeSteps = [
  ['Discover', 'Understand business needs and project requirements.'],
  ['Design', 'Plan intuitive experiences and scalable architecture.'],
  ['Develop', 'Build reliable, maintainable, and efficient solutions.'],
  ['Maintain & Evolve', 'Provide continuous support and improvements.'],
]
export const serviceSteps = [
  ['Understand', 'We identify your goals, requirements, and technical challenges.'],
  ['Plan', 'We define the right architecture, technology, and implementation strategy.'],
  ['Build', 'We develop and test solutions with attention to quality and reliability.'],
  ['Support', 'We help maintain, improve, and evolve your systems over time.'],
]
export const tech = ['ASP.NET Core', 'C#', 'JavaScript', 'HTML5', 'CSS3', 'SQL Server', 'Docker', 'Cloud Infrastructure']
export const homeWhy = [
  ['Business-focused engineering', 'Every technical decision traces back to what your business needs.'],
  ['Scalable architecture', 'Systems planned to grow with your users and your ambitions.'],
  ['Quality-driven development', 'Careful reviews and testing built into how we work.'],
  ['Reliable technical support', 'Someone who knows your system when you need help.'],
  ['Maintainable software', 'Clean, documented code your team can rely on over time.'],
  ['Long-term collaboration', 'We stay involved after launch, not just until delivery.'],
]
export const serviceWhy = [
  ['Tailored Solutions', 'Built around your requirements, not a generic template.'],
  ['Scalable Architecture', 'Designed to grow as your business does.'],
  ['Quality-Driven Engineering', 'Attention to detail from first design to final release.'],
  ['Long-Term Technical Support', 'Help that continues after launch.'],
  ['Business-Oriented Development', 'Technology choices tied to real business outcomes.'],
]
export const values = [
  { icon: 'Sparkles', title: 'Innovation', text: 'Embracing modern technologies and continuously improving our approach.' },
  { icon: 'ShieldCheck', title: 'Reliability', text: 'Building dependable systems and maintaining high engineering standards.' },
  { icon: 'CircleCheck', title: 'Quality', text: 'Paying attention to detail throughout the development lifecycle.' },
  { icon: 'Users', title: 'Collaboration', text: 'Working closely with clients to understand their goals and requirements.' },
  { icon: 'TrendingUp', title: 'Continuous Improvement', text: 'Supporting long-term growth through maintenance, optimization, and evolution.' },
]
export const expertise = [
  'Web Application Engineering', 'Software Architecture', 'Server & Infrastructure Management',
  'Database Development', 'System Integration', 'Technical Maintenance',
]

const images = {
  'operations-dashboard': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85',
  'customer-portal': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85',
  'server-monitoring': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85',
  'deployment-workflow': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85',
  'workflow-automation': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85',
  'support-workflow': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85',
}
const categoryImages = {
  web: images['operations-dashboard'],
  infrastructure: images['server-monitoring'],
  custom: images['workflow-automation'],
  support: images['support-workflow'],
}
export default function ProjectVisual({ project, detail = false }) {
  const src = project.image || images[project.slug] || categoryImages[project.category] || images['operations-dashboard']
  return (
    <div className={detail ? 'project-visual project-visual-detail' : 'project-visual'}>
      <img src={src} alt={project.image_alt || project.title} loading={detail ? 'eager' : 'lazy'} />
      <span className="project-visual-shade" />
      <span className="project-visual-caption">nORMvis / {String(project.category || 'project').replace('-', ' ')}</span>
    </div>
  )
}

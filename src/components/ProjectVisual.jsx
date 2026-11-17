const images = {
  web: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85',
  infrastructure: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85',
  custom: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85',
  support: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85',
}
export default function ProjectVisual({ project, detail = false }) {
  const src = project.image || images[project.category] || images.web
  return (
    <div className={detail ? 'project-visual project-visual-detail' : 'project-visual'}>
      <img src={src} alt={project.image_alt || project.title} loading={detail ? 'eager' : 'lazy'} />
      <span className="project-visual-shade" />
      <span className="project-visual-caption">nORMvis / {String(project.category || 'project').replace('-', ' ')}</span>
    </div>
  )
}

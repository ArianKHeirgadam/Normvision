import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import ServiceArt from './ServiceArt.jsx'
import { projectCategories } from '../data/projects.js'
import { useLocale } from '../i18n.jsx'

export default function ProjectCard({ project, index = 0 }) {
  const { t } = useLocale()
  const cat = projectCategories.find((c) => c.id === project.category)
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <Link className="pcard" to={`/projects/${project.slug}`}>
        <ServiceArt id={project.category} />
        <div className="pbody">
          {project.is_demo !== false && <span className="badge">{t('Demo concept')}</span>}
          <span className="pcat">{t(cat?.label || '')}</span>
          <h3>{t(project.title)}</h3>
          <p>{t(project.summary)}</p>
          <ul className="tags">{project.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </Link>
    </Reveal>
  )
}

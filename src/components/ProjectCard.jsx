import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import ProjectVisual from './ProjectVisual.jsx'
import { projectCategories } from '../data/projects.js'
import { useLocale } from '../i18n.jsx'
export default function ProjectCard({ project, index = 0 }) {
  const { t } = useLocale()
  const cat = projectCategories.find((c) => c.id === project.category)
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <Link className="pcard" to={`/projects/${project.slug}`}>
        <ProjectVisual project={project} />
        <div className="pbody">
          <div className="pcard-meta">
            {project.is_demo !== false && <span className="badge">{t('Demo concept')}</span>}
            <span className="pcat">{t(cat?.label || '')}</span>
          </div>
          <h3>{t(project.title)}</h3>
          <p>{t(project.summary)}</p>
          <div className="pcard-bottom">
            <ul className="tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            <span className="pcard-open" aria-hidden="true">↗</span>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

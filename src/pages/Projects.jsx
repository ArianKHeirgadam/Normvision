import { useEffect, useState } from 'react'
import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import CtaBand from '../components/CtaBand.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { useLocale } from '../i18n.jsx'
import { projects as fallbackProjects, projectCategories } from '../data/projects.js'
import { getProjects, localizeProject } from '../lib/api.js'

export default function Projects() {
  const { t, isFa } = useLocale()
  usePageMeta('Projects | nORMvis', 'Demo project concepts showing the kinds of web applications, infrastructure and custom software nORMvis builds.')
  const [cat, setCat] = useState('all')
  const [projects, setProjects] = useState(fallbackProjects)
  useEffect(() => {
    const controller = new AbortController()
    getProjects({ category: cat, signal: controller.signal })
      .then((items) => setProjects(items.map((item) => localizeProject(item, isFa))))
      .catch(() => setProjects(cat === 'all' ? fallbackProjects : fallbackProjects.filter((p) => p.category === cat)))
    return () => controller.abort()
  }, [cat, isFa])
  const list = cat === 'all' ? projects : projects.filter((p) => p.category === cat)
  return (
    <>
      <Section className="page-head">
        <h1>{t('Projects.') }</h1>
        <p className="lead" style={{ marginTop: 'var(--s2)' }}>{t('A look at the kinds of solutions we design and build across web applications, infrastructure, custom software, and support.') }</p>
        <Reveal className="note" style={{ marginTop: 'var(--s3)' }}>
          {t('These are demo concepts that illustrate our approach. They are not delivered client projects. Real projects will appear here once they are supplied.')}
        </Reveal>
      </Section>
      <Section style={{ paddingTop: 0 }}>
        <div className="filters" role="group" aria-label="Filter projects by category">
          {[{ id: 'all', label: 'All' }, ...projectCategories].map((c) => (
            <button key={c.id} type="button" className="fbtn" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>{t(c.label)}</button>
          ))}
        </div>
        <div className="pgrid" aria-live="polite">
          {list.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
        </div>
      </Section>
      <CtaBand title={t('Have a Project in Mind?')} text={t("Tell us what you’re planning and we’ll explore how nORMvis can help.")} label={t('Start a Conversation')} />
    </>
  )
}

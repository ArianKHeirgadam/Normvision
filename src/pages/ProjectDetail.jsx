import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import ProjectVisual from '../components/ProjectVisual.jsx'
import CtaBand from '../components/CtaBand.jsx'
import NotFound from './NotFound.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { useLocale } from '../i18n.jsx'
import { projects as fallbackProjects, projectCategories } from '../data/projects.js'
import { getProject, localizeProject } from '../lib/api.js'

export default function ProjectDetail() {
  const { t, isFa } = useLocale()
  const { slug } = useParams()
  const [project, setProject] = useState(() => fallbackProjects.find((x) => x.slug === slug) || null)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const controller = new AbortController()
    setLoaded(false)
    getProject(slug, { signal: controller.signal })
      .then((item) => setProject(localizeProject(item, isFa)))
      .catch((error) => setProject(error.status === 404 ? null : (fallbackProjects.find((x) => x.slug === slug) || null)))
      .finally(() => setLoaded(true))
    return () => controller.abort()
  }, [slug, isFa])
  const p = project
  usePageMeta(p ? `${p.title} | nORMvis` : 'Project not found | nORMvis', p ? p.summary : 'The project you requested could not be found.')
  if (!p && !loaded) return <Section className="page-head"><p>Loading project…</p></Section>
  if (!p) return <NotFound />
  const cat = projectCategories.find((c) => c.id === p.category)
  return (
    <>
      <Section className="page-head">
        <Link className="back" to="/projects">{t('All projects') }</Link>
        {p.is_demo !== false && <p style={{ marginTop: 'var(--s3)' }}><span className="badge">{t('Demo concept') }</span></p>}
        <h1 style={{ marginTop: 'var(--s2)' }}>{t(p.title)}</h1>
        <p className="lead" style={{ marginTop: 'var(--s2)' }}>{t(p.summary)}</p>
      </Section>
      <Section style={{ paddingTop: 0 }} wrap="pd">
        <div>
          <Reveal><ProjectVisual project={p} detail /></Reveal>
          <Reveal className="copy" delay={0.1}>
            <h2 className="h2" style={{ fontSize: '1.75rem', margin: 'var(--s4) 0 var(--s2)' }}>{t('Overview') }</h2>
            <p>{t(p.overview)}</p>
          </Reveal>
        </div>
        <Reveal className="panel" delay={0.1} style={{ alignSelf: 'start' }}>
          <div style={{ padding: 'var(--s2) 0', borderBottom: '1px solid var(--border)' }}><strong>{t('Category') }</strong><br />{t(cat?.label || '')}</div>
          <div style={{ padding: 'var(--s2) 0', borderBottom: '1px solid var(--border)' }}><strong>{t('Status') }</strong><br />{p.is_demo === false ? t('Project') : t('Demo concept, not a delivered client project') }</div>
          <div style={{ padding: 'var(--s2) 0', borderBottom: '1px solid var(--border)' }}><strong>{t('Capabilities shown') }</strong>
            <ul className="list">{p.highlights.map((h) => <li key={h}><i />{t(h)}</li>)}</ul>
          </div>
          <div style={{ padding: 'var(--s2) 0' }}><strong>{t('Technologies') }</strong>
            <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </Reveal>
      </Section>
      <Section style={{ paddingTop: 0 }}><Button variant="ghost" to="/projects">{t('Back to All Projects') }</Button></Section>
      <CtaBand title={t('Planning Something Similar?')} text={t("Tell us about your project and we’ll explore the right approach together.")} label={t('Start a Conversation')} />
    </>
  )
}

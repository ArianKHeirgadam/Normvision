import { useState } from 'react'
import Hero from '../components/Hero.jsx'
import Section from '../components/Section.jsx'
import SectionHead from '../components/SectionHead.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import WhyGrid from '../components/WhyGrid.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { AboutVisual } from '../components/visuals.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { useLocale } from '../i18n.jsx'
import { values } from '../data/content.js'

const expertiseDetails = [
  ['Web Application Engineering', 'Building responsive web products, portals, and dashboards around real user needs.'],
  ['Software Architecture', 'Planning maintainable application structures and practical technology choices.'],
  ['Server & Infrastructure Management', 'Configuring, monitoring, and maintaining dependable server environments.'],
  ['Database Development', 'Designing structured data solutions with performance and integrity in mind.'],
  ['System Integration', 'Connecting applications, APIs, and business tools into coherent workflows.'],
  ['Technical Maintenance', 'Keeping software healthy through updates, troubleshooting, and ongoing improvements.'],
]



const roadmapTracks = [
  {
    id: 'platform', label: 'Platform', color: 'blue',
    path: 'M 35 300 H 270 C 325 300 330 245 390 245 H 965',
    stations: [
      { id: 'understand', label: 'Understand', detail: 'We map the business goals, user needs, and technical constraints before choosing a direction.', x: 55, y: 300 },
      { id: 'plan', label: 'Plan', detail: 'We shape the architecture, define the scope, and agree on a practical implementation path.', x: 270, y: 300 },
      { id: 'build', label: 'Build', detail: 'We develop and validate the solution in focused steps, with quality and maintainability in mind.', x: 520, y: 245 },
      { id: 'launch', label: 'Launch', detail: 'We prepare the release, verify the experience, and help move the solution into use.', x: 930, y: 245 },
    ],
  },
  {
    id: 'design', label: 'Design', color: 'green',
    path: 'M 35 85 H 405 C 455 85 470 125 510 165 L 700 345 C 730 370 750 370 790 370 H 965',
    stations: [
      { id: 'research', label: 'Research', detail: 'We understand the people, workflows, and context behind the problem.', x: 55, y: 85 },
      { id: 'experience', label: 'Experience design', detail: 'We organize information and interactions into clear, accessible user journeys.', x: 405, y: 85 },
      { id: 'system', label: 'Design system', detail: 'We establish reusable interface patterns that keep the product consistent as it grows.', x: 700, y: 345 },
      { id: 'refine', label: 'Refinement', detail: 'We improve the interface through review, feedback, and careful iteration.', x: 930, y: 370 },
    ],
  },
  {
    id: 'growth', label: 'Growth', color: 'purple',
    path: 'M 35 390 H 350 C 410 390 430 350 475 305 L 700 90 C 735 58 755 58 800 58 H 965',
    stations: [
      { id: 'integrate', label: 'Integrate', detail: 'We connect the application with the APIs, data, and tools your team already relies on.', x: 55, y: 390 },
      { id: 'deploy', label: 'Deploy', detail: 'We create a repeatable deployment process and prepare the infrastructure for release.', x: 350, y: 390 },
      { id: 'monitor', label: 'Monitor', detail: 'We keep an eye on reliability and performance so issues can be identified early.', x: 700, y: 90 },
      { id: 'evolve', label: 'Evolve', detail: 'We support ongoing maintenance, optimization, and new capabilities as needs change.', x: 930, y: 58 },
    ],
  },
]

function Roadmap() {
  const { t } = useLocale()
  const [active, setActive] = useState('build')
  const selectedTrack = roadmapTracks.find((track) => track.stations.some((station) => station.id === active))
  const selectedStation = selectedTrack?.stations.find((station) => station.id === active)

  return (
    <Section className="about-roadmap">
      <div className="roadmap-heading">
        <span className="roadmap-kicker">{t('ENGINEERING JOURNEY · NORMVISION')}</span>
        <SectionHead title={t('A connected path from idea to impact.')} lead={t('Explore how strategy, design, and engineering move together to create dependable digital solutions.')} />
      </div>
      <div className="roadmap-board">
        <div className="roadmap-grid" aria-hidden="true" />
        <svg className="roadmap-svg" viewBox="0 0 1000 430" preserveAspectRatio="none" role="img" aria-label={t('Interactive engineering roadmap with Platform, Design, and Growth tracks')}>
          <path className="roadmap-track roadmap-track-design" d={roadmapTracks[1].path} />
          <path className="roadmap-track roadmap-track-growth" d={roadmapTracks[2].path} />
          <path className="roadmap-track roadmap-track-platform" d={roadmapTracks[0].path} />
        </svg>
        {roadmapTracks.map((track) => (
          <div className={`roadmap-stations roadmap-stations-${track.id}`} key={track.id}>
            {track.stations.map((station, index) => (
              <button
                type="button"
                key={station.id}
                className={`roadmap-node roadmap-node-${track.color}${active === station.id ? ' is-active' : ''}`}
                style={{ left: `${station.x / 10}%`, top: `${station.y / 4.3}%` }}
                onClick={() => setActive(station.id)}
                aria-pressed={active === station.id}
                aria-label={t(station.label)}
              >
                <span className="roadmap-node-dot">{index + 1}</span>
                <span className="roadmap-node-label">{t(station.label)}</span>
              </button>
            ))}
          </div>
        ))}
        <div className={`roadmap-detail roadmap-detail-${selectedTrack?.color || 'blue'}`} aria-live="polite">
          <span className="roadmap-detail-kicker">{t(selectedTrack?.label || 'Platform')} · {t('STATION')} {selectedTrack?.stations.findIndex((station) => station.id === active) + 1}</span>
          <h3>{t(selectedStation?.label || 'Build')}</h3>
          <p>{t(selectedStation?.detail || '')}</p>
        </div>
      </div>
      <div className="roadmap-footer">
        <div className="roadmap-legend">
          {roadmapTracks.map((track) => (
            <button type="button" key={track.id} className={`roadmap-legend-item roadmap-legend-${track.color}${selectedTrack?.id === track.id ? ' is-active' : ''}`} onClick={() => setActive(track.stations[0].id)}>
              <span className="roadmap-legend-line" />
              <span>{t(track.label)}</span>
              <span className="roadmap-legend-count">{track.stations.length}</span>
            </button>
          ))}
        </div>
        <p>{t('Select any station to explore how each part of the journey connects.')}</p>
      </div>
    </Section>
  )
}

export default function About() {
  const { t } = useLocale()
  usePageMeta('About Us | nORMvis', 'nORMvis is a software engineering and technology solutions company building custom applications, dependable infrastructure and digital systems.')
  return (
    <div className="about-page">
      <Hero
        page
        title={t('Engineering a Better Digital Future.')}
        lead={t('nORMvis is a software engineering and technology solutions company focused on building custom applications, dependable infrastructure, and digital systems that empower businesses.')}
        actions={<Button to="/services">{t('Explore Our Services')}</Button>}
        visual={<AboutVisual />}
      />

      <Section className="about-intro" wrap="split" style={{ paddingTop: 0 }}>
        <Reveal>
          <span className="about-eyebrow">{t('WHO WE ARE')}</span>
          <h2 className="h2">{t('Technology Meets Purpose.')}</h2>
        </Reveal>
        <Reveal className="copy" delay={0.1}>
          <p>{t('At nORMvis, we believe technology should solve real problems and create meaningful value.')}</p>
          <p>{t('We focus on designing and developing custom software applications, managing server infrastructure, and providing ongoing technical support.')}</p>
          <p>{t('Our approach combines thoughtful engineering, practical problem-solving, and a commitment to building reliable digital solutions.')}</p>
        </Reveal>
      </Section>

      <Section className="about about-mission" wrap="mv">
        <Reveal>
          <article className="card about-principle">
            <span className="about-card-icon"><Icon name="Target" /></span>
            <span className="about-card-kicker">{t('OUR PURPOSE')}</span>
            <h3>{t('Our Mission')}</h3>
            <p>{t('To help businesses turn complex challenges into effective digital solutions through thoughtful engineering, modern technologies, and dependable technical services.')}</p>
          </article>
        </Reveal>
        <Reveal delay={0.1}>
          <article className="card about-principle about-principle-vision">
            <span className="about-card-icon"><Icon name="Compass" /></span>
            <span className="about-card-kicker">{t('OUR DIRECTION')}</span>
            <h3>{t('Our Vision')}</h3>
            <p>{t('To become a trusted international technology partner, recognized for delivering reliable software solutions and helping businesses evolve through technology.')}</p>
          </article>
        </Reveal>
      </Section>

      <Section className="about-values">
        <SectionHead title={t('Our Core Values')} lead={t('The principles that guide how we think, build, and work with our clients.')} />
        <div className="vals">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <article className="card about-value-card">
                <Icon name={v.icon} />
                <h3>{t(v.title)}</h3>
                <p>{t(v.text)}</p>
                <span className="about-value-index">{String(i + 1).padStart(2, '0')}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="tech about-expertise">
        <SectionHead title={t('Engineering Across Multiple Disciplines.')} lead={t('A connected set of capabilities to help businesses build, run, and improve their digital systems.')} max="20ch" />
        <WhyGrid items={expertiseDetails.map(([title, description]) => [title, description])} />
      </Section>

      <Roadmap />

      <CtaBand title={t('Let’s Build What’s Next.')} text={t("Have an idea, a technical challenge, or a business system that needs improvement? We’d love to hear about it.")} label={t('Get in Touch')} />
    </div>
  )
}

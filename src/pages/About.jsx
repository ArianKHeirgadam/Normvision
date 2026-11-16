import Hero from '../components/Hero.jsx'
import Section from '../components/Section.jsx'
import SectionHead from '../components/SectionHead.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import Steps from '../components/Steps.jsx'
import WhyGrid from '../components/WhyGrid.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { AboutVisual } from '../components/visuals.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { useLocale } from '../i18n.jsx'
import { values, serviceSteps } from '../data/content.js'

const expertiseDetails = [
  ['Web Application Engineering', 'Building responsive web products, portals, and dashboards around real user needs.'],
  ['Software Architecture', 'Planning maintainable application structures and practical technology choices.'],
  ['Server & Infrastructure Management', 'Configuring, monitoring, and maintaining dependable server environments.'],
  ['Database Development', 'Designing structured data solutions with performance and integrity in mind.'],
  ['System Integration', 'Connecting applications, APIs, and business tools into coherent workflows.'],
  ['Technical Maintenance', 'Keeping software healthy through updates, troubleshooting, and ongoing improvements.'],
]

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

      <Section className="about-process">
        <SectionHead title={t('Our Approach')} lead={t('A clear process that keeps projects understandable from the first conversation to long-term support.')} />
        <Steps items={serviceSteps} />
      </Section>

      <CtaBand title={t('Let’s Build What’s Next.')} text={t("Have an idea, a technical challenge, or a business system that needs improvement? We’d love to hear about it.")} label={t('Get in Touch')} />
    </div>
  )
}

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
import { values, expertise, serviceSteps } from '../data/content.js'

export default function About() {
  const { t } = useLocale()
  usePageMeta('About Us | nORMvis', 'nORMvis is a software engineering and technology solutions company building custom applications, dependable infrastructure and digital systems.')
  return (
    <>
      <Hero
        page
        title={t('Engineering a Better Digital Future.')}
        lead={t('nORMvis is a software engineering and technology solutions company focused on building custom applications, dependable infrastructure, and digital systems that empower businesses.')}
        actions={<Button to="/services">{t('Explore Our Services') }</Button>}
        visual={<AboutVisual />}
      />
      <Section wrap="split" style={{ paddingTop: 0 }}>
        <Reveal><h2 className="h2">{t('Technology Meets Purpose.') }</h2></Reveal>
        <Reveal className="copy" delay={0.1}>
          <p>{t('At nORMvis, we believe technology should solve real problems and create meaningful value.') }</p>
          <p>{t('We focus on designing and developing custom software applications, managing server infrastructure, and providing ongoing technical support.') }</p>
          <p>{t('Our approach combines thoughtful engineering, practical problem-solving, and a commitment to building reliable digital solutions.') }</p>
        </Reveal>
      </Section>
      <Section className="about" wrap="mv">
        <Reveal><div className="card"><h3>{t('Our Mission') }</h3><p>{t('To help businesses turn complex challenges into effective digital solutions through thoughtful engineering, modern technologies, and dependable technical services.') }</p></div></Reveal>
        <Reveal delay={0.1}><div className="card"><h3>{t('Our Vision') }</h3><p>{t('To become a trusted international technology partner, recognized for delivering reliable software solutions and helping businesses evolve through technology.') }</p></div></Reveal>
      </Section>
      <Section>
        <SectionHead title={t('Our Core Values')} />
        <div className="vals">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="card"><Icon name={v.icon} /><h3>{t(v.title)}</h3><p>{t(v.text)}</p></div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section className="tech">
        <SectionHead title={t('Engineering Across Multiple Disciplines.')} max="20ch" />
        <WhyGrid items={expertise.map((e) => [e])} />
      </Section>
      <Section>
        <SectionHead title={t('Our Approach')} lead={t('A clear process that keeps projects understandable from the first conversation to long-term support.')} />
        <Steps items={serviceSteps} />
      </Section>
      <CtaBand title={t('Let’s Build What’s Next.')} text={t("Have an idea, a technical challenge, or a business system that needs improvement? We’d love to hear about it.")} label={t('Get in Touch')} />
    </>
  )
}

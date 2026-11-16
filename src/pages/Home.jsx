import HeroVideo from '../components/HeroVideo.jsx'
import Section from '../components/Section.jsx'
import SectionHead from '../components/SectionHead.jsx'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Steps from '../components/Steps.jsx'
import WhyGrid from '../components/WhyGrid.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { ArchitectureVisual } from '../components/visuals.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { useLocale } from '../i18n.jsx'
import { services, homeSteps, tech, homeWhy } from '../data/content.js'
import { projects } from '../data/projects.js'

export default function Home() {
  const { t } = useLocale()
  usePageMeta('nORMvis | Engineering Digital Excellence', 'nORMvis is a software engineering and IT solutions company: web applications, infrastructure, custom software and long-term support.')
  return (
    <>
      <HeroVideo
        title={t('Engineering Digital Excellence.')}
        lead={t('We design, develop, and maintain intelligent digital solutions that help businesses operate smarter, scale faster, and move forward with confidence.')}
        actions={<>
          <Button to="/services">{t('Explore Our Services') }</Button>
          <Button variant="ghost" to="/contact">{t('Let’s Discuss Your Project') }</Button>
        </>}
      />
      <Section id="services">
        <SectionHead title={t('Technology Built Around Your Business.')} />
        <div className="sv-grid">
          {services.map((s, i) => <ServiceCard key={s.title} index={i} {...s} />)}
        </div>
      </Section>
      <Section className="about" id="about">
        <Reveal><ArchitectureVisual /></Reveal>
        <Reveal delay={0.1}>
          <h2 className="h2">{t('Your Technology Partner for What’s Next.') }</h2>
          <p className="lead">{t('At nORMvis, we combine engineering expertise, thoughtful design, and modern technologies to build dependable digital solutions. From custom applications to infrastructure management, we help businesses transform ideas into reliable technology.') }</p>
          <Button to="/about">{t('Discover nORMvis') }</Button>
        </Reveal>
      </Section>
      <Section id="approach">
        <SectionHead title={t('From Vision to Reality.')} />
        <Steps items={homeSteps} />
      </Section>
      <Section className="tech" id="technology">
        <SectionHead title={t('Built With the Right Technologies.')} />
        <ul className="chips" style={{ listStyle: 'none', padding: 0 }}>
          {tech.map((t, i) => <Reveal as="li" className="chip" key={t} delay={i * 0.04}><i />{t}</Reveal>)}
        </ul>
      </Section>
      <Section id="why">
        <SectionHead title={t('More Than Development. A Long-Term Technology Partner.')} max="22ch" />
        <WhyGrid items={homeWhy} />
      </Section>
      <Section className="tech" id="featured">
        <SectionHead title={t('Featured Projects.')} lead={t('Demo concepts that illustrate the kind of work we do. Real projects will be added when they are available.')} />
        <div className="pgrid" style={{ marginTop: 'var(--s4)' }}>
          {projects.filter((p) => p.featured).map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
        </div>
        <div style={{ marginTop: 'var(--s4)' }}><Button variant="ghost" to="/projects">{t('View All Projects') }</Button></div>
      </Section>
      <CtaBand title={t('Have an Idea? Let’s Build It Together.')} text={t("Whether you need a custom application, reliable infrastructure, or ongoing technical support, we’re ready to help.")} label={t('Start a Conversation')} />
    </>
  )
}

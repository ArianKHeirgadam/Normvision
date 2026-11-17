import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import { useLocale } from '../i18n.jsx'

export default function ServiceCard({ icon, title, short, index = 0 }) {
  const { t } = useLocale()
  const number = String(index + 1).padStart(2, '0')
  return (
    <Reveal delay={index * 0.08}>
      <article className={`card sv-card sv-card-${index + 1}`}>
        <div className="sv-card-top">
          <span className="sv-card-index">{number}</span>
          <span className="sv-card-label">{t('CORE SERVICE')}</span>
          <span className="sv-card-icon"><Icon name={icon} /></span>
        </div>
        <div className="sv-card-content">
          <h3>{t(title)}</h3>
          <p>{t(short)}</p>
        </div>
        <Link className="sv-card-link" to="/services" aria-label={`Learn more about ${title}`}>
          <span>{t('Explore service')}</span>
          <span className="sv-card-arrow" aria-hidden="true">↗</span>
        </Link>
        <span className="sv-card-orbit" aria-hidden="true" />
      </article>
    </Reveal>
  )
}

import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import { useLocale } from '../i18n.jsx'

export default function ServiceCard({ icon, title, short, index = 0 }) {
  const { t } = useLocale()
  return (
    <Reveal delay={index * 0.08}>
      <article className="card">
        <Icon name={icon} />
        <h3>{t(title)}</h3>
        <p>{t(short)}</p>
        <Link className="more" to="/services" aria-label={`Learn more about ${title}`}>{t('Learn More')}</Link>
      </article>
    </Reveal>
  )
}

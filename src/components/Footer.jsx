import { Link } from 'react-router-dom'
import Brand from './Brand.jsx'
import { nav, services } from '../data/content.js'
import { useLocale } from '../i18n.jsx'

export default function Footer() {
  const { t } = useLocale()
  return (
    <footer>
      <div className="wrap">
        <div className="f-grid">
          <div>
            <Brand />
            <p className="f-desc">{t('Software engineering and IT solutions: web applications, infrastructure, custom software, and ongoing support.')}</p>
          </div>
          <nav aria-label="Footer navigation">
            <h4>{t('Navigate')}</h4>
            <ul>{nav.map((i) => <li key={i.label}><Link to={i.to}>{t(i.label)}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Footer services">
            <h4>{t('Services')}</h4>
            <ul>{services.map((s) => <li key={s.label}><Link to="/services">{t(s.label)}</Link></li>)}</ul>
          </nav>
          <div id="contact-info">
            <h4>{t('Contact')}</h4>
            <ul><li>{t('[Email address]')}</li><li>{t('[Phone number]')}</li><li>{t('[Office location]')}</li><li>{t('[LinkedIn] · [GitHub] · [X]')}</li></ul>
          </div>
        </div>
        <div className="legal">
          <span>© {new Date().getFullYear()} nORMvis. {t('All rights reserved.')}</span>
          <div><span>{t('Privacy Policy')}</span><span>{t('Terms of Service')}</span></div>
        </div>
      </div>
    </footer>
  )
}

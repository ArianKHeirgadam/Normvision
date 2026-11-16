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
            <p className="f-desc">
              {t('Software engineering and IT solutions: web applications, infrastructure, custom software, and ongoing support.')}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h4>{t('Navigate')}</h4>
            <ul>
              {nav.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{t(item.label)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services">
            <h4>{t('Services')}</h4>
            <ul>
              {services.map((service) => (
                <li key={service.label}>
                  <Link to="/services">{t(service.label)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div id="contact-info">
            <h4>{t('Contact')}</h4>
            <p className="f-contact-note">
              {t('Have an idea, a technical challenge, or a business system that needs improvement? We’d love to hear about it.')}
            </p>
            <Link className="f-contact-link" to="/contact">
              {t('Get in Touch')}
            </Link>
          </div>
        </div>

        <div className="legal">
          <span>© {new Date().getFullYear()} nORMvis. {t('All rights reserved.')}</span>
          <div>
            <span>{t('Privacy Policy')}</span>
            <span>{t('Terms of Service')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

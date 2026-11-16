import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { useLocale } from '../i18n.jsx'

export default function NotFound() {
  const { t } = useLocale()
  usePageMeta('Page not found | nORMvis', 'The page you requested could not be found.')
  return (
    <Section>
      <h1 className="h2">{t('Page not found.') }</h1>
      <p className="lead">{t('The page you’re looking for doesn’t exist or has moved.') }</p>
      <div style={{ marginTop: '1.5rem' }}><Button to="/">{t('Back to Home') }</Button></div>
    </Section>
  )
}

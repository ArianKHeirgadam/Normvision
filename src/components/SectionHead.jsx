import Reveal from './Reveal.jsx'
import { useLocale } from '../i18n.jsx'

export default function SectionHead({ title, lead, max }) {
  const { t } = useLocale()
  return (
    <Reveal>
      <h2 className="h2" style={max ? { maxWidth: max } : undefined}>{t(title)}</h2>
      {lead && <p className="lead">{t(lead)}</p>}
    </Reveal>
  )
}

import Button from './Button.jsx'
import { useLocale } from '../i18n.jsx'

// Closing call-to-action. is the target of every "Contact" / "Let's Talk" link.
export default function CtaBand({ title, text, label }) {
  const { t } = useLocale()
  return (
    <section className="cta">
      <div className="wrap">
        <div className="box">
          <h2>{t(title)}</h2>
          <p>{t(text)}</p>
          <Button variant="white" to="/contact">{t(label)}</Button>
        </div>
      </div>
    </section>
  )
}

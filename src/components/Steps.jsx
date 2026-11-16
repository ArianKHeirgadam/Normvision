import Reveal from './Reveal.jsx'
import { useLocale } from '../i18n.jsx'

export default function Steps({ items }) {
  const { t } = useLocale()
  return (
    <ol className="steps">
      {items.map(([title, text], i) => (
        <Reveal as="li" className="step" key={title} delay={i * 0.08}>
          <span className="num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <h3>{t(title)}</h3>
          <p>{t(text)}</p>
        </Reveal>
      ))}
    </ol>
  )
}

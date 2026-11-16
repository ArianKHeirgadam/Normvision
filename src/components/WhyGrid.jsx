import { useLocale } from '../i18n.jsx'

// items: [title, optionalDescription]
export default function WhyGrid({ items }) {
  const { t } = useLocale()
  return (
    <div className="why-grid">
      {items.map(([title, text]) => (
        <div className="why" key={title}>
          <h3>{t(title)}</h3>
          {text && <p>{t(text)}</p>}
        </div>
      ))}
    </div>
  )
}

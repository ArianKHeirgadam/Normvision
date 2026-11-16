import Button from './Button.jsx'
import Reveal from './Reveal.jsx'
import ServiceArt from './ServiceArt.jsx'
import { useLocale } from '../i18n.jsx'

export default function ServiceDetail({ id, number, title, long, detail, items, cta }) {
  const { t } = useLocale()
  return (
    <Reveal as="article" className={number % 2 === 0 ? 'svc flip' : 'svc'}>
      <div>
        <span className="idx">{String(number).padStart(2, '0')}</span>
        <h3>{t(title)}</h3>
        <p className="lead">{t(long)}</p>
        <p className="detail">{t(detail)}</p>
        <Button to={`/contact?service=${id}`}>{t(cta)}</Button>
      </div>
      <div className="svc-side">
        <ServiceArt id={id} />
        <div className="panel">
          <ul className="list">
            {items.map((i) => <li key={i}><i />{t(i)}</li>)}
          </ul>
        </div>
      </div>
    </Reveal>
  )
}

import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { services } from '../data/content.js'
import { useLocale } from '../i18n.jsx'
import { sendContactInquiry } from '../lib/api.js'

const messages = {
  sent: { en: 'Thank you. Your message has been received.', fa: 'ممنون؛ پیام شما با موفقیت ثبت شد.' },
  error: { en: 'Something went wrong and your message was not sent. Please try again later.', fa: 'مشکلی پیش آمد و پیام ثبت نشد. لطفاً دوباره تلاش کنید.' },
}

export default function Contact() {
  usePageMeta('Contact | nORMvis', 'Tell nORMvis about your project: web applications, infrastructure, custom software or technical support.')
  const { t, isFa } = useLocale()
  const [params] = useSearchParams()
  const initialService = params.get('service') || ''
  const [service, setService] = useState(initialService)
  const [menuOpen, setMenuOpen] = useState(false)
  const [status, setStatus] = useState('idle')
  const serviceOptions = [
    ...services.map((item) => ({ value: item.id, label: t(item.title) })),
    { value: 'other', label: t('Something else / not sure yet') },
  ]
  const selectedService = serviceOptions.find((item) => item.value === service)

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const values = Object.fromEntries(new FormData(form))
    setStatus('sending')
    try {
      await sendContactInquiry({ ...values, source_language: isFa ? 'fa' : 'en' })
      setStatus('sent')
      form.reset()
      setService('')
      setMenuOpen(false)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Section className="page-head contact-head">
        <span className="contact-eyebrow">{t('CONTACT / START A PROJECT')}</span>
        <h1>{t('Let’s talk about your project.')}</h1>
        <p className="lead" style={{ marginTop: 'var(--s2)' }}>
          {t('Tell us what you’re building, improving, or maintaining. Share a few details and we’ll explore how nORMvis can help.')}
        </p>
      </Section>

      <Section className="contact-section" style={{ paddingTop: 0 }}>
        <Reveal>
          <form className="form contact-form" onSubmit={onSubmit}>
            <div className="contact-form-top">
              <div>
                <span className="contact-step">01 / {t('PROJECT DETAILS')}</span>
                <h2>{t('Tell us a little more')}</h2>
              </div>
              <p>{t('A few details will help us understand what you need.')}</p>
            </div>

            <div className="contact-fields">
              <div className="field">
                <label htmlFor="name">{t('Name')}</label>
                <input id="name" name="name" autoComplete="name" placeholder={t('Your name')} required minLength={2} />
              </div>
              <div className="field">
                <label htmlFor="email">{t('Email')}</label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder={t('you@example.com')} required />
              </div>
              <div className="field">
                <label htmlFor="company">{t('Company')} <span>{t('(optional)')}</span></label>
                <input id="company" name="company" autoComplete="organization" placeholder={t('Company or organization')} />
              </div>
              <div className="field">
                <label id="service-label">{t('Service')}</label>
                <div className={`service-picker${menuOpen ? ' is-open' : ''}`} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setMenuOpen(false) }}>
                  <input type="hidden" name="service" value={service} />
                  <button
                    className="service-trigger"
                    type="button"
                    aria-labelledby="service-label"
                    aria-haspopup="listbox"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    onKeyDown={(e) => { if (e.key === 'Escape') setMenuOpen(false) }}
                  >
                    <span className={selectedService ? 'selected' : 'placeholder'}>{selectedService?.label || t('Select a service')}</span>
                    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 7.5 5 5 5-5" /></svg>
                  </button>
                  {menuOpen && (
                    <div className="service-menu" role="listbox" aria-labelledby="service-label">
                      {serviceOptions.map((item, index) => (
                        <button
                          type="button"
                          role="option"
                          aria-selected={service === item.value}
                          className={`service-option${service === item.value ? ' active' : ''}`}
                          key={item.value}
                          onClick={() => { setService(item.value); setMenuOpen(false) }}
                        >
                          <span className="service-option-index">{String(index + 1).padStart(2, '0')}</span>
                          <span>{item.label}</span>
                          {service === item.value && <span className="service-check" aria-hidden="true">✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {!service && <span className="field-hint">{t('Choose the area you need help with.')}</span>}
              </div>
              <div className="field field-message">
                <label htmlFor="message">{t('Project description')}</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder={t('Tell us about your goals, requirements, and what you would like to improve…')}
                  required
                  minLength={10}
                  maxLength={5000}
                />
                <span className="field-hint">{t('Please include enough detail for us to understand your request.')}</span>
              </div>
            </div>

            <div className="website-field" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="contact-form-bottom">
              <span>{t('Your information will only be used to respond to your inquiry.')}</span>
              <button className="btn btn-primary submit-btn" type="submit" disabled={status === 'sending' || !service}>
                {status === 'sending' ? t('Sending…') : t('Send Inquiry')}
                <span aria-hidden="true">↗</span>
              </button>
            </div>
            <p className={`status${status === 'sent' ? ' ok' : status === 'error' ? ' err' : ''}`} role="status" aria-live="polite" hidden={!messages[status]}>
              {isFa ? messages[status]?.fa : messages[status]?.en}
            </p>
          </form>
        </Reveal>
      </Section>
    </>
  )
}

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
  const [status, setStatus] = useState('idle')

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const values = Object.fromEntries(new FormData(form))
    setStatus('sending')
    try {
      await sendContactInquiry({ ...values, source_language: isFa ? 'fa' : 'en' })
      setStatus('sent')
      form.reset()
    } catch { setStatus('error') }
  }

  return (
    <>
      <Section className="page-head">
        <h1>{t('Let’s talk about your project.') }</h1>
        <p className="lead" style={{ marginTop: 'var(--s2)' }}>{t('Tell us what you’re building, improving, or maintaining. Share a few details and we’ll explore how nORMvis can help.') }</p>
      </Section>
      <Section style={{ paddingTop: 0 }} wrap="contact">
        <Reveal>
          <div className="panel">
            <ul className="list">
              <li><i />{t('[Email address]') }</li>
              <li><i />{t('[Phone number]') }</li>
              <li><i />{t('[Office location]') }</li>
              <li><i />{t('[LinkedIn] · [GitHub] · [X]') }</li>
            </ul>
          </div>
          <p className="note" style={{ marginTop: 'var(--s2)' }}>{t('Contact details are placeholders until they are published.') }</p>
        </Reveal>
        <Reveal delay={0.1}>
          <form className="form" onSubmit={onSubmit}>
            <div className="row2">
              <div className="field"><label htmlFor="name">{t('Name') }</label><input id="name" name="name" autoComplete="name" required /></div>
              <div className="field"><label htmlFor="email">{t('Email') }</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
            </div>
            <div className="row2">
              <div className="field"><label htmlFor="company">{t('Company')} <span>{t('(optional)') }</span></label><input id="company" name="company" autoComplete="organization" /></div>
              <div className="field">
                <label htmlFor="service">{t('Service') }</label>
                <select id="service" name="service" defaultValue={params.get('service') || ''} required>
                  <option value="" disabled>{t('Select a service') }</option>
                  {services.map((s) => <option key={s.id} value={s.id}>{t(s.title)}</option>)}
                  <option value="other">{t('Something else / not sure yet') }</option>
                </select>
              </div>
            </div>
            <div className="field"><label htmlFor="message">{t('Project description') }</label><textarea id="message" name="message" required minLength={10} /></div>
            <div className="website-field" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
            <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? t('Sending…') : t('Send Inquiry')}</button>
            <p className={`status${status === 'sent' ? ' ok' : status === 'error' ? ' err' : ''}`} role="status" hidden={!messages[status]}>{isFa ? messages[status]?.fa : messages[status]?.en}</p>
          </form>
        </Reveal>
      </Section>
    </>
  )
}

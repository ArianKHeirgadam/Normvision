import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import Brand from './Brand.jsx'
import Button from './Button.jsx'
import { nav } from '../data/content.js'
import { useLocale } from '../i18n.jsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')
  const { locale, setLocale, t } = useLocale()
  const { pathname } = useLocation()

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    localStorage.setItem('normvis-theme', next)
    setTheme(next)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname, locale])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const languageSwitch = (
    <div className="language-switch" role="group" aria-label="Select language">
      <button type="button" aria-pressed={locale === 'en'} className={locale === 'en' ? 'active' : ''} onClick={() => setLocale('en')}>EN</button>
      <span aria-hidden="true">/</span>
      <button type="button" aria-pressed={locale === 'fa'} className={locale === 'fa' ? 'active' : ''} onClick={() => setLocale('fa')}>PER</button>
    </div>
  )

  const navigationLinks = (mobile = false) => nav.map((item) => (
    <NavLink
      key={item.to}
      to={item.to}
      end={item.to === '/'}
      onClick={mobile ? () => setOpen(false) : undefined}
    >
      {t(item.label)}
    </NavLink>
  ))

  return (
    <header className={scrolled ? 'hdr scrolled' : 'hdr'}>
      <div className="wrap">
        <Brand />
        <nav className="nav" aria-label="Primary navigation">
          {navigationLinks()}
        </nav>
        <div className="hdr-actions">
          {languageSwitch}
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={t(theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme')} title={t(theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme')}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}<span>{t(theme === 'dark' ? 'Light' : 'Dark')}</span>
          </button>
          <Button size="sm" to="/contact" className="hdr-cta">{t('Let’s Talk')}</Button>
        </div>
        <button className="menu-btn" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div className={open ? 'mobile open' : 'mobile'} id="mobile-navigation">
        <nav aria-label="Mobile navigation">
          {navigationLinks(true)}
        </nav>
        <div className="mobile-dock-controls">
          {languageSwitch}
          <button className="theme-toggle mobile-theme-toggle" type="button" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}<span>{t(theme === 'dark' ? 'Light' : 'Dark')}</span>
          </button>
          <Button to="/contact" onClick={() => setOpen(false)}>{t('Let’s Talk')}</Button>
        </div>
      </div>
    </header>
  )
}

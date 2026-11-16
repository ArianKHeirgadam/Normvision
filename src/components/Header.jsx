import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import Brand from './Brand.jsx'
import Button from './Button.jsx'
import { nav } from '../data/content.js'
import { useLocale } from '../i18n.jsx'

function NavItem({ item, onClick, t }) {
  return <NavLink to={item.to} end={item.to === '/'} onClick={onClick}>{t(item.label)}</NavLink>
}
export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')
  const { locale, setLocale, isFa, t } = useLocale()
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    localStorage.setItem('normvis-theme', next)
    setTheme(next)
  }
  const { pathname } = useLocation()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setOpen(false), [pathname, locale])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])
  const languageSwitch = <div className="language-switch" role="group" aria-label="Select language">
    <button type="button" aria-pressed={locale === 'en'} className={locale === 'en' ? 'active' : ''} onClick={() => setLocale('en')}>EN</button>
    <span aria-hidden="true">/</span>
    <button type="button" aria-pressed={locale === 'fa'} className={locale === 'fa' ? 'active' : ''} onClick={() => setLocale('fa')}>PER</button>
  </div>
  return <header className={scrolled ? 'hdr scrolled' : 'hdr'}>
    <div className="wrap">
      <Brand />
      <nav className="nav" aria-label="Primary">{nav.map((i) => <NavItem key={i.to} item={i} t={t} />)}</nav>
      <div className="hdr-actions">
        {languageSwitch}
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={t(theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme')} title={t(theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme')}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}<span>{t(theme === 'dark' ? 'Light' : 'Dark')}</span>
        </button>
        <Button size="sm" to="/contact" className="hdr-cta">{t('Let’s Talk')}</Button>
      </div>
      <button className="menu-btn" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
    <div className={open ? 'mobile open' : 'mobile'} id="mobile-nav">
      {languageSwitch}
      <button className="theme-toggle mobile-theme-toggle" type="button" onClick={toggleTheme}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}<span>{t(theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme')}</span></button>
      {nav.map((i) => <NavItem key={i.to} item={i} onClick={() => setOpen(false)} t={t} />)}
      <Button to="/contact">{t('Let’s Talk')}</Button>
    </div>
  </header>
}

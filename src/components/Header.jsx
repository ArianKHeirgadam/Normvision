import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { House, PanelsTopLeft, Compass, GitBranch, Mail, Menu, X, Sun, Moon } from 'lucide-react'
import Brand from './Brand.jsx'
import Button from './Button.jsx'
import { nav } from '../data/content.js'
import { useLocale } from '../i18n.jsx'

const dockIcons = [House, PanelsTopLeft, Compass, GitBranch, Mail]

function DockItem({ item, Icon, mouseX, t, onNavigate, mobile = false }) {
  const ref = useRef(null)
  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect()
    return bounds ? value - (bounds.left + bounds.width / 2) : 999
  })
  const widthValue = useTransform(distance, [-150, 0, 150], [43, 68, 43])
  const iconValue = useTransform(distance, [-150, 0, 150], [20, 30, 20])
  const width = useSpring(widthValue, { mass: 0.12, stiffness: 170, damping: 14 })
  const iconSize = useSpring(iconValue, { mass: 0.12, stiffness: 170, damping: 14 })
  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      onClick={onNavigate}
      className={({ isActive }) => `dock-link${isActive ? ' is-active' : ''}`}
      aria-label={t(item.label)}
      title={t(item.label)}
    >
      <motion.span ref={ref} className="dock-icon-wrap" style={mobile ? undefined : { width, height: width }}>
        <motion.span className="dock-icon-inner" style={mobile ? undefined : { width: iconSize, height: iconSize }}>
          <Icon aria-hidden="true" />
        </motion.span>
      </motion.span>
      {mobile && <span className="dock-mobile-label">{t(item.label)}</span>}
      <span className="dock-tooltip" role="tooltip">{t(item.label)}</span>
    </NavLink>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')
  const mouseX = useMotionValue(Infinity)
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

  return (
    <header className={scrolled ? 'hdr scrolled' : 'hdr'}>
      <div className="wrap">
        <Brand />
        <motion.nav
          className="nav floating-dock"
          aria-label="Primary navigation"
          onMouseMove={(event) => mouseX.set(event.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          {nav.map((item, index) => {
            const Icon = dockIcons[index]
            return <DockItem key={item.to} item={item} Icon={Icon} mouseX={mouseX} t={t} />
          })}
        </motion.nav>
        <div className="hdr-actions">
          {languageSwitch}
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={t(theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme')} title={t(theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme')}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}<span>{t(theme === 'dark' ? 'Light' : 'Dark')}</span>
          </button>
          <Button size="sm" to="/contact" className="hdr-cta">{t('Let’s Talk')}</Button>
        </div>
        <button className="menu-btn" aria-expanded={open} aria-controls="mobile-dock" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile mobile-dock-panel"
            id="mobile-dock"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <nav className="mobile-dock-links" aria-label="Mobile navigation">
              {nav.map((item, index) => {
                const Icon = dockIcons[index]
                return <DockItem key={item.to} item={item} Icon={Icon} mouseX={mouseX} t={t} mobile onNavigate={() => setOpen(false)} />
              })}
            </nav>
            <div className="mobile-dock-controls">
              {languageSwitch}
              <button className="theme-toggle mobile-theme-toggle" type="button" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}<span>{t(theme === 'dark' ? 'Light' : 'Dark')}</span>
              </button>
              <Button to="/contact" onClick={() => setOpen(false)}>{t('Let’s Talk')}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

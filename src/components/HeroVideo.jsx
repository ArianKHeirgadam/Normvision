import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { box, item } from './motionVariants.js'
import { useLocale } from '../i18n.jsx'

const base = import.meta.env.BASE_URL
const VIDEO = `${base}assets/videos/hero-background.mp4`
const POSTER = `${base}assets/videos/hero-poster.jpg`

// Home hero with a looping background video.
// Layers: poster/video (back) > light overlay > content (front).
// The poster is always painted first (no layout shift). The video is requested only after first
// paint and is skipped for reduced-motion and data-saver users, or if autoplay is blocked.
export default function HeroVideo({ title, lead, actions }) {
  const { t } = useLocale()
  const [load, setLoad] = useState(false)
  const [playing, setPlaying] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const c = navigator.connection
    if (reduce || (c && (c.saveData || /2g/.test(c.effectiveType || '')))) return
    const id = setTimeout(() => setLoad(true), 350)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    const v = ref.current
    if (!load || !v) return
    v.muted = true
    v.play().catch(() => {}) // autoplay blocked: poster stays visible
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()))
    io.observe(v)
    return () => io.disconnect()
  }, [load])

  return (
    <section className="hero hero-video">
      <div className="hero-media" style={{ backgroundImage: `url(${POSTER})` }} aria-hidden="true">
        {load && (
          <video
            ref={ref}
            className={playing ? 'on' : ''}
            src={VIDEO}
            poster={POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            tabIndex={-1}
            disablePictureInPicture
            onPlaying={() => setPlaying(true)}
          />
        )}
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <motion.div className="wrap" variants={box} initial="hidden" animate="show">
        <div className="hero-copy">
          <motion.h1 variants={item}>{t(title)}</motion.h1>
          <motion.p className="lead" variants={item}>{t(lead)}</motion.p>
          <motion.div className="hero-cta" variants={item}>{actions}</motion.div>
        </div>
      </motion.div>
    </section>
  )
}

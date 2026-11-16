import { motion } from 'framer-motion'
import { box, item } from './motionVariants.js'
import { useLocale } from '../i18n.jsx'

// `visual` should be one of the *Visual components (they animate with the hero stagger).
export default function Hero({ title, lead, actions, visual, page }) {
  const { t } = useLocale()
  return (
    <section className={page ? 'hero page' : 'hero'}>
      <motion.div className="wrap" variants={box} initial="hidden" animate="show">
        <div>
          <motion.h1 variants={item}>{t(title)}</motion.h1>
          <motion.p className="lead" variants={item}>{t(lead)}</motion.p>
          <motion.div className="hero-cta" variants={item}>{actions}</motion.div>
        </div>
        {visual}
      </motion.div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { item } from './motionVariants.js'

// Decorative SVG illustrations (original artwork, inline, no external files).
// Gradient "lg" is defined once in GradientDefs.jsx.
function Visual({ label, children }) {
  return (
    <motion.div className="vis" variants={item} role="img" aria-label={label}>
      {children}
    </motion.div>
  )
}

export function ServicesVisual() {
  return (
    <Visual label="Illustration of an application window above stacked server units">
      <svg viewBox="0 0 480 400"><rect x="30" y="30" width="260" height="170" rx="16" fill="var(--ill-surface)" stroke="var(--ill-border)"/><path d="M30 46a16 16 0 0 1 16-16h228a16 16 0 0 1 16 16v26H30z" fill="var(--ill-panel)"/><circle cx="50" cy="51" r="4" fill="var(--ill-dot-muted)"/><circle cx="64" cy="51" r="4" fill="var(--ill-dot-muted)"/><circle cx="78" cy="51" r="4" fill="var(--ill-dot-muted)"/><rect x="54" y="94" width="90" height="9" rx="4.5" fill="var(--ill-ink)" opacity=".85"/><rect x="54" y="114" width="150" height="7" rx="3.5" fill="var(--ill-line-soft)"/><path d="M54 176l32-32 28 18 36-40 44 30" fill="none" stroke="var(--ill-point)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><rect x="216" y="130" width="54" height="50" rx="10" fill="url(#lg)"/><g transform="translate(200 170)"><rect width="250" height="54" rx="12" fill="var(--ill-surface)" stroke="var(--ill-border)"/><rect x="18" y="22" width="90" height="10" rx="5" fill="var(--ill-line-soft)"/><circle cx="210" cy="27" r="5" fill="var(--ill-point)"/><circle cx="228" cy="27" r="5" fill="var(--ill-point-alt)"/></g><g transform="translate(200 236)"><rect width="250" height="54" rx="12" fill="var(--ill-surface)" stroke="var(--ill-border)"/><rect x="18" y="22" width="120" height="10" rx="5" fill="var(--ill-line-soft)"/><circle cx="210" cy="27" r="5" fill="var(--ill-point)"/><circle cx="228" cy="27" r="5" fill="var(--ill-line-soft)"/></g><g transform="translate(200 302)"><rect width="250" height="54" rx="12" fill="var(--ill-surface)" stroke="var(--ill-border)"/><rect x="18" y="22" width="70" height="10" rx="5" fill="var(--ill-line-soft)"/><circle cx="210" cy="27" r="5" fill="var(--ill-point-alt)"/><circle cx="228" cy="27" r="5" fill="var(--ill-line-soft)"/></g></svg>
    </Visual>
  )
}

export function AboutVisual() {
  return (
    <Visual label="Abstract connected technology architecture with layered platforms, orbiting data points, and flowing connections">
      <svg viewBox="0 0 480 400" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="about-platform" x1="90" y1="120" x2="370" y2="320" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--ill-surface)" />
            <stop offset="1" stopColor="var(--ill-tint)" />
          </linearGradient>
          <linearGradient id="about-core" x1="170" y1="140" x2="310" y2="270" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--ill-gradient-start)" />
            <stop offset="1" stopColor="var(--ill-gradient-end)" />
          </linearGradient>
          <filter id="about-shadow" x="40" y="35" width="400" height="350" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* Soft ambient depth */}
        <ellipse cx="242" cy="320" rx="155" ry="24" fill="var(--ill-point)" opacity=".12" filter="url(#about-shadow)" />

        {/* Orbit paths */}
        <motion.ellipse cx="240" cy="198" rx="184" ry="83" transform="rotate(-22 240 198)" stroke="var(--ill-line)" strokeWidth="1.5" strokeDasharray="5 9" opacity=".65" animate={{ rotate: [0, 3, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "240px 198px" }} />
        <ellipse cx="240" cy="198" rx="145" ry="119" transform="rotate(34 240 198)" stroke="var(--ill-line-soft)" strokeWidth="1.5" opacity=".8" />

        {/* Floating interface panels */}
        <motion.g transform="translate(55 83) rotate(-7 78 43)" animate={{ y: [0, -9, 0], rotate: [-7, -5, -7] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}>
          <rect width="156" height="88" rx="15" fill="var(--ill-surface)" stroke="var(--ill-border)" strokeWidth="1.5" />
          <rect x="17" y="17" width="52" height="7" rx="3.5" fill="var(--ill-ink)" opacity=".78" />
          <rect x="17" y="34" width="112" height="5" rx="2.5" fill="var(--ill-line-soft)" />
          <rect x="17" y="47" width="82" height="5" rx="2.5" fill="var(--ill-line-soft)" />
          <path d="M19 72l17-12 14 5 19-18 17 10" stroke="var(--ill-point)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        <motion.g transform="translate(287 72) rotate(8 62 38)" animate={{ y: [0, 8, 0], rotate: [8, 10, 8] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: .5 }}>
          <rect width="126" height="78" rx="15" fill="var(--ill-panel)" stroke="var(--ill-border)" strokeWidth="1.5" />
          <rect x="17" y="17" width="38" height="7" rx="3.5" fill="var(--ill-ink)" opacity=".7" />
          <rect x="17" y="37" width="12" height="23" rx="4" fill="var(--ill-point)" opacity=".55" />
          <rect x="37" y="29" width="12" height="31" rx="4" fill="var(--ill-point)" opacity=".78" />
          <rect x="57" y="21" width="12" height="39" rx="4" fill="var(--ill-point-alt)" />
          <rect x="77" y="39" width="12" height="21" rx="4" fill="var(--ill-line)" />
        </motion.g>

        {/* Layered platform */}
        <path d="M112 237l128-69 128 69-128 70-128-70Z" fill="var(--ill-tint)" stroke="var(--ill-border)" strokeWidth="1.5" />
        <path d="M112 237v26l128 72v-28l-128-70Z" fill="var(--ill-line-soft)" opacity=".65" />
        <path d="M368 237v26l-128 72v-28l128-70Z" fill="var(--ill-line)" opacity=".45" />
        <motion.path d="M145 238l95-51 95 51-95 52-95-52Z" fill="url(#about-platform)" stroke="var(--ill-border)" strokeWidth="1.2" animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />

        {/* Central abstract core: deliberately not a letter or logo */}
        <motion.g animate={{ y: [0, -7, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M240 117l61 35v70l-61 35-61-35v-70l61-35Z" fill="url(#about-core)" opacity=".16" stroke="var(--ill-point)" strokeWidth="1.5" />
        <path d="M240 139l42 24v48l-42 24-42-24v-48l42-24Z" fill="url(#about-core)" stroke="var(--ill-border)" strokeWidth="1.2" />
        <path d="M218 190h44M240 168v44" stroke="var(--ill-surface)" strokeWidth="5" strokeLinecap="round" opacity=".9" />
        <circle cx="240" cy="187" r="10" fill="var(--ill-surface)" opacity=".95" />
        <motion.circle cx="240" cy="187" r="4" fill="var(--ill-point)" animate={{ r: [4, 6, 4], opacity: [1, .65, 1] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }} />
        </motion.g>

        {/* Connected data nodes */}
        <g stroke="var(--ill-line)" strokeWidth="1.8" opacity=".8">
          <path d="M145 145l48 24M336 147l-54 25M153 292l51-38M329 291l-48-37" />
        </g>
        <motion.g fill="var(--ill-point)" animate={{ opacity: [.65, 1, .65] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}>
          <circle cx="145" cy="145" r="6" /><circle cx="336" cy="147" r="6" />
          <circle cx="153" cy="292" r="5" /><circle cx="329" cy="291" r="5" />
        </motion.g>
        <circle cx="91" cy="205" r="4" fill="var(--ill-point-alt)" />
        <circle cx="390" cy="207" r="4" fill="var(--ill-point-alt)" />
        <circle cx="240" cy="45" r="4" fill="var(--ill-point)" />
      </svg>
    </Visual>
  )
}

export function ArchitectureVisual() {
  return (
    <div className="about-vis" role="img" aria-label="Diagram of an application layer connected to a database and a server">
      <svg viewBox="0 0 400 320">
    <g fill="none" stroke="var(--ill-point)" strokeWidth="1.5" opacity=".45"><path d="M200 110v50M200 160H90v40M200 160h110v40"/></g>
    <rect x="130" y="40" width="140" height="70" rx="14" fill="var(--ill-surface)" stroke="var(--ill-border)"/>
    <rect x="148" y="58" width="60" height="8" rx="4" fill="var(--ill-ink)" opacity=".8"/><rect x="148" y="76" width="96" height="6" rx="3" fill="var(--ill-line-soft)"/><rect x="148" y="90" width="70" height="6" rx="3" fill="var(--ill-line-soft)"/>
    <rect x="30" y="200" width="120" height="70" rx="14" fill="var(--ill-surface)" stroke="var(--ill-border)"/>
    <ellipse cx="90" cy="224" rx="26" ry="8" fill="var(--ill-tint)" stroke="var(--ill-point)" strokeWidth="1.5"/><path d="M64 224v22c0 5 12 8 26 8s26-3 26-8v-22" fill="none" stroke="var(--ill-point)" strokeWidth="1.5"/>
    <rect x="250" y="200" width="120" height="70" rx="14" fill="var(--ill-surface)" stroke="var(--ill-border)"/>
    <rect x="272" y="218" width="76" height="12" rx="4" fill="var(--ill-tint-alt)" stroke="var(--ill-point-alt)"/><rect x="272" y="238" width="76" height="12" rx="4" fill="var(--ill-tint-alt)" stroke="var(--ill-point-alt)"/><circle cx="337" cy="224" r="2.5" fill="var(--ill-point-alt)"/><circle cx="337" cy="244" r="2.5" fill="var(--ill-point-alt)"/>
   </svg>
    </div>
  )
}

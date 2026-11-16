// Decorative illustrations per service category (original SVG). Uses gradient #lg from GradientDefs.
const stroke = { fill: 'none', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' }
const art = {
  web: (
    <>
      <rect x="50" y="28" width="220" height="144" rx="12" fill="var(--ill-surface)" stroke="var(--ill-border)" />
      <path d="M50 40a12 12 0 0 1 12-12h196a12 12 0 0 1 12 12v18H50z" fill="var(--ill-panel)" />
      <circle cx="68" cy="43" r="3.5" fill="var(--ill-dot-muted)" /><circle cx="80" cy="43" r="3.5" fill="var(--ill-dot-muted)" />
      <rect x="68" y="76" width="70" height="8" rx="4" fill="var(--ill-ink)" opacity=".8" />
      <rect x="68" y="92" width="110" height="6" rx="3" fill="var(--ill-line-soft)" />
      <path d="M68 152l26-26 22 14 30-34 34 24" stroke="var(--ill-point)" {...stroke} />
      <rect x="204" y="72" width="50" height="86" rx="8" fill="url(#lg)" />
    </>
  ),
  infrastructure: (
    <>
      {[30, 80, 130].map((y) => (
        <g key={y}>
          <rect x="40" y={y} width="170" height="40" rx="10" fill="var(--ill-surface)" stroke="var(--ill-border)" />
          <rect x="56" y={y + 16} width="70" height="8" rx="4" fill="var(--ill-line-soft)" />
          <circle cx="182" cy={y + 20} r="4.5" fill="var(--ill-point)" /><circle cx="196" cy={y + 20} r="4.5" fill="var(--ill-point-alt)" />
        </g>
      ))}
      <path d="M210 50h24v50M210 100h24M210 150h24v-50" stroke="var(--ill-point)" opacity=".45" {...stroke} strokeWidth="2" />
      <circle cx="264" cy="100" r="28" fill="url(#lg)" />
      <path d="M252 104h24M258 94h12" stroke="var(--ill-surface)" {...stroke} strokeWidth="3" />
    </>
  ),
  custom: (
    <>
      <path d="M90 100h40M190 70l30 30M190 130l30-30M130 100l30-40M130 100l30 40" stroke="var(--ill-point)" opacity=".45" {...stroke} strokeWidth="2" />
      <rect x="30" y="78" width="60" height="44" rx="10" fill="var(--ill-surface)" stroke="var(--ill-border)" />
      <rect x="130" y="38" width="60" height="44" rx="10" fill="var(--ill-surface)" stroke="var(--ill-border)" />
      <rect x="130" y="118" width="60" height="44" rx="10" fill="var(--ill-surface)" stroke="var(--ill-border)" />
      <rect x="226" y="78" width="64" height="44" rx="10" fill="url(#lg)" />
      <path d="M44 100h30M144 60h30M144 140h20" stroke="var(--ill-line-soft)" {...stroke} strokeWidth="4" />
      <path d="M244 100l8 8 16-16" stroke="var(--ill-surface)" {...stroke} />
    </>
  ),
  support: (
    <>
      <circle cx="160" cy="84" r="50" fill="var(--ill-surface)" stroke="var(--ill-border)" />
      <circle cx="160" cy="84" r="34" fill="url(#lg)" opacity=".12" />
      <path d="M144 86l12 12 22-26" stroke="var(--ill-point)" {...stroke} strokeWidth="5" />
      <path d="M24 170h86l12-26 22 44 16-18h126" stroke="var(--ill-point-alt)" {...stroke} strokeWidth="2.5" />
    </>
  ),
}

export default function ServiceArt({ id }) {
  return (
    <div className="art" aria-hidden="true">
      <svg viewBox="0 0 320 200" focusable="false">{art[id] || art.web}</svg>
    </div>
  )
}

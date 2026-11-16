// Defines the warm metallic brand gradient used by the NORMVIS mark.
export default function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--ill-gradient-start)" />
          <stop offset="1" stopColor="var(--ill-gradient-end)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

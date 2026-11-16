import { Link } from 'react-router-dom'

export default function Brand() {
  return (
    <Link className="brand" to="/" aria-label="NORMVIS home">
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path className="brand-mark-bg" d="M16 2 28 9v14l-12 7L4 23V9z" />
        <path className="brand-mark-letter" d="M10 21V11l12 10V11" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="brand-word"><span className="brand-n">N</span><span className="brand-orm">ORM</span><span className="brand-vis">VIS</span></span>
    </Link>
  )
}

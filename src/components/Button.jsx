import { Link } from 'react-router-dom'

// variant: primary | ghost | white. Hash targets ("#contact") scroll within the current page.
export default function Button({ to, variant = 'primary', size, className, children, ...rest }) {
  const cls = ['btn', `btn-${variant}`, size === 'sm' && 'btn-sm', className].filter(Boolean).join(' ')
  return <Link {...rest} className={cls} to={to}>{children}</Link>
}

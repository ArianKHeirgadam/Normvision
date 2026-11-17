"use client"

import { Plus } from 'lucide-react'

/**
 * Responsive wordmark footer adapted to nORMvis's React + CSS codebase.
 * Link columns are visible on desktop and collapsible on small screens.
 */
export function WordmarkFooter({
  name = 'NORMVISION',
  legalName,
  year = new Date().getFullYear(),
  description,
  status,
  navLabel = 'Footer',
  columns = [],
  email,
  credit,
  rightsText = 'All rights reserved.',
  className = '',
  ...props
}) {
  return (
    <footer className={`wordmark-footer ${className}`.trim()} {...props}>
      <div className="wordmark-footer-inner">
        <div className="wordmark-footer-main">
          <div className="wordmark-footer-brand">
            <a className="wordmark-footer-name" href="/" aria-label={`${name} home`}>
              {name}
            </a>
            {description && <p className="wordmark-footer-description">{description}</p>}
            {status && (
              <p className="wordmark-footer-status">
                <span aria-hidden="true" />
                {status}
              </p>
            )}
          </div>

          <nav aria-label={navLabel} className="wordmark-footer-desktop-nav">
            {columns.map((column) => (
              <div className="wordmark-footer-column" key={column.title}>
                <h2>{column.title}</h2>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <nav aria-label={navLabel} className="wordmark-footer-mobile-nav">
            {columns.map((column) => (
              <details className="wordmark-footer-disclosure" key={column.title}>
                <summary>
                  <span>{column.title}</span>
                  <Plus aria-hidden="true" size={17} strokeWidth={1.7} />
                </summary>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </nav>
        </div>

        <div className="wordmark-footer-legal">
          <p>© {year} {legalName || name}. {rightsText}</p>
          {email && <a href={`mailto:${email}`}>{email}</a>}
          {credit && <a className="wordmark-footer-credit" href={credit.href}>{credit.label}</a>}
        </div>
      </div>

      <p className="wordmark-footer-oversized" aria-hidden="true">{name}</p>
    </footer>
  )
}

export default WordmarkFooter

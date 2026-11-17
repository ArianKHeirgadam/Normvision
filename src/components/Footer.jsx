import WordmarkFooter from './ui/wordmark-footer.jsx'
import { nav, services } from '../data/content.js'
import { useLocale } from '../i18n.jsx'

export default function Footer() {
  const { t } = useLocale()

  const columns = [
    {
      title: t('Navigate'),
      links: nav.map((item) => ({ label: t(item.label), href: item.to })),
    },
    {
      title: t('Services'),
      links: services.map((service) => ({ label: t(service.label), href: '/services' })),
    },
    {
      title: t('Contact'),
      links: [{ label: t('Get in Touch'), href: '/contact' }],
    },
  ]

  return (
    <WordmarkFooter
      name="NORMVISION"
      legalName="NORMVISION"
      year={new Date().getFullYear()}
      description={t('Software engineering and IT solutions: web applications, infrastructure, custom software, and ongoing support.')}
      navLabel={t('Footer navigation')}
      columns={columns}
      rightsText={t('All rights reserved.')}
    />
  )
}

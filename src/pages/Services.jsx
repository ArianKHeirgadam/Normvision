
import { useEffect, useState } from 'react'

import Hero from '../components/Hero.jsx'
import Section from '../components/Section.jsx'
import SectionHead from '../components/SectionHead.jsx'
import Button from '../components/Button.jsx'
import ServiceDetail from '../components/ServiceDetail.jsx'
import Steps from '../components/Steps.jsx'
import WhyGrid from '../components/WhyGrid.jsx'
import CtaBand from '../components/CtaBand.jsx'

import { ServicesVisual } from '../components/visuals.jsx'

import usePageMeta from '../hooks/usePageMeta.js'
import { useLocale } from '../i18n.jsx'

import {
  services as fallbackServices,
  serviceSteps,
  serviceWhy,
} from '../data/content.js'

import {
  getServices,
  localizeService,
} from '../lib/api.js'

export default function Services() {
  const { t, isFa } = useLocale()

  const [services, setServices] = useState(fallbackServices)
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadServices() {
      try {
        setLoading(true)
        setApiError(false)

        const response = await getServices({
          signal: controller.signal,
        })

        if (!Array.isArray(response)) {
          throw new Error('Invalid services API response.')
        }

        const localizedServices = response.map((item) => {
          const localized = localizeService(item, isFa)

          const fallback = fallbackServices.find(
            (service) => service.id === item.category
          )

          return {
            ...fallback,
            id: item.category,
            title: localized.title,
            long: localized.short_description,
            detail: localized.description || fallback?.detail || '',
            items: localized.features || fallback?.items || [],
          }
        })

        if (!controller.signal.aborted) {
          setServices(localizedServices)
        }
      } catch (error) {
        if (error.name === 'AbortError') return

        console.error('Failed to load services:', error)

        if (!controller.signal.aborted) {
          setServices(fallbackServices)
          setApiError(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadServices()

    return () => controller.abort()
  }, [isFa])

  usePageMeta(
    'Services | nORMvis',
    'Web application development, server and infrastructure management, custom software and technical support from nORMvis.'
  )

  return (
    <>
      <Hero
        page
        title={t('Technology Solutions Designed Around Your Business.')}
        lead={t(
          'From custom web applications to reliable infrastructure, we deliver technology solutions that help businesses operate efficiently, grow confidently, and stay ahead.'
        )}
        actions={
          <>
            <Button to="/contact">
              {t('Discuss Your Project')}
            </Button>

            <Button variant="ghost" to="#what">
              {t('Explore Our Expertise')}
            </Button>
          </>
        }
        visual={<ServicesVisual />}
      />

      <Section id="what" style={{ paddingTop: 0 }}>
        <SectionHead
          title={t('What We Do')}
          lead={t(
            'Comprehensive technology services built to support your business at every stage.'
          )}
        />

        {loading ? (
          <div className="services-loading" role="status">
            {t('Loading services...')}
          </div>
        ) : services.length > 0 ? (
          services.map((service, index) => (
            <ServiceDetail
              key={service.id}
              number={String(index + 1).padStart(2, '0')}
              {...service}
            />
          ))
        ) : (
          <div className="services-empty">
            {t('No services are currently available.')}
          </div>
        )}

        {apiError && (
          <p className="services-notice" role="status">
            {t(
              'Unable to connect to the server. Showing available default content.'
            )}
          </p>
        )}
      </Section>

      <Section className="tech">
        <SectionHead
          title={t('Built on a Thoughtful Engineering Process.')}
        />
        <Steps items={serviceSteps} />
      </Section>

      <Section>
        <SectionHead
          title={t('Technology That Works for Your Business.')}
          max="20ch"
        />
        <WhyGrid items={serviceWhy} />
      </Section>

      <CtaBand
        title={t('Let’s Find the Right Solution for Your Business.')}
        text={t(
          "Tell us what you’re building, improving, or maintaining. Let’s explore how nORMvis can help."
        )}
        label={t('Start a Project')}
      />
    </>
  )
}

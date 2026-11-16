
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000/api/v1'
).replace(/\/+$/, '')

/**
 * Base API request handler
 */
async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...options.headers,
    },
  })

  const contentType = response.headers.get('content-type') || ''

  const payload = contentType.includes('application/json')
    ? await response.json().catch(() => ({}))
    : await response.text().catch(() => '')

  if (!response.ok) {
    const message =
      payload?.detail ||
      payload?.message ||
      (typeof payload === 'string' && payload) ||
      'The request could not be completed.'

    const error = new Error(message)

    error.status = response.status
    error.payload = payload

    throw error
  }

  return payload
}

/**
 * Services
 */
export function getServices({ signal } = {}) {
  return request('/services/', { signal })
}

/**
 * Projects
 */
export function getProjects({ category = 'all', signal } = {}) {
  const query =
    category && category !== 'all'
      ? `?category=${encodeURIComponent(category)}`
      : ''

  return request(`/projects/${query}`, { signal })
}

export function getProject(slug, { signal } = {}) {
  return request(`/projects/${encodeURIComponent(slug)}/`, {
    signal,
  })
}

/**
 * Contact
 */
export function sendContactInquiry(data) {
  return request('/contact/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Project localization
 */
export function localizeProject(project, isFa) {
  return {
    ...project,

    title: isFa
      ? project.title_fa || project.title
      : project.title,

    summary: isFa
      ? project.summary_fa || project.summary
      : project.summary,

    overview: isFa
      ? project.overview_fa || project.overview
      : project.overview,

    highlights: isFa
      ? project.highlights_fa?.length
        ? project.highlights_fa
        : project.highlights
      : project.highlights,

    tags: project.technologies || project.tags || [],
  }
}

/**
 * Service localization
 */
export function localizeService(service, isFa) {
  return {
    ...service,

    title: isFa
      ? service.title_fa || service.title
      : service.title,

    short_description: isFa
      ? service.short_description_fa || service.short_description
      : service.short_description,

    description: isFa
      ? service.description_fa || service.description
      : service.description,

    features: isFa
      ? service.features_fa?.length
        ? service.features_fa
        : service.features
      : service.features,
  }
}

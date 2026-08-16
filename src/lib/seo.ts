export const siteOrigin = 'https://awanfiq.xyz'
export const siteName = 'Wan Afiq'

export const homeTitle = 'Wan Afiq — Platform & Backend Software Engineer'
export const homeDescription =
  'Portfolio of Wan Afiq, a software engineer specializing in reliable platform and backend systems with TypeScript, Node.js, Go, AWS, Kubernetes, and observability.'
export const analyticsTitle = 'Visitor Analytics — Wan Afiq'

export function absoluteUrl(path: string): string {
  return new URL(path, siteOrigin).toString()
}

export const homeUrl = absoluteUrl('/')
export const analyticsUrl = absoluteUrl('/analytics')
export const ogImageUrl = absoluteUrl('/og-wan-afiq.jpg')
export const themeColor = '#0f172a'

export const profileUrls = {
  github: 'https://github.com/wannfq',
  linkedin: 'https://www.linkedin.com/in/wannfq',
  x: 'https://x.com/thewanafiq',
} as const

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteName,
  url: homeUrl,
  image: ogImageUrl,
  jobTitle: 'Software Engineer',
  description: homeDescription,
  sameAs: [profileUrls.github, profileUrls.linkedin, profileUrls.x],
  knowsAbout: [
    'TypeScript',
    'Node.js',
    'Go',
    'AWS',
    'Kubernetes',
    'OpenTelemetry',
    'Datadog',
  ],
}

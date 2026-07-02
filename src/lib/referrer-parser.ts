import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandStackoverflow,
  IconBrandX,
  IconBrandYoutube,
  IconGlobe,
} from '@tabler/icons-react'
import type { IconProps } from '@tabler/icons-react'
import type { ReactNode } from 'react'

export interface ReferrerBrand {
  name: string
  icon: (props: IconProps) => ReactNode
  domains: Array<string>
}

export const REFERRER_BRANDS: Array<ReferrerBrand> = [
  {
    name: 'X',
    icon: IconBrandX,
    domains: ['twitter.com', 'x.com', 't.co'],
  },
  {
    name: 'LinkedIn',
    icon: IconBrandLinkedin,
    domains: ['linkedin.com'],
  },
  {
    name: 'Google',
    icon: IconBrandGoogle,
    domains: ['google.com', 'google.co.uk', 'google.fr', 'google.de'],
  },
  {
    name: 'GitHub',
    icon: IconBrandGithub,
    domains: ['github.com'],
  },
  {
    name: 'Facebook',
    icon: IconBrandFacebook,
    domains: ['facebook.com', 'fb.com'],
  },
  {
    name: 'YouTube',
    icon: IconBrandYoutube,
    domains: ['youtube.com', 'youtu.be'],
  },
  {
    name: 'Reddit',
    icon: IconBrandReddit,
    domains: ['reddit.com', 'redd.it'],
  },
  {
    name: 'Stack Overflow',
    icon: IconBrandStackoverflow,
    domains: ['stackoverflow.com'],
  },
]

export function getReferrerBrand(domain: string | null): ReferrerBrand | null {
  if (!domain) {
    return null
  }
  return (
    REFERRER_BRANDS.find((brand) =>
      brand.domains.includes(domain.toLowerCase()),
    ) || null
  )
}

export function getReferrerIcon(domain: string | null) {
  const brand = getReferrerBrand(domain)
  return brand?.icon || IconGlobe
}

export function getReferrerName(domain: string | null): string {
  const brand = getReferrerBrand(domain)
  if (brand) {
    return `${brand.name} (${domain})`
  }
  if (!domain) {
    return 'Unknown'
  }
  return domain
}

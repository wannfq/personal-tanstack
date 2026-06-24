import { createFileRoute } from '@tanstack/react-router'
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMapPin,
  IconSparkles,
} from '@tabler/icons-react'
import profile256Avif from '@/assets/profile/profile-256.avif?url'
import profile512Avif from '@/assets/profile/profile-512.avif?url'
import profile256Jpg from '@/assets/profile/profile-256.jpg?url'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    links: [
      {
        rel: 'preload',
        as: 'image',
        href: profile256Avif,
        type: 'image/avif',
        imagesrcset: `${profile256Avif} 256w, ${profile512Avif} 512w`,
        imagesizes: '144px',
        fetchpriority: 'high',
      },
    ],
  }),
})

const skills = [
  'TypeScript',
  'Go',
  'GitOps',
  'AWS Architecture',
  'Kubernetes',
  'Platform Engineering',
  'Observability',
]

const experiences = [
  {
    company: 'SEEK',
    role: 'Senior Software Engineer',
    period: 'Sep 2021 – Present',
    location: 'Kuala Lumpur, Malaysia',
    summary:
      'Leading the migration to a unified third-party job posting service spanning JobStreet and SEEK while enabling dependable developer tooling.',
    highlights: [
      'Planned, developed and migrated the unified third-party job posting platform that serves JobStreet and SEEK marketplaces.',
      'Maintains and improves AWS account management tooling adopted across SEEK to keep teams compliant and productive.',
      'Facilitates SEEK\u2019s graduate program and contributes to the organisation\u2019s new ownership solution.',
    ],
  },
  {
    company: 'SEEK',
    role: 'Software Engineer',
    period: 'Oct 2020 – Sep 2021',
    location: 'Kuala Lumpur, Malaysia',
    summary:
      'Maintained the architecture for the third-party job posting service and delivered a modernised version with improved engineering practices.',
    highlights: [
      'Rebuilt the third-party job posting service with a modern stack and resilient patterns.',
      'Partnered with cross-functional teams to uphold service reliability during migration phases.',
      'Documented architecture decisions to accelerate onboarding and knowledge transfer.',
    ],
  },
  {
    company: 'TribeHired',
    role: 'Software Engineer',
    period: 'Nov 2018 – Sep 2020',
    location: 'Kuala Lumpur, Malaysia',
    summary:
      'Collaborated with architecture and product to evolve the hiring platform while steering the organisation toward modern engineering workflows.',
    highlights: [
      'Designed, developed and deployed backend services alongside front-end applications serving recruitment workflows.',
      'Refactored legacy code bases using sound programming principles and design patterns.',
      'Migrated monolith components into a microservices architecture and established quality, test and deployment pipelines.',
    ],
  },
  {
    company: 'Rocket Integration Technology',
    role: 'Full Stack Developer',
    period: 'Apr 2017 – Nov 2018',
    location: 'Selangor, Malaysia',
    summary:
      'Built and maintained bespoke digital products for clients spanning talent platforms, fintech and enterprise operations.',
    highlights: [
      'Delivered end-to-end web applications for talent search, cryptocurrency wallet, cloud mining and exchange use cases.',
      'Implemented management systems for forex brokerage and ERP operations tailored to client workflows.',
      'Provided ongoing enhancements to ensure scalability and maintainability across custom solutions.',
    ],
  },
]

const contactLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/wannfq',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/wannfq',
  },
  {
    label: 'X',
    href: 'https://x.com/thewanafiq',
  },
]

function HomePage() {
  return (
    <div className="bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-32 px-6 pt-16 pb-24 sm:px-10 lg:px-12">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
      <div className="flex flex-col gap-6">
        <h1 className="text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
          Wan Afiq
        </h1>
        <p className="text-lg text-muted-foreground">Software Engineer</p>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          I build backend systems and developer tools. Comfortable across
          stacks, focused on reliability.
        </p>
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <IconMapPin className="size-4" aria-hidden="true" />
          Kuala Lumpur, Malaysia
        </span>
        <p className="text-sm text-muted-foreground">{skills.join(' \u00B7 ')}</p>
      </div>

      <div className="relative mr-12">
        <div className="size-28 overflow-hidden rounded-full ring-2 ring-border sm:size-32 lg:size-36">
          <picture>
            <source
              type="image/avif"
              srcSet={`${profile256Avif} 256w, ${profile512Avif} 512w`}
              sizes="144px"
            />
            <img
              src={profile256Jpg}
              alt="Wan Afiq"
              width={144}
              height={144}
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover grayscale"
            />
          </picture>
          <div className="absolute inset-0 rounded-full bg-primary/20 mix-blend-overlay" />
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="space-y-10">
      <header>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          About Me
        </h2>
      </header>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Backend, frontend, infrastructure. Just trying to build reliable
            systems.
          </p>
          <p className="text-muted-foreground">
            Simple when possible, robust when needed. I build for scale and
            teams that actually use what I make.
          </p>
          <p className="text-muted-foreground">
            Studied Naval Architecture, switched to software. That background
            taught me to think in systems.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <IconSparkles className="size-5 text-primary" aria-hidden="true" />
            Interests
          </h3>
          <p className="text-sm text-muted-foreground">
            Always exploring new tools and frameworks. Currently working with AI
            tooling, Kubernetes, and TanStack.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              — Experimenting with Linux distros and customizing my development
              environment. Check out my{' '}
              <a
                href="https://github.com/wannfq/dotfiles"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
              >
                dotfiles
              </a>
              .
            </li>
            <li>— Building custom mechanical keyboards as a hands-on hobby.</li>
            <li>— Walking around, doing photography.</li>
            <li>— Unwinding with music, gaming, movies and anime shows.</li>
          </ul>
        </div>
      </div>

      <p className="text-sm italic text-muted-foreground">
        This site is built with TanStack Start and React. You can view the
        source on{' '}
        <a
          href="https://github.com/wannfq/personal-tanstack"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
        >
          GitHub
        </a>
        .
      </p>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" className="space-y-10">
      <header>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          My Experience
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          A snapshot of the platforms, products and engineering practices I have
          shaped across marketplace, recruitment and bespoke software domains.
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {experiences.map((experience, index) => (
          <article
            key={`${experience.company}-${experience.role}-${experience.period}`}
            className={index !== 0 ? 'border-t border-border pt-12' : ''}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-lg font-semibold">{experience.role}</h3>
              <span className="text-sm text-muted-foreground">
                {experience.period}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {experience.company}
              {experience.location ? ` \u00B7 ${experience.location}` : ''}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {experience.summary}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {experience.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="space-y-10">
      <header>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Contact Me
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Open to backend work, infrastructure, or mentoring. I&apos;ll get back
          to you within a couple days.
        </p>
      </header>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Talk to me about platform engineering, resilient systems, dev tooling,
          or AI.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {contactLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import {
  IconArrowRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMapPin,
  IconSparkles,
} from '@tabler/icons-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import profilePicture from '@/assets/profile-picture-afiq.jpg'

export const Route = createFileRoute('/')({
  component: HomePage,
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
      'Facilitates SEEK’s graduate program and contributes to the organisation’s new ownership solution.',
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
    icon: IconBrandLinkedin,
    href: 'https://www.linkedin.com/in/wannfq',
  },
  {
    label: 'GitHub',
    icon: IconBrandGithub,
    href: 'https://github.com/wannfq',
  },
  {
    label: 'X',
    icon: IconBrandX,
    href: 'https://x.com/thewanafiq',
  },
]

function HomePage() {
  return (
    <div className="bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pt-12 pb-20 sm:px-10 lg:px-12">
        <HeroSection />
        <Separator className="bg-border/40" />
        <AboutSection />
        <Separator className="bg-border/40" />
        <ExperienceSection />
        <Separator className="bg-border/40" />
        <ContactSection />
      </main>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="grid gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <p className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Hi, I&apos;m <span className="text-primary">Wan Afiq</span>
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span
                className="hidden h-0.5 w-8 rounded-full bg-primary/40 lg:inline-block"
                aria-hidden="true"
              />
              <span className="hidden text-xs uppercase tracking-[0.3em] text-muted-foreground/80 lg:inline">
                Software Engineer
              </span>
            </div>

            <p className="py-4 text-base text-muted-foreground sm:text-lg">
              I build backend systems and developer tools. Comfortable across
              stacks, focused on reliability.
            </p>

            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1">
              <IconMapPin className="size-4" aria-hidden="true" />
              Kuala Lumpur, Malaysia • Hybrid / Remote
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="rounded-full text-xs font-medium"
            >
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href="#experience"
            className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}
          >
            View Experience
            <IconArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className={cn(buttonVariants({ size: 'lg' }))}
          >
            Contact
          </a>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="relative flex size-full items-center justify-center overflow-hidden bg-background/90 shadow-inner">
          <img
            src={profilePicture}
            alt="Wan Afiq"
            className="size-full object-cover grayscale"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-primary/10 mix-blend-color"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="space-y-12">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          About Me
        </h2>
      </header>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-8">
          <p className="text-muted-foreground">
            Backend, frontend, infrastructure. Just trying to build reliable systems.
          </p>
          <p className="text-muted-foreground">
            Simple when possible, robust when needed. I build for scale and teams that actually use what I make.
          </p>
          <p className="text-muted-foreground">
            Studied Naval Architecture, switched to software. That background taught me to think in systems.
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <IconSparkles
                className="size-5 text-primary"
                aria-hidden="true"
              />
              Interests
            </CardTitle>
            <CardDescription>
              Always exploring new tools. Currently: AI tooling, Kubernetes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Always exploring new tools and frameworks. Currently working with AI tooling, Kubernetes, and TanStack.
            </p>
            <ul className="grid gap-2">
              <li className="flex items-start gap-2">
                <span
                  className="mt-1 size-2 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <span>
                  Experimenting with Linux distros and customizing my
                  development environment. Check out my{' '}
                  <a
                    href="https://github.com/wannfq/dotfiles"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    dotfiles
                  </a>
                  !
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-1 size-2 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <span>
                  Building custom mechanical keyboards as a hands-on hobby.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-1 size-2 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <span>Unwinding with movies, music, gaming, and anime.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
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
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          My Experience
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          A snapshot of the platforms, products and engineering practices I have
          shaped across marketplace, recruitment and bespoke software domains.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {experiences.map((experience) => (
          <Card
            key={`${experience.company}-${experience.role}-${experience.period}`}
            className="group h-full transition-all hover:shadow-lg"
          >
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-lg font-semibold">
                  {experience.role}
                </CardTitle>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
                  {experience.period}
                </span>
              </div>
              <CardDescription className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                {experience.company}
                {experience.location ? ` • ${experience.location}` : ''}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>{experience.summary}</p>
              <ul className="grid gap-2">
                {experience.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span
                      className="mt-1 size-2 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}

        <Card
          key="coming-soon"
          className="group h-full transition-all hover:shadow-lg"
        >
          <CardHeader className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <CardTitle className="text-lg font-semibold">
                Coming Soon...
              </CardTitle>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/70"></span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>Stay tuned for more updates!</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="space-y-10">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Contact Me
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Open to backend work, infrastructure, or mentoring. I&apos;ll get back to you within a couple days.
        </p>
      </header>

      <Card>
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground/80 pb-4">
              Let's have a talk
            </p>
            <p className="text-sm text-muted-foreground">
              Talk to me about platform engineering, resilient systems, dev tooling, or AI.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {contactLinks.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={cn(
                  buttonVariants(),
                  'gap-2 rounded-full px-4',
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

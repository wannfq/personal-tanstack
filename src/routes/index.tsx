import { createFileRoute } from '@tanstack/react-router'
import {
  IconArrowRight,
  IconAt,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconMapPin,
  IconPalette,
  IconRocket,
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
    label: 'Email',
    icon: IconMail,
    href: 'mailto:wannfq@gmail.com',
  },
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
]

function HomePage() {
  return (
    <div className="bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12 sm:px-10 lg:px-12">
        <HeroSection />
        <Separator className="bg-border/60" />
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <p className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              👋 Hi, I&apos;m <span className="text-primary">Wan Afiq</span>
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span
                className="hidden h-0.5 w-8 rounded-full bg-primary/60 lg:inline-block"
                aria-hidden="true"
              />
              <span className="hidden text-xs uppercase tracking-[0.3em] text-muted-foreground/80 lg:inline">
                Software Engineer
              </span>
            </div>

            <p className="py-4 text-base text-muted-foreground sm:text-lg">
              Software craftsman and architecture connoisseur building resilient
              systems that solve real business problems.
              Language- and technology-agnostic, I love unifying systems and empowering teams
              with dependable tooling.
            </p>

            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1">
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
              className="rounded-full px-3 py-1 text-xs font-medium"
            >
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#experience"
            className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}
          >
            View Experience
            <IconArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'gap-2',
            )}
          >
            Contact Me
            <IconAt className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="relative flex size-[260px] items-center justify-center rounded-[2.5rem] border border-border/60 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent p-6 shadow-xl sm:size-[320px] md:size-[360px] lg:size-[420px]">
          <div className="absolute inset-3 rounded-[2rem] border border-border/50 bg-background/80 backdrop-blur" />
          <div className="relative flex size-full flex-col items-center justify-center gap-4 rounded-[2rem] border border-border/40 bg-background/90 p-10 text-center shadow-inner">
            <div className="flex size-24 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
              <IconRocket className="size-12" aria-hidden="true" />
            </div>
            <p className="text-sm uppercase tracking-[0.6em] text-muted-foreground/80">
              Platform Engineering
            </p>
            <p className="text-lg font-medium text-muted-foreground">
              Designing unified hiring experiences and developer tooling that
              scale with every marketplace.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="space-y-8">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
          <IconPalette className="size-4" aria-hidden="true" />
          About
        </div>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Crafting systems with intention
        </h2>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-6">
          <p className="text-muted-foreground">
          I build software with a craftsman mindset, pairing architectural rigor
          with an eagerness to explore new technology. My happy place is where
          resilient backend services, thoughtful frontends and reliable
          pipelines meet to create impactful hiring experiences.
        </p>
        <p className="text-muted-foreground">
          From GitOps workflows and Kubernetes automation to cloud-native
          governance in AWS, I look for pragmatic solutions that help teams ship
          faster without compromising quality or trust. I thrive in
          collaborative environments where mentorship and shared ownership are
          core values.
        </p>
        <p className="text-muted-foreground">
          I hold the ICAgile Certified Professional credential and earned a
          Bachelor&apos;s degree in Naval Architecture and Marine Engineering
          from Saint Petersburg State Marine Technical University.
        </p>
      </div>

      <Card className="border-dashed">
        <CardHeader className="space-y-2">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <IconSparkles
              className="size-5 text-primary"
              aria-hidden="true"
            />
            Interests
          </CardTitle>
          <CardDescription>
            Passionate about technology and always exploring what&apos;s next.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            I have a deep passion for technology and love exploring new tools
            and frameworks. Recently, I&apos;ve been tinkering with AI tooling,
            setting up micro Kubernetes clusters, and diving into interesting
            frameworks like TanStack.
          </p>
          <ul className="grid gap-2">
            <li className="flex items-start gap-2">
              <span
                className="mt-1 size-2 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
              <span>
                Experimenting with Linux distros and customizing my development
                environment. Check out my{' '}
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
              <span>Building custom mechanical keyboards as a hands-on hobby.</span>
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
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" className="space-y-6">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
          <IconRocket className="size-4" aria-hidden="true" />
          Experience
        </div>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl gap-4">
          Previous Experience
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          A snapshot of the platforms, products and engineering practices I have
          shaped across marketplace, recruitment and bespoke software domains.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {experiences.map((experience) => (
          <Card
            key={`${experience.company}-${experience.role}-${experience.period}`}
            className="group h-full border-dashed transition-all hover:border-primary/60 hover:shadow-lg"
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
          className="group h-full border-dashed transition-all hover:border-primary/60 hover:shadow-lg"
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
    <section id="contact" className="space-y-6">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
          <IconAt className="size-4" aria-hidden="true" />
          Contact
        </div>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Let&apos;s build something together
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Reach out to collaborate on platforms, developer experience
          initiatives or coaching opportunities. I aim to respond within a
          couple of business days.
        </p>
      </header>

      <Card className="border-dashed">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground/80">
              Let's have a talk
            </p>
            <h3 className="text-2xl font-semibold">wannfq@gmail.com</h3>
            <p className="text-sm text-muted-foreground">
              Happy to chat about platform engineering, resilient architectures,
              developer tooling, or the next frontier in AI technology.
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
                  buttonVariants({ variant: 'outline' }),
                  'gap-2 rounded-full border-dashed px-4',
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

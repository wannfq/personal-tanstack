import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRightIcon,
  AtSignIcon,
  BriefcaseBusinessIcon,
  Github,
  Linkedin,
  MailIcon,
  MapPinIcon,
  PaletteIcon,
  RocketIcon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  'Primary Skill',
  'Secondary Expertise',
  'Favorite Framework',
  'UI Specialty',
  'Key Strength',
  'Passion Project',
]

const projects = [
  {
    title: 'Project Codename One',
    description:
      'Placeholder description that mirrors the original length, spotlighting the problems solved and the measurable outcomes delivered.',
    highlights: ['Placeholder Tech', 'Process Upgrade', 'Key Result'],
  },
  {
    title: 'Project Codename Two',
    description:
      'Use this slot to mention an initiative, the users it served, and the strategic impact you achieved for the business.',
    highlights: ['UI Overhaul', 'Workflow Refresh', 'Team Enablement'],
  },
  {
    title: 'Project Codename Three',
    description:
      'Another space for a flagship effort, ideally matching the tone and length of the original while remaining fully customizable.',
    highlights: ['Scaling Story', 'Automation Win', 'Quality Focus'],
  },
]

const contactLinks = [
  {
    label: 'Email',
    icon: MailIcon,
    href: 'mailto:you@example.com',
  },
  {
    label: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/your-handle',
  },
  {
    label: 'GitHub',
    icon: Github,
    href: 'https://github.com/your-handle',
  },
]

function HomePage() {
  return (
    <div className="bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12 sm:px-10 lg:px-12">
        <HeroSection />
        <Separator className="bg-border/60" />
        <AboutSection />
        <ProjectsSection />
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
              👋 Hi, I&apos;m <span className="text-primary">Your Name</span>
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span
                className="hidden h-0.5 w-8 rounded-full bg-primary/60 lg:inline-block"
                aria-hidden="true"
              />
              <span className="hidden text-xs uppercase tracking-[0.3em] text-muted-foreground/80 lg:inline">
                Role Placeholder
              </span>
            </div>

            <p className="text-base text-muted-foreground sm:text-lg py-4">
              Use this paragraph to summarize your engineering focus, signature
              strengths, and the kinds of products you love to build. Keep the
              copy concise while signaling the impact you create for teams and
              customers.
            </p>

            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1">
              <MapPinIcon className="size-4" aria-hidden="true" />
              Based in Your Location • Availability Placeholder
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
            href="#projects"
            className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}
          >
            View Projects
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'gap-2',
            )}
          >
            Contact Me
            <AtSignIcon className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="relative flex size-[260px] items-center justify-center rounded-[2.5rem] border border-border/60 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent p-6 shadow-xl sm:size-[320px] md:size-[360px] lg:size-[420px]">
          <div className="absolute inset-3 rounded-[2rem] border border-border/50 bg-background/80 backdrop-blur" />
          <div className="relative flex size-full flex-col items-center justify-center gap-4 rounded-[2rem] border border-border/40 bg-background/90 p-10 text-center shadow-inner">
            <div className="flex size-24 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
              <RocketIcon className="size-12" aria-hidden="true" />
            </div>
            <p className="text-sm uppercase tracking-[0.6em] text-muted-foreground/80">
              Title Placeholder
            </p>
            <p className="text-lg font-medium text-muted-foreground">
              Replace this sentence with a quick promise about the type of
              experience or transformation you deliver to clients and teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section
      id="about"
      className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start"
    >
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
          <PaletteIcon className="size-4" aria-hidden="true" />
          About
        </div>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Crafting systems with intention
        </h2>
        <p className="text-muted-foreground">
          Swap in a brief narrative about your journey, preferred stack, or
          leadership style. Keep the tone professional, mirror the length of the
          original copy, and make it easy to personalize later.
        </p>
        <p className="text-muted-foreground">
          Add another paragraph for side interests, ongoing experiments, or
          speaking topics. This helps visitors understand the breadth of your
          interests without committing to real details yet.
        </p>
      </div>

      <Card className="border-dashed">
        <CardHeader className="space-y-2">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <BriefcaseBusinessIcon
              className="size-5 text-primary"
              aria-hidden="true"
            />
            Currently
          </CardTitle>
          <CardDescription>
            Placeholder title for your present role, team, or focus area
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            Use this space to describe day-to-day responsibilities, big-picture
            goals, or how you measure success. Keep the phrasing flexible so you
            can substitute real experience with minimal edits.
          </p>
          <ul className="grid gap-2">
            <li className="flex items-center gap-2">
              <span
                className="size-2 rounded-full bg-primary"
                aria-hidden="true"
              />
              Placeholder bullet highlighting an ongoing initiative or metric
            </li>
            <li className="flex items-center gap-2">
              <span
                className="size-2 rounded-full bg-primary"
                aria-hidden="true"
              />
              Another bullet ready for an achievement, leadership moment, or
              platform milestone
            </li>
            <li className="flex items-center gap-2">
              <span
                className="size-2 rounded-full bg-primary"
                aria-hidden="true"
              />
              Final bullet for a culture impact, mentoring win, or process tweak
            </li>
          </ul>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground/80">
          Previously at Placeholder Company A, Placeholder Company B,
          Placeholder Company C
        </CardFooter>
      </Card>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="space-y-6">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
          <RocketIcon className="size-4" aria-hidden="true" />
          Projects
        </div>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Selected work
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Introduce the kinds of projects you plan to feature—think product
          launches, DevEx upgrades, or platform initiatives that match the
          structure of the original example.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="group h-full border-dashed transition-all hover:border-primary/60 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg font-semibold">
                {project.title}
                <span className="inline-flex items-center gap-1 text-xs font-normal text-primary">
                  Case Study
                  <ArrowRightIcon className="size-3" aria-hidden="true" />
                </span>
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {project.highlights.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-[0.7rem]"
                >
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="space-y-6">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
          <AtSignIcon className="size-4" aria-hidden="true" />
          Contact
        </div>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Let&apos;s build something together
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Encourage visitors to reach out with a sentence that approximates the
          original length while leaving room for real details once available.
        </p>
      </header>

      <Card className="border-dashed">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground/80">
              Start a conversation
            </p>
            <h3 className="text-2xl font-semibold">you@example.com</h3>
            <p className="text-sm text-muted-foreground">
              Mention expected response times, preferred engagement models, or
              anything else prospects should know before contacting you.
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

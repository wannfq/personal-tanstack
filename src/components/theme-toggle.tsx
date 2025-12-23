import * as React from 'react'

import { IconMoon, IconSun } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'theme'

type Theme = 'light' | 'dark'

const ensureThemeClass = (theme: Theme) => {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof document === 'undefined') {
      return 'dark'
    }

    return document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light'
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
    const nextTheme = stored ?? theme

    setTheme(nextTheme)
    ensureThemeClass(nextTheme)
  }, [])

  const handleToggle = React.useCallback(() => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'

    setTheme(nextTheme)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextTheme)
    }

    ensureThemeClass(nextTheme)
  }, [theme])

  const icon =
    theme === 'dark' ? (
      <IconSun className="size-5" aria-hidden="true" />
    ) : (
      <IconMoon className="size-5" aria-hidden="true" />
    )

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      aria-label={`Activate ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onClick={handleToggle}
      className="h-10 w-10 rounded-full border border-border/60 bg-background/80 p-2.5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/40"
    >
      {icon}
      <span className="sr-only">
        Enable {theme === 'dark' ? 'light' : 'dark'} theme
      </span>
    </Button>
  )
}

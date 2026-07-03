import { useEffect, useState } from 'react'

interface ThemeColor {
  colorRGB: { r: number; g: number; b: number }
  isDarkMode: boolean
}

export function useThemeColor(): ThemeColor {
  const [colorRGB, setColorRGB] = useState({ r: 20, g: 184, b: 166 }) // Default teal
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setIsDarkMode(isDark)

      // Create a canvas to convert any color format to RGB
      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Create temp element to get the computed color
      const temp = document.createElement('div')
      temp.style.color = 'hsl(var(--primary))'
      document.body.appendChild(temp)
      const computed = getComputedStyle(temp).color
      document.body.removeChild(temp)

      // Draw the color to canvas and read it back as RGB
      ctx.fillStyle = computed
      ctx.fillRect(0, 0, 1, 1)
      const imageData = ctx.getImageData(0, 0, 1, 1).data

      if (imageData[0] !== 0 || imageData[1] !== 0 || imageData[2] !== 0) {
        setColorRGB({ r: imageData[0], g: imageData[1], b: imageData[2] })
      }
    }

    updateTheme()

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return { colorRGB, isDarkMode }
}

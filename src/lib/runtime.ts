/**
 * Runtime detection utilities
 * Detects if running on Bun or Node.js runtime
 */

// Bun global type declaration
declare const Bun: { version: string } | undefined

export interface RuntimeInfo {
  name: 'bun' | 'node'
  version: string
}

/**
 * Detect if running on Bun runtime
 * Uses Bun-specific globals and process.versions
 */
export function isBunRuntime(): boolean {
  return (
    typeof Bun !== 'undefined' ||
    (process.versions as { bun?: string }).bun !== undefined
  )
}

/**
 * Get runtime information for debugging
 * Returns runtime name and version
 */
export function getRuntimeInfo(): RuntimeInfo {
  if (typeof Bun !== 'undefined') {
    return { name: 'bun', version: Bun.version }
  }
  const bunVersion = (process.versions as { bun?: string }).bun
  if (bunVersion) {
    return { name: 'bun', version: bunVersion }
  }
  return { name: 'node', version: process.version }
}

/**
 * Log runtime information to console
 * Useful for debugging deployment configurations
 */
export function logRuntimeInfo(): void {
  const info = getRuntimeInfo()
  if (info.name === 'bun') {
    console.log('Running on Bun:', info.version)
  } else {
    console.warn('Warning: Not running on Bun runtime!', info)
  }
}

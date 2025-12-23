/**
 * Generate or retrieve a persistent session ID
 * This ensures we can track user sessions across page views
 */
export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') {
    return ''
  }

  let sessionId = localStorage.getItem('session_id')

  // Check if session expired (30 minutes of inactivity)
  if (sessionId) {
    const lastActive = localStorage.getItem('session_last_active')
    if (lastActive) {
      const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000
      if (parseInt(lastActive) < thirtyMinutesAgo) {
        // Session expired, create new one
        sessionId = null
      }
    }
  }

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    localStorage.setItem('session_id', sessionId)
  }

  localStorage.setItem('session_last_active', Date.now().toString())
  return sessionId
}

/**
 * Get a persistent unique visitor ID
 * This stays the same across all sessions from the same browser
 */
export function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') {
    return ''
  }

  let visitorId = localStorage.getItem('visitor_id')

  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    localStorage.setItem('visitor_id', visitorId)
  }

  return visitorId
}

export function getSessionInfo() {
  return {
    session_id: getOrCreateSessionId(),
    visitor_id: getOrCreateVisitorId(),
  }
}

export const COOKIE_CONSENT_NAME = 'fipl_cookie_consent'
export const COOKIE_CONSENT_VERSION = 1
export const COOKIE_CONSENT_MAX_AGE_DAYS = 180
export const COOKIE_CONSENT_EVENT = 'fipl-cookie-consent-change'
export const COOKIE_PREFERENCES_OPEN_EVENT = 'fipl-open-cookie-preferences'

export type CookieCategory = 'analytics' | 'marketing'

export interface CookieConsentState {
  version: number
  necessary: true
  analytics: boolean
  marketing: boolean
  updatedAt: string
}

export function createConsentState(
  preferences: Partial<Record<CookieCategory, boolean>>,
): CookieConsentState {
  return {
    version: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics: preferences.analytics ?? false,
    marketing: preferences.marketing ?? false,
    updatedAt: new Date().toISOString(),
  }
}

export function readCookieConsent(): CookieConsentState | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_CONSENT_NAME}=([^;]*)`))
  if (!match) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as CookieConsentState
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function writeCookieConsent(state: CookieConsentState) {
  if (typeof document === 'undefined') return
  const maxAge = COOKIE_CONSENT_MAX_AGE_DAYS * 24 * 60 * 60
  document.cookie = `${COOKIE_CONSENT_NAME}=${encodeURIComponent(
    JSON.stringify(state),
  )}; path=/; max-age=${maxAge}; SameSite=Lax`
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: state }))
}

export function hasConsent(category: CookieCategory): boolean {
  return readCookieConsent()?.[category] ?? false
}

import { ThemeKeyType, THEME_KEYS, THEME_PREFIX } from '@/utils/theme'
import { isBrowser } from '@/utils/is-browser'

/* UTILS */
export function getThemeFromDocument(): ThemeKeyType {
  if (!isBrowser()) return THEME_KEYS.LIGHT

  const lightThemeClass = THEME_PREFIX + THEME_KEYS.LIGHT
  return document.documentElement.classList.contains(lightThemeClass)
    ? THEME_KEYS.LIGHT
    : THEME_KEYS.DARK
}

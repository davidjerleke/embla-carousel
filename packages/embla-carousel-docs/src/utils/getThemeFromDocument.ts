import { ThemeKeyType, THEME_KEYS, THEME_PREFIX } from 'consts/themes'
import { isBrowser } from './isBrowser'

export const getThemeFromDocument = (): ThemeKeyType => {
  if (!isBrowser) return THEME_KEYS.LIGHT

  const lightThemeClass = THEME_PREFIX + THEME_KEYS.LIGHT
  return document.documentElement.classList.contains(lightThemeClass)
    ? THEME_KEYS.LIGHT
    : THEME_KEYS.DARK
}

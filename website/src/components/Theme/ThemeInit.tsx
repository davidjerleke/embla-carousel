import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { selectTheme, setTheme } from '@/components/Theme/theme-reducer'
import { isBrowser } from '@/utils/is-browser'
import { useLocalStorage } from '@/hooks/local-storage'
import { LOCALSTORAGE_KEYS } from '@/utils/local-storage'
import {
  THEME_COLORS,
  THEME_KEYS,
  THEME_META_SELECTOR,
  THEME_PREFIX
} from '@/utils/theme'

export function ThemeInit() {
  const { setLocalStorageItem } = useLocalStorage(LOCALSTORAGE_KEYS.THEME)
  const theme = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const themeMetaNode = document.querySelector(THEME_META_SELECTOR)

    setLocalStorageItem(JSON.stringify({ currentTheme: theme }))

    const classesToRemove = Object.values(THEME_KEYS).map(
      (key) => `${THEME_PREFIX}${key}`
    )
    document.documentElement.classList.remove(...classesToRemove)
    document.documentElement.classList.add(`${THEME_PREFIX}${theme}`)

    if (themeMetaNode) {
      const nextBackgroundColor = THEME_COLORS[theme].BACKGROUND_SITE
      themeMetaNode.setAttribute('content', nextBackgroundColor)
    }
  }, [theme])

  useEffect(() => {
    const initialTheme = isBrowser() ? window.__THEME__ : THEME_KEYS.LIGHT
    dispatch(setTheme(initialTheme))
  }, [dispatch])

  return null
}

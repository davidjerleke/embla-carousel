import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  THEME_KEYS,
  THEME_PREFIX,
  THEME_COLORS,
  THEME_META_SELECTOR,
  ThemeKeyType,
} from 'consts/themes'
import { LOCALSTORAGE_KEYS } from 'consts/localStorage'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { isBrowser } from 'utils/isBrowser'

export type ThemeContextType = {
  theme: ThemeKeyType
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: THEME_KEYS.LIGHT,
  toggleTheme: () => undefined,
})

type PropType = PropsWithChildren<{}>

export const ThemeProvider = (props: PropType) => {
  const { children } = props
  const { setLocalStorageItem } = useLocalStorage(LOCALSTORAGE_KEYS.THEME)
  const [theme, setTheme] = useState<ThemeKeyType>(THEME_KEYS.LIGHT)

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const isLightTheme = current === THEME_KEYS.LIGHT
      const next = isLightTheme ? THEME_KEYS.DARK : THEME_KEYS.LIGHT
      const themeMetaNode = document.querySelector(THEME_META_SELECTOR)

      setLocalStorageItem(next)
      document.documentElement.classList.remove(`${THEME_PREFIX}${current}`)
      document.documentElement.classList.add(`${THEME_PREFIX}${next}`)

      if (themeMetaNode) {
        const nextBackgroundColor = THEME_COLORS[next].BACKGROUND_SITE
        themeMetaNode.setAttribute('content', nextBackgroundColor)
      }

      return next
    })
  }, [])

  useEffect(() => {
    const initialTheme = isBrowser ? window.__THEME__ : THEME_KEYS.LIGHT
    setTheme(initialTheme)
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

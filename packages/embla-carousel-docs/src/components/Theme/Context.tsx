import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  LOCALSTORAGE_KEYS,
  THEME_KEYS,
  ThemeKeyType,
  THEME_PREFIX,
} from 'consts'
import { useLocalStorage } from 'hooks'
import { isBrowser } from 'utils'

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
      const next =
        current === THEME_KEYS.LIGHT ? THEME_KEYS.DARK : THEME_KEYS.LIGHT
      setLocalStorageItem(next)
      document.documentElement.classList.remove(`${THEME_PREFIX}${current}`)
      document.documentElement.classList.add(`${THEME_PREFIX}${next}`)
      return next
    })
  }, [setTheme])

  useEffect(() => {
    const initialTheme = isBrowser ? window.__THEME__ : THEME_KEYS.LIGHT
    setTheme(initialTheme)
  }, [setTheme])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

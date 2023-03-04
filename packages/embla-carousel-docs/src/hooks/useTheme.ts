import { useContext } from 'react'
import { ThemeContext, ThemeContextType } from 'components/Theme/ThemeContext'

export const useTheme = (): ThemeContextType => useContext(ThemeContext)

import { useContext } from 'react'
import { ThemeContext, ThemeContextType } from 'components/Theme'

export const useTheme = (): ThemeContextType => useContext(ThemeContext)

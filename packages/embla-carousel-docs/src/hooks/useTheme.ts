import { useContext } from 'react'
import { ThemeContext, ThemeContextType } from 'components/Theme/Context'

export const useTheme = (): ThemeContextType => useContext(ThemeContext)

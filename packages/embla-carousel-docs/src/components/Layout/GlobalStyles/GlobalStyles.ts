import { createGlobalStyle } from 'styled-components'
import { baseStyles } from './base'
import { resetStyles } from './reset'
import { themeStyles } from './theme'

export const GlobalStyles = createGlobalStyle`
  ${resetStyles};
  ${baseStyles};
  ${themeStyles};
`

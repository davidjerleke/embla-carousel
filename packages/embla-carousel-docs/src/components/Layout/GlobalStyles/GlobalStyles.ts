import { createGlobalStyle } from 'styled-components'
import { baseStyles } from './base'
import { resetStyles } from './reset'
import { themeStyles } from './theme'
import { fontStyles } from './font'

export const GlobalStyles = createGlobalStyle`
  ${fontStyles};
  ${resetStyles};
  ${baseStyles};
  ${themeStyles};
`

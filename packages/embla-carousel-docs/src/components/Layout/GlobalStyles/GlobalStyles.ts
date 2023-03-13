import { createGlobalStyle } from 'styled-components'
import { BASE_STYLES } from './base'
import { RESET_STYLES } from './reset'
import { THEME_STYLES } from './theme'
import { FONT_STYLES } from './font'

export const GlobalStyles = createGlobalStyle`
  ${FONT_STYLES};
  ${RESET_STYLES};
  ${BASE_STYLES};
  ${THEME_STYLES};
`

'use client'

import { createGlobalStyle } from 'styled-components'
import { FONT_STYLES } from './font'
import { BASE_STYLES } from './base'
import { RESET_STYLES } from './reset'
import { THEME_STYLES } from './theme'

export const GlobalStyles = createGlobalStyle`
  ${FONT_STYLES};
  ${RESET_STYLES};
  ${BASE_STYLES};
  ${THEME_STYLES};
`

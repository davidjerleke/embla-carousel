'use client'

import { createGlobalStyle } from 'styled-components'
import {
  BASE_STYLES,
  FONT_STYLES,
  RESET_STYLES,
  THEME_STYLES
} from '@/utils/global-styles'

export const GlobalStyles = createGlobalStyle`
  ${FONT_STYLES};
  ${RESET_STYLES};
  ${BASE_STYLES};
  ${THEME_STYLES};
`

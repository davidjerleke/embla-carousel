import { css } from 'styled-components'
import { BORDER_RADIUSES } from '@/utils/border'
import { COLORS } from '@/utils/theme'
import { SPACINGS } from './spacings'

/* CONSTS */
export const CARD_STYLES = css`
  background-color: ${COLORS.BACKGROUND_CODE};
  border-radius: ${BORDER_RADIUSES.CARD};
`

export const CARD_SPACING = SPACINGS.ONE

import { css } from 'styled-components'
import { BORDER_RADIUSES, BORDER_SIZES } from './border'
import { COLORS } from './themes'

export const CARD_STYLES = css`
  border: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
  background-color: ${COLORS.BACKGROUND_CODE};
  border-radius: ${BORDER_RADIUSES.CARD};
`

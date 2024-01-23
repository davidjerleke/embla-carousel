import styled from 'styled-components'
import { BORDER_SIZES } from 'consts/border'
import { SPACINGS } from 'consts/spacings'
import { COLORS } from 'consts/themes'

export const TabsList = styled.div`
  margin-bottom: ${SPACINGS.FOUR};
  border-bottom: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
  display: flex;
  overflow-x: auto;
`

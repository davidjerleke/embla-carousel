import styled from 'styled-components'
import { COLORS } from '@/utils/theme'
import { BORDER_SIZES } from '@/utils/border'
import { HEADING_TOP_SPACING } from '@/components/Mdx/Styles/heading'

export const Hr = styled.hr`
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_MEDIUM_CONTRAST};
  margin-top: ${HEADING_TOP_SPACING};
  margin-bottom: ${HEADING_TOP_SPACING};
  width: 100%;
  background-color: ${COLORS.DETAIL_MEDIUM_CONTRAST};
`

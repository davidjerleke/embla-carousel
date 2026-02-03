import styled, { css } from 'styled-components'
import { LinkBare, PropType } from './LinkBare'
import { BRAND_GRADIENT_TEXT_STYLES } from '@/utils/gradients'
import { FONT_WEIGHTS } from '@/utils/font-sizes'

export const linkContentStyles = css`
  ${BRAND_GRADIENT_TEXT_STYLES};
  display: inline-block;
  font-weight: ${FONT_WEIGHTS.MEDIUM};
`

const LinkContentWrapper = styled(LinkBare)`
  ${linkContentStyles};
`

export function LinkContent(props: PropType) {
  return <LinkContentWrapper {...props} />
}

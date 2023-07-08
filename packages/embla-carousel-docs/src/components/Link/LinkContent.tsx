import React from 'react'
import styled, { css } from 'styled-components'
import { LinkBare, PropType } from './LinkBare'
import { BRAND_GRADIENT_TEXT_STYLES } from 'consts/gradients'
import { FONT_WEIGHTS } from 'consts/fontSizes'

export const linkContentStyles = css`
  ${BRAND_GRADIENT_TEXT_STYLES};
  display: inline-block;
  font-weight: ${FONT_WEIGHTS.MEDIUM};
`

const LinkContentWrapper = styled(LinkBare)`
  ${linkContentStyles};
`

export const LinkContent = (props: PropType) => {
  return <LinkContentWrapper {...props} />
}

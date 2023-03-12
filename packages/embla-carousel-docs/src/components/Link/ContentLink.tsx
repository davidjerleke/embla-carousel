import React from 'react'
import styled, { css } from 'styled-components'
import { BareLink, PropType } from './BareLink'
import { BRAND_GRADIENT_TEXT_STYLES } from 'consts/gradients'

export const contentLinkStyles = css`
  ${BRAND_GRADIENT_TEXT_STYLES};
  display: inline-block;
  font-weight: 500;
`

const ContentLinkWrapper = styled(BareLink)`
  ${contentLinkStyles};
`

export const ContentLink = (props: PropType) => {
  return <ContentLinkWrapper {...props} />
}

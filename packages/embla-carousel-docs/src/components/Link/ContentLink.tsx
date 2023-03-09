import React from 'react'
import styled, { css } from 'styled-components'
import { BareLink, PropType } from './BareLink'
import { brandGradientTextStyles } from 'consts/gradients'

export const contentLinkStyles = css`
  ${brandGradientTextStyles};
  display: inline-block;
  font-weight: 500;
`

const ContentLinkWrapper = styled(BareLink)`
  ${contentLinkStyles};
`

export const ContentLink = (props: PropType) => {
  return <ContentLinkWrapper {...props} />
}

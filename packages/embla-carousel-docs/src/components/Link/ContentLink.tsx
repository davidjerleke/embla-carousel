import React from 'react'
import styled, { css } from 'styled-components'
import { PlainLink, PropType } from './PlainLink'
import { gradientTextStyles } from 'utils/gradientTextStyles'

export const contentLinkStyles = css`
  ${gradientTextStyles};
  display: inline-block;
  font-weight: 500;
`

const ContentLinkWrapper = styled(PlainLink)`
  ${contentLinkStyles};
`

export const ContentLink = (props: PropType) => {
  return <ContentLinkWrapper {...props} />
}

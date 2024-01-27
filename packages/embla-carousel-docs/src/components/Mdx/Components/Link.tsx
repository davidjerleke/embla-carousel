import React, { AnchorHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { CODE_HIGHLIGHT_CLASS_NAME } from './Code'
import { BRAND_GRADIENT_TEXT_STYLES } from 'consts/gradients'
import { LinkContent } from 'components/Link/LinkContent'
import { LinkBare } from 'components/Link/LinkBare'

const linkStyles = css`
  .${CODE_HIGHLIGHT_CLASS_NAME} > span {
    ${BRAND_GRADIENT_TEXT_STYLES};
  }
`

const LinkContentStyled = styled(LinkContent)`
  ${linkStyles};
`

type PropType = AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = (props: PropType) => {
  const { className, href = '' } = props
  const classList = className?.split(' ') || []
  const Link = classList.indexOf('anchor') > -1 ? LinkBare : LinkContentStyled
  return <Link to={href} {...props} />
}

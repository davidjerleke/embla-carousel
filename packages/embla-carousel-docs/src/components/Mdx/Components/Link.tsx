import React, { AnchorHTMLAttributes } from 'react'
import { LinkContent } from 'components/Link/LinkContent'
import { LinkBare } from 'components/Link/LinkBare'

type PropType = AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = (props: PropType) => {
  const { className, href = '' } = props
  const classList = className?.split(' ') || []
  const Link = classList.indexOf('anchor') > -1 ? LinkBare : LinkContent
  return <Link to={href} {...props} />
}

import React, { AnchorHTMLAttributes } from 'react'
import { ContentLink } from 'components/Link/ContentLink'
import { BareLink } from 'components/Link/BareLink'

type PropType = AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = (props: PropType) => {
  const { className, href = '' } = props
  const classList = className?.split(' ') || []
  const Link = classList.indexOf('anchor') > -1 ? BareLink : ContentLink
  return <Link to={href} {...props} />
}

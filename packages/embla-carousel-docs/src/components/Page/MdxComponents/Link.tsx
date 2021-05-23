import React from 'react'
import { ContentLink, PlainLink } from 'components/Link'

type PropType = {
  href: string
  className: string
}

export const Link = (props: PropType) => {
  const classList = props.className?.split(' ') || []
  const Link = classList.indexOf('anchor') > -1 ? PlainLink : ContentLink
  return <Link to={props.href} {...props} />
}

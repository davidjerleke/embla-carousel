import React, { PropsWithChildren, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { TableOfContentsItemType } from './Context'
import { NavigationLink } from 'components/Link/NavigationLink'
import { SPACINGS } from 'consts/spacings'
import { isBrowser } from 'utils/isBrowser'

const Link = styled(NavigationLink)`
  padding-top: ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.5)};
  padding-bottom: ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.5)};
`

type PropType = PropsWithChildren<{
  item: TableOfContentsItemType
  isActive: boolean
}>

export const MenuItem = (props: PropType) => {
  const { item, isActive, children } = props
  const scrollTop = useRef(0)

  useEffect(() => {
    if (isBrowser) scrollTop.current = window.pageYOffset
  }, [])

  return (
    <li key={item.url}>
      <Link slug={item.url || ''} isActive={isActive}>
        {item.title}
      </Link>

      {children}
    </li>
  )
}

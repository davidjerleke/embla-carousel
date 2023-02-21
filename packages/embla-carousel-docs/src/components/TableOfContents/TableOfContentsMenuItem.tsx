import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { OUTLINE_SIZE } from 'components/KeyNavigating/keyNavigatingStyles'
import { SPACINGS } from 'consts/spacings'
import { TableOfContentsItemType } from './TableOfContentsContext'
import { NavigationLink } from 'components/Link/NavigationLink'

const Link = styled(NavigationLink)`
  padding-top: ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.4)};
  padding-bottom: ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.4)};
  outline-offset: -${OUTLINE_SIZE};
`

type PropType = PropsWithChildren<{
  item: TableOfContentsItemType
  isActive: boolean
}>

export const TableOfContentsMenuItem = (props: PropType) => {
  const { item, isActive, children } = props

  return (
    <li key={item.url}>
      <Link slug={item.url || ''} isActive={isActive}>
        {item.title}
      </Link>

      {children}
    </li>
  )
}

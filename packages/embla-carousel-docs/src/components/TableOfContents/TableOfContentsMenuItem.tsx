import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { SPACINGS } from 'consts/spacings'
import { BORDER_SIZES } from 'consts/border'
import { TableOfContentsItemType } from './TableOfContentsContext'
import { LinkNavigation } from 'components/Link/LinkNavigation'

const Link = styled(LinkNavigation)`
  padding-top: ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.4)};
  padding-bottom: ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.4)};
  outline-offset: -${BORDER_SIZES.OUTLINE};
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

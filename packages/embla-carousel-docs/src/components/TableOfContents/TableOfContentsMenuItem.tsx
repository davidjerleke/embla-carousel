import React, { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'
import { SPACINGS } from 'consts/spacings'
import { BORDER_SIZES } from 'consts/border'
import { TableOfContentsItemType } from './TableOfContentsContext'
import { InactiveText, LinkNavigation } from 'components/Link/LinkNavigation'
import { COLORS } from 'consts/themes'

const Link = styled(LinkNavigation)<{ $level: number }>`
  padding-top: ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.4)};
  padding-bottom: ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.4)};
  outline-offset: -${BORDER_SIZES.OUTLINE};

  ${({ $level }) =>
    $level > 0 &&
    css`
      > ${InactiveText} {
        color: ${COLORS.TEXT_LOW_CONTRAST};
      }
    `};
`

type PropType = PropsWithChildren<{
  item: TableOfContentsItemType
  isActive: boolean
  level: number
}>

export const TableOfContentsMenuItem = (props: PropType) => {
  const { item, isActive, children, level } = props

  return (
    <li key={item.url}>
      <Link slug={item.url || ''} isActive={isActive} $level={level}>
        {item.title}
      </Link>

      {children}
    </li>
  )
}

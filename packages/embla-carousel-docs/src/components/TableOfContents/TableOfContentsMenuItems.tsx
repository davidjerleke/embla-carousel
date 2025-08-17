import React from 'react'
import styled from 'styled-components'
import { TableOfContentsItemType } from 'consts/tableOfContents'
import { SPACINGS } from 'consts/spacings'
import { TableOfContentsMenuItem } from './TableOfContentsMenuItem'

const hasItemsOnly = (item: TableOfContentsItemType): boolean =>
  !item.url && !item.title && typeof item.items !== 'undefined'

const LEVEL_SPACING = SPACINGS.CUSTOM(() => 1.6)

const TableOfContentsMenuItemsWrapper = styled.ol<{ $withSpacing: boolean }>`
  padding-left: ${({ $withSpacing }) => ($withSpacing ? LEVEL_SPACING : 0)};
  list-style: none;
`

type PropType = {
  activeId: string
  items?: TableOfContentsItemType[]
  level?: number
}

export const TableOfContentsMenuItems = (props: PropType) => {
  const { items = [], activeId, level = 0 } = props
  const nextLevel = level + 1

  return (
    <TableOfContentsMenuItemsWrapper $withSpacing={level > 0}>
      {items.map((item, index) => {
        if (hasItemsOnly(item)) {
          return (
            <TableOfContentsMenuItems
              key={`${index}-level`}
              items={item.items}
              activeId={activeId}
              level={nextLevel}
            />
          )
        }

        const isActive = activeId === item.url?.slice(1)

        return (
          <TableOfContentsMenuItem
            key={item.url}
            item={item}
            isActive={isActive}
            level={level}
          >
            {item.items && (
              <TableOfContentsMenuItems
                items={item.items}
                activeId={activeId}
                level={nextLevel}
              />
            )}
          </TableOfContentsMenuItem>
        )
      })}
    </TableOfContentsMenuItemsWrapper>
  )
}

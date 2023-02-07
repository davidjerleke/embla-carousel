import React from 'react'
import styled from 'styled-components'
import { TableOfContentsItemType } from './Context'
import { SPACINGS } from 'consts/spacings'
import { MenuItem } from './MenuItem'

const hasItemsOnly = (item: TableOfContentsItemType): boolean =>
  !item.url && !item.title && typeof item.items !== undefined

const LEVEL_SPACING = SPACINGS.THREE

const MenuItemsWrapper = styled.ol<{ $withSpacing: boolean }>`
  padding-left: ${({ $withSpacing }) => ($withSpacing ? LEVEL_SPACING : 0)};
  list-style: none;
`

type PropType = {
  activeId: string
  items?: TableOfContentsItemType[]
  level?: number
}

export const MenuItems = (props: PropType) => {
  const { items = [], activeId, level = 0 } = props
  const nextLevel = level + 1

  return (
    <MenuItemsWrapper $withSpacing={level > 0}>
      {items.map((item, index) => {
        if (hasItemsOnly(item)) {
          return (
            <MenuItems
              key={`${index}-level`}
              items={item.items}
              activeId={activeId}
              level={nextLevel}
            />
          )
        }

        const isActive = activeId === item.url?.slice(1)

        return (
          <MenuItem key={item.url} item={item} isActive={isActive}>
            {item.items && (
              <MenuItems
                items={item.items}
                activeId={activeId}
                level={nextLevel}
              />
            )}
          </MenuItem>
        )
      })}
    </MenuItemsWrapper>
  )
}

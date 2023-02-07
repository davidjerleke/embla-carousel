import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useTableOfContents } from 'hooks/useTableOfContents'
import { TableOfContentsItemType } from './Context'
import { MenuItems } from './MenuItems'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'

const extractHeadingIds = (
  items: TableOfContentsItemType['items'] = [],
): string[] => {
  const headingIds: string[] = []

  return items.reduce((acc, item) => {
    if (item.url) acc.push(item.url.slice(1))
    if (item.items) acc.push(...extractHeadingIds(item.items))
    return acc
  }, headingIds)
}

const ScrollArea = styled.div`
  overflow: auto;
  position: relative;
  max-height: 100%;
`

const Heading = styled.div`
  color: ${COLORS.TEXT_BODY};
  padding-top: ${SPACINGS.ONE};
  padding-bottom: ${SPACINGS.TWO};
  font-weight: bold;
`

export const Menu = () => {
  const [activeId, setActiveId] = useState('')
  const { items = [] } = useTableOfContents()
  const headingIds = useMemo(() => extractHeadingIds(items), [items])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: `0% 0% -80% 0%` },
    )

    headingIds.forEach((id) => {
      const heading = document.getElementById(id)
      if (heading) observer.observe(heading)
    })

    return () => {
      headingIds.forEach((id) => {
        const heading = document.getElementById(id)
        if (heading) observer.unobserve(heading)
      })
    }
  }, [headingIds])

  if (!items) return null

  return (
    <ScrollArea>
      <Heading>On this page</Heading>
      <MenuItems items={items} activeId={activeId} />
    </ScrollArea>
  )
}

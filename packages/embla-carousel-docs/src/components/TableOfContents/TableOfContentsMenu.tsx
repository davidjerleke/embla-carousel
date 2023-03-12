import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { MEDIA } from 'consts/breakpoints'
import { BORDER_SIZES } from 'consts/border'
import { useTableOfContents } from 'hooks/useTableOfContents'
import { TableOfContentsItemType } from './TableOfContentsContext'
import { TableOfContentsMenuItems } from './TableOfContentsMenuItems'
import { createScrollBarStyles } from 'consts/scrollBars'

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

const TableOfContentsMenuWrapper = styled.div`
  ${createScrollBarStyles('y')};
  overflow: auto;
  position: relative;
  max-height: 100%;

  ${MEDIA.DESKTOP} {
    padding-top: ${FRAME_SPACING};
    padding-bottom: ${FRAME_SPACING};
  }
`

const Heading = styled.div`
  color: ${COLORS.TEXT_BODY};
  padding-top: ${SPACINGS.ONE};
  padding-bottom: ${SPACINGS.TWO};
  font-weight: bold;

  ${MEDIA.COMPACT} {
    padding-top: ${SPACINGS.TWO};
    border-bottom: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
    margin-bottom: ${SPACINGS.TWO};
  }
`

export const TableOfContentsMenu = () => {
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
    <TableOfContentsMenuWrapper>
      <Heading>On this page</Heading>
      <TableOfContentsMenuItems items={items} activeId={activeId} />
    </TableOfContentsMenuWrapper>
  )
}

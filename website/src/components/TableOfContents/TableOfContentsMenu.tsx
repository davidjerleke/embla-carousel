import { useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import { COLORS } from '@/utils/theme'
import { SPACINGS } from '@/utils/spacings'
import { MEDIA } from '@/utils/breakpoints'
import { BORDER_SIZES } from '@/utils/border'
import { FONT_WEIGHTS } from '@/utils/font-sizes'
import { InactiveText, LinkNavigation } from '@/components/Link/LinkNavigation'
import { createScrollBarStyles } from '@/utils/scrollbars'
import { PAGE_FRAME_SPACING } from '@/utils/page'
import { useTableOfContentsContext } from '@/components/TableOfContents/TableOfContentsContext'
import { arrayHasItems } from '@/utils/array'
import { HEADER_HEIGHT } from '@/utils/header'

const TableOfContentsMenuWrapper = styled.div`
  ${createScrollBarStyles('y')};
  position: relative;

  ${MEDIA.DESKTOP} {
    overflow: auto;
    max-height: calc(100dvh - ${HEADER_HEIGHT});
    padding-top: ${PAGE_FRAME_SPACING};
    padding-bottom: ${PAGE_FRAME_SPACING};
  }
`

const Heading = styled.div`
  color: ${COLORS.TEXT_BODY};
  padding-top: ${SPACINGS.ONE};
  padding-bottom: ${SPACINGS.ONE};
  font-weight: ${FONT_WEIGHTS.SEMI_BOLD};

  ${MEDIA.COMPACT} {
    padding-top: ${SPACINGS.TWO};
    border-bottom: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
    margin-bottom: ${SPACINGS.TWO};
  }
`

const TableOfContentsMenuItemsWrapper = styled.ol`
  list-style: none;
`

const Link = styled(LinkNavigation)<{ $level: number }>`
  padding-top: ${SPACINGS.ONE};
  padding-bottom: ${SPACINGS.ONE};
  outline-offset: -${BORDER_SIZES.OUTLINE};

  ${({ $level }) =>
    $level > 0 &&
    css`
      margin-left: ${SPACINGS.CUSTOM(() => $level * 1.6)};

      > ${InactiveText} {
        color: ${COLORS.TEXT_LOW_CONTRAST};
      }
    `};
`

export function TableOfContentsMenu() {
  const [activeId, setActiveId] = useState('')
  const tableOfContents = useTableOfContentsContext()
  const headingIds = useMemo(() => {
    const ids = tableOfContents.map((item) => item.id || '')
    return ids.filter(Boolean)
  }, [tableOfContents])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
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

  if (!arrayHasItems(tableOfContents)) return null

  return (
    <TableOfContentsMenuWrapper>
      <Heading>On this page</Heading>

      <TableOfContentsMenuItemsWrapper>
        {tableOfContents.map((item) => (
          <li key={item.id}>
            <Link
              slug={`#${item.id || ''}`}
              isActive={activeId === item.id}
              $level={item.level}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </TableOfContentsMenuItemsWrapper>
    </TableOfContentsMenuWrapper>
  )
}

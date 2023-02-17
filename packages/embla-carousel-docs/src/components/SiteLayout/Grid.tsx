import React, { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'
import { useRoutes } from 'hooks/useRoutes'
import { Frame, FRAME_SPACING } from './Frame'
import { MEDIA } from 'consts/breakpoints'
import { SPACINGS } from 'consts/spacings'
import { PAGE_TEMPLATES, PageTemplateType } from 'consts/pageTemplates'
import { LAYERS } from 'consts/layers'
import { SiteNavigation } from 'components/SiteNavigation/SiteNavigation'
import { TableOfContents } from 'components/TableOfContents/TableOfContents'
import { useBreakpoints } from 'hooks/useBreakpoints'
import { isBrowser } from 'utils/isBrowser'

const SIDEBAR_LG_UP_WIDTH = '28rem'
const SIDEBAR_LG_DOWN_WIDTH = '21rem'

const sidebarStyles = css`
  min-width: 0;
  flex: 0 0 auto;

  ${MEDIA.DESKTOP} {
    width: ${SIDEBAR_LG_DOWN_WIDTH};
    max-width: ${SIDEBAR_LG_DOWN_WIDTH};
  }

  ${MEDIA.MIN_LG} {
    width: ${SIDEBAR_LG_UP_WIDTH};
    max-width: ${SIDEBAR_LG_UP_WIDTH};
  }
`

const GridWrapper = styled(Frame)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding-top: ${FRAME_SPACING};
  padding-bottom: ${FRAME_SPACING};
`

const Main = styled.main<{ $isStartPage: boolean }>`
  flex: 1;
  min-width: 0;
  max-width: 100%;
  position: relative;
  z-index: ${LAYERS.STEP};

  ${({ $isStartPage }) =>
    !$isStartPage &&
    css`
      ${MEDIA.DESKTOP} {
        padding-right: ${SPACINGS.SEVEN};
        padding-left: ${SPACINGS.SEVEN};
      }
    `};
`

const SiteNavigationWrapper = styled.div<{ $isStartPage: boolean }>`
  ${sidebarStyles};

  ${MEDIA.DESKTOP} {
    ${({ $isStartPage }) =>
      $isStartPage &&
      css`
        position: fixed;
        visibility: hidden;
        left: 0;
        transform: translateX(-100%);
      `};
  }
`

const TableOfContentsWrapper = styled.div`
  ${sidebarStyles};
`

type PropType = PropsWithChildren<{
  layout: PageTemplateType
}>

export const Grid = (props: PropType) => {
  const { children, layout } = props
  const { isLoading } = useRoutes()
  const { isCompact, isDesktop } = useBreakpoints()
  const isStartPage = layout === PAGE_TEMPLATES.HOME
  const showTableOfContents = !isStartPage && (isDesktop || !isBrowser)
  const frameSize = isStartPage ? 'MD' : undefined

  return (
    <GridWrapper size={frameSize}>
      <SiteNavigationWrapper $isStartPage={isStartPage}>
        <SiteNavigation collapsed={isCompact} />
      </SiteNavigationWrapper>

      <Main
        role="main"
        aria-live="polite"
        $isStartPage={isStartPage}
        aria-busy={isLoading}
      >
        {children}
      </Main>

      {showTableOfContents && (
        <TableOfContentsWrapper>
          <TableOfContents />
        </TableOfContentsWrapper>
      )}
    </GridWrapper>
  )
}

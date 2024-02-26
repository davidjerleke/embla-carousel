import React, { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'
import { useRoutes } from 'hooks/useRoutes'
import { PageFrame, PAGE_FRAME_SPACING } from 'components/Page/PageFrame'
import { MEDIA } from 'consts/breakpoints'
import { SPACINGS } from 'consts/spacings'
import { PAGE_LAYOUTS, PageLayoutType } from 'consts/page'
import { LAYERS } from 'consts/layers'
import { SiteNavigation } from 'components/SiteNavigation/SiteNavigation'
import { TableOfContents } from 'components/TableOfContents/TableOfContents'

export const SIDEBAR_LG_UP_WIDTH = '28rem'
export const SIDEBAR_LG_DOWN_WIDTH = '21rem'
export const MAIN_CONTENT_SPACING = SPACINGS.SEVEN

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

const PageGridWrapper = styled(PageFrame)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding-top: ${PAGE_FRAME_SPACING};
  padding-bottom: ${PAGE_FRAME_SPACING};
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
        padding-right: ${MAIN_CONTENT_SPACING};
        padding-left: ${MAIN_CONTENT_SPACING};
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

const TableOfContentsWrapper = styled.div<{ $isStartPage: boolean }>`
  ${sidebarStyles};

  ${MEDIA.COMPACT} {
    display: none;
  }

  ${({ $isStartPage }) =>
    $isStartPage &&
    css`
      display: none;
    `};
`

type PropType = PropsWithChildren<{
  layout: PageLayoutType
}>

export const PageGrid = (props: PropType) => {
  const { children, layout } = props
  const { isLoading } = useRoutes()
  const isStartPage = layout === PAGE_LAYOUTS.HOME
  const frameSize = isStartPage ? 'MD' : undefined

  return (
    <PageGridWrapper size={frameSize}>
      <SiteNavigationWrapper $isStartPage={isStartPage}>
        <SiteNavigation />
      </SiteNavigationWrapper>

      <Main
        role="main"
        aria-live="polite"
        $isStartPage={isStartPage}
        aria-busy={isLoading}
      >
        {children}
      </Main>

      <TableOfContentsWrapper $isStartPage={isStartPage}>
        <TableOfContents />
      </TableOfContentsWrapper>
    </PageGridWrapper>
  )
}

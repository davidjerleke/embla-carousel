import React, { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'
import { Navigation } from 'components/Navigation'
import { useWindowSize } from 'hooks'
import { Frame, FRAME_SPACING } from './Frame'
import {
  BREAKPOINTS,
  MEDIA,
  PageTemplateType,
  PAGE_TEMPLATES,
  SPACINGS,
} from 'consts'

const SIDEBAR_WIDTH = '27rem'

const Wrapper = styled(Frame)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding-top: ${FRAME_SPACING};
  padding-bottom: ${FRAME_SPACING};
`

const Main = styled.main<{ $isStartPage: boolean }>`
  flex: 1;
  max-width: 100%;

  ${({ $isStartPage }) =>
    !$isStartPage &&
    css`
      ${MEDIA.DESKTOP} {
        max-width: calc(100% - ${SIDEBAR_WIDTH});
      }
    `};
`

const Nav = styled.div<{ $isStartPage: boolean }>`
  ${MEDIA.DESKTOP} {
    padding-right: ${SPACINGS.SEVEN};
    flex: 0 0 ${SIDEBAR_WIDTH};
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

type PropType = PropsWithChildren<{
  layout: PageTemplateType
}>

export const Grid = (props: PropType) => {
  const { children, layout } = props
  const { windowWidth } = useWindowSize()
  const collapseBreakpoint = windowWidth < BREAKPOINTS.MD
  const isStartPage = layout === PAGE_TEMPLATES.HOME

  return (
    <Wrapper>
      <Nav $isStartPage={isStartPage}>
        <Navigation collapsed={collapseBreakpoint} />
      </Nav>
      <Main $isStartPage={isStartPage} role="main">
        {children}
      </Main>
    </Wrapper>
  )
}

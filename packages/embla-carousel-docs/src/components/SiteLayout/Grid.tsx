import React, { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'
import { Navigation } from 'components/Navigation'
import { useWindowSize } from 'hooks'
import { Frame } from './Frame'
import {
  BREAKPOINTS,
  breakpoints,
  PageTemplateType,
  PAGE_TEMPLATES,
} from 'consts'

const SIDEBAR_WIDTH_MIN_SM = '23rem'
const SIDEBAR_WIDTH_MIN_MD = '27rem'

const Wrapper = styled(Frame)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding-top: 4.8rem;
  padding-bottom: 4.8rem;

  ${breakpoints.maxSm} {
    padding-top: 2.4rem;
  }
`

const Main = styled.main<{ $isStartPage: boolean }>`
  flex: 1;
  max-width: 100%;

  ${({ $isStartPage }) =>
    !$isStartPage &&
    css`
      ${breakpoints.minSm} {
        max-width: calc(100% - ${SIDEBAR_WIDTH_MIN_SM});
      }
      ${breakpoints.minMd} {
        max-width: calc(100% - ${SIDEBAR_WIDTH_MIN_MD});
      }
    `};
`

const Nav = styled.div<{ $isStartPage: boolean }>`
  ${breakpoints.minSm} {
    padding-right: 3rem;
    flex: 0 0 ${SIDEBAR_WIDTH_MIN_SM};
    ${({ $isStartPage }) =>
      $isStartPage &&
      css`
        position: fixed;
        visibility: hidden;
        left: 0;
        transform: translateX(-100%);
      `};
  }
  ${breakpoints.minMd} {
    padding-right: 4rem;
    flex: 0 0 ${SIDEBAR_WIDTH_MIN_MD};
  }
`

type PropType = PropsWithChildren<{
  layout: PageTemplateType
}>

export const Grid = (props: PropType) => {
  const { children, layout } = props
  const { windowWidth } = useWindowSize()
  const breakpointSmDown = windowWidth < BREAKPOINTS.SM
  const isStartPage = layout === PAGE_TEMPLATES.HOME

  return (
    <Wrapper>
      <Nav $isStartPage={isStartPage}>
        <Navigation collapsed={breakpointSmDown} />
      </Nav>
      <Main $isStartPage={isStartPage} role="main">
        {children}
      </Main>
    </Wrapper>
  )
}

import React from 'react'
import styled, { css } from 'styled-components'
import { Frame } from 'components/SiteLayout'
import { NavigationToggle } from 'components/Navigation'
import { breakpoints, LAYERS } from 'consts'
import { Actions } from './Actions'
import { Logo } from './Logo'

export const HEADER_HEIGHT = '6rem'

const HEIGHT = css`
  height: ${HEADER_HEIGHT};
`

const Wrapper = styled.header`
  ${HEIGHT};
`

const Fixed = styled.div`
  ${HEIGHT};
  z-index: ${LAYERS.HEADER};
  background-color: var(--background-site);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  ${breakpoints.desktop} {
    z-index: ${LAYERS.NAVIGATION + 1};
  }
`

const Content = styled(Frame)`
  ${HEIGHT};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Header = () => {
  return (
    <Wrapper>
      <Fixed>
        <Content>
          <NavigationToggle />
          <Logo />
          <Actions />
        </Content>
      </Fixed>
    </Wrapper>
  )
}

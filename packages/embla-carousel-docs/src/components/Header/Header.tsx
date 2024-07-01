import React from 'react'
import styled, { css } from 'styled-components'
import { PageFrame } from 'components/Page/PageFrame'
import { SiteNavigationToggle } from 'components/SiteNavigation/SiteNavigationToggle'
import { MEDIA } from 'consts/breakpoints'
import { LAYERS } from 'consts/layers'
import { COLORS } from 'consts/themes'
import { HEADER_HEIGHT, HEADER_ID } from 'consts/header'
import { BORDER_SIZES } from 'consts/border'
import { HeaderActions } from 'components/Header/HeaderActions'
import { HeaderLogo } from 'components/Header/HeaderLogo'

const HEIGHT = css`
  height: ${HEADER_HEIGHT};
`

const HeaderWrapper = styled.header`
  ${HEIGHT};
`

const Fixed = styled.div`
  ${HEIGHT};
  z-index: ${LAYERS.HEADER};
  background-color: rgba(${COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.8);
  border-bottom: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
  backdrop-filter: saturate(180%) blur(5px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  ${MEDIA.DESKTOP} {
    z-index: ${LAYERS.NAVIGATION + 1};
  }
`

const Content = styled(PageFrame)`
  ${HEIGHT};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Header = () => {
  return (
    <HeaderWrapper id={HEADER_ID}>
      <Fixed>
        <Content>
          <SiteNavigationToggle />
          <HeaderLogo />
          <HeaderActions />
        </Content>
      </Fixed>
    </HeaderWrapper>
  )
}

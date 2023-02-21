import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { COLORS } from 'consts/themes'
import { MEDIA } from 'consts/breakpoints'
import { SPACINGS } from 'consts/spacings'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { FooterLinks } from 'components/Footer/FooterLinks'
import { LAYERS } from 'consts/layers'
import { HEADER_HEIGHT } from 'components/Header/Header'
import { useKeyNavigating } from 'hooks/useKeyNavigating'

const scrollShadowStyles = `0 0 transparent, 0 -1.2rem 1.6rem ${COLORS.BACKGROUND_SITE}`

const SiteNavigationMenuDesktopWrapper = styled.div<{
  $isKeyNavigating: boolean
}>`
  background-color: ${COLORS.BACKGROUND_SITE};
  position: relative;
  height: 100%;

  &:before,
  &:after {
    box-shadow: ${({ $isKeyNavigating }) =>
      $isKeyNavigating ? 'none' : scrollShadowStyles};

    position: absolute;
    z-index: ${LAYERS.STEP};
    height: ${HEADER_HEIGHT};
    left: -${FRAME_SPACING};
    right: -${FRAME_SPACING};
    content: '';
    pointer-events: none;
  }

  &:before {
    top: -${HEADER_HEIGHT};
    transform: rotate(180deg);
  }

  &:after {
    bottom: -${HEADER_HEIGHT};
  }

  ${MEDIA.COMPACT} {
    display: none;
  }
`

const ScrollArea = styled.ul`
  padding-top: ${FRAME_SPACING};
  padding-bottom: ${FRAME_SPACING};
  overflow: auto;
  max-height: 100%;
`

const MiscLinks = styled(FooterLinks)`
  padding-top: ${SPACINGS.THREE};
  flex-direction: column;
`

type PropType = PropsWithChildren<{}>

export const SiteNavigationMenuDesktop = (props: PropType) => {
  const { children } = props
  const { isKeyNavigating } = useKeyNavigating()

  return (
    <SiteNavigationMenuDesktopWrapper $isKeyNavigating={isKeyNavigating}>
      <ScrollArea>
        {children}
        <li>
          <MiscLinks />
        </li>
      </ScrollArea>
    </SiteNavigationMenuDesktopWrapper>
  )
}

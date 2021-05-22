import styled from 'styled-components'
import { ITEM_SPACING, SlideInner, SlideImg } from './carouselBasicStyles'
import { supportsStyles } from 'consts'

export const ParallaxSlideInner = styled(SlideInner)`
  overflow: hidden;
`

export const ParallaxSlideImg = styled(SlideImg)`
  width: auto;
  margin-left: auto;
  transform: scale(0.105);

  ${supportsStyles.objectFitCover} {
    max-width: none;
    width: calc(100% + (${ITEM_SPACING} * 2));
    margin-left: -${ITEM_SPACING};
    transform: none;
  }
`

export const ParallaxSlideLayer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

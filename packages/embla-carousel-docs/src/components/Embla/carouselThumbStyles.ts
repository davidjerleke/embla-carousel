import styled from 'styled-components'
import { frameCollapseStyles } from 'components/SiteLayout/FrameCollapse'
import { COLORS } from 'consts/themes'
import { MEDIA } from 'consts/breakpoints'
import { supportsStyles } from 'consts/supportsStyles'
import { PlainButton } from 'components/Button/PlainButton'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import {
  CAROUSEL_RADIUS,
  CAROUSEL_SPACING,
  ITEM_SPACING,
  SlideNumber,
} from './carouselBasicStyles'

const HEIGHT = '30.2rem'

export const Wrapper = styled.div`
  height: ${HEIGHT};
  padding: ${CAROUSEL_SPACING};
  background-color: ${COLORS.BACKGROUND_CODE};
  position: relative;

  ${MEDIA.MAX_SM} {
    ${frameCollapseStyles};
  }
  ${MEDIA.MIN_SM} {
    border-radius: ${CAROUSEL_RADIUS};
  }
`

export const MainViewport = styled.div`
  overflow: hidden;
  height: 19rem;
  width: 100%;
`

export const ThumbViewport = styled.div`
  overflow: hidden;
  height: 8rem;
  width: 100%;
`

export const MainContainer = styled.div`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
  height: 100%;
  counter-reset: slidenumber;
  margin-left: -${ITEM_SPACING};

  > div {
    padding-left: ${ITEM_SPACING};
  }
`

export const ThumbContainer = styled.div`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
  height: calc(100% - 1rem);
  margin-top: 1rem;
  counter-reset: slidenumber;
  margin-left: -${ITEM_SPACING};

  > div {
    padding-left: ${ITEM_SPACING};
  }
`

export const ThumbSlide = styled.div`
  cursor: pointer;
  display: flex;
  position: relative;
  height: 100%;
  min-width: 25%;

  ${MEDIA.MIN_XS} {
    min-width: 18%;
  }

  ${MEDIA.MIN_MD} {
    min-width: 15%;
  }
`

export const ThumbSlideInner = styled(PlainButton)`
  border-radius: ${CAROUSEL_RADIUS};
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  ${supportsStyles.objectFitCover} {
    position: static;
    overflow: visible;
  }

  &:disabled {
    cursor: default;
    opacity: 0.25;
  }
`

export const ThumbSlideNumber = styled(SlideNumber)`
  ${createSquareSizeStyles('3.2rem')};
  font-size: 1.4rem;
  line-height: 3.2rem;
  top: 0.4rem;
  right: 0.4rem;
`

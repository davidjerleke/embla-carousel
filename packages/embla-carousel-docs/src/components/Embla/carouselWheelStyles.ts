import styled, { css } from 'styled-components'
import { WHEEL_ITEM_SIZE } from './CarouselWheelItem'
import { frameCollapseStyles } from 'components/SiteLayout'
import { CAROUSEL_RADIUS, CAROUSEL_SPACING } from './carouselBasicStyles'
import { breakpoints, LAYERS } from 'consts'

export type PerspectiveType = 'left' | 'right'

const CAROUSEL_HEIGHT = '22.2rem'
const VIEWPORT_MAX_WIDTH = '30rem'

export const Wrapper = styled.div`
  height: ${CAROUSEL_HEIGHT};
  background-color: var(--background-code);
  padding-left: ${CAROUSEL_SPACING};
  padding-right: ${CAROUSEL_SPACING};

  ${breakpoints.maxSm} {
    ${frameCollapseStyles};
  }
  ${breakpoints.minSm} {
    border-radius: ${CAROUSEL_RADIUS};
  }
`

export const Viewport = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  max-width: ${VIEWPORT_MAX_WIDTH};
  margin-left: auto;
  margin-right: auto;
  &:before,
  &:after {
    position: absolute;
    left: 0;
    right: 0;
    content: '';
    display: block;
    height: calc(50% - ${WHEEL_ITEM_SIZE}px / 2);
    z-index: ${LAYERS.STEP};
    pointer-events: none;
  }
  &:before {
    top: -0.5px;
    border-bottom: 0.5px solid rgba(var(--text-high-contrast-rgb-value), 0.3);
    background: linear-gradient(
      to top,
      rgba(var(--background-code-rgb-value), 0.65) 0%,
      rgba(var(--background-code-rgb-value), 1) 100%
    );
  }
  &:after {
    bottom: -0.5px;
    border-top: 0.5px solid rgba(var(--text-high-contrast-rgb-value), 0.3);
    background: linear-gradient(
      to bottom,
      rgba(var(--background-code-rgb-value), 0.65) 0%,
      rgba(var(--background-code-rgb-value), 1) 100%
    );
  }
`

export const WheelWrapper = styled.div<{ $perspective: PerspectiveType }>`
  height: 100%;
  display: flex;
  align-items: center;
  min-width: 50%;
  line-height: 1;
  font-size: 1.8rem;
`

export const WheelContainer = styled.div<{ $perspective: PerspectiveType }>`
  height: ${WHEEL_ITEM_SIZE}px;
  width: 100%;
  perspective: 1000px;
  ${({ $perspective }) =>
    $perspective === 'left'
      ? css`
          perspective-origin: 150% center;
          transform: translateX(-8px) !important;
        `
      : css`
          perspective-origin: -50% center;
          transform: translateX(-32px) !important;
        `};
`

export const Wheel = styled.div`
  min-width: 100%;
  height: 100%;
  overflow: hidden;
`

export const WheelViewport = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
`

export const WheelSlide = styled.div`
  position: absolute;
  top: 0 !important;
  left: 0 !important;
  width: 100%;
  height: 100%;
  font-size: 19px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  opacity: 0;
`

export const WheelLabel = styled.div<{ $perspective: PerspectiveType }>`
  font-weight: bold;
  pointer-events: none;
  transform: ${({ $perspective }) =>
    `translate(-${$perspective === 'left' ? 76 : 70}px)`};
`

import { LAYERS } from 'consts/layers'
import { COLORS } from 'consts/themes'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { gradientTextStyles } from 'utils/gradientTextStyles'
import { EmblaOptionsType } from 'embla-carousel'
import { css, FlattenSimpleInterpolation } from 'styled-components'
import { gradientBackgroundStyles } from 'utils/gradientBackgroundStyles'
import { MEDIA } from 'consts/breakpoints'
import {
  CAROUSEL_DEFAULT_HEIGHT,
  CAROUSEL_THUMBS_HEIGHT,
} from './carouselWrapperStyles'

const BASE_STYLES = css`
  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    flex-direction: __replace_axis_flex__;
    height: __replace_axis_height__;
    margin-__replace_axis_spacing__: -__replace_axis_spacing_amount__;
  }

  .embla__slide {
    flex: 0 0 __replace_slide_size__;
    padding-__replace_axis_spacing__: __replace_axis_spacing_amount__;
    position: relative;
    height: 100%;
  }

  .embla__slide__img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .embla__slide__number {
    ${createSquareSizeStyles('4.6rem')}
    z-index: ${LAYERS.STEP};
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: rgba(${COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.85);
    line-height: 4.6rem;
    font-weight: 500;
    text-align: center;
    pointer-events: none;
    border-top-left-radius: 0.4rem;
  }

  .embla__slide__number > span {
    ${gradientTextStyles}
    font-size: 1.6rem;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

const VARIABLE_WIDTH_STYLES = css`
  .embla__slide:nth-child(1) {
    flex: 0 0 60%;
  }
  .embla__slide:nth-child(2) {
    flex: 0 0 40%;
  }
  .embla__slide:nth-child(3) {
    flex: 0 0 30%;
  }
  .embla__slide:nth-child(4) {
    flex: 0 0 90%;
  }
  .embla__slide:nth-child(5) {
    flex: 0 0 35%;
  }
  .embla__slide:nth-child(6) {
    flex: 0 0 55%;
  }
  .embla__slide:nth-child(7) {
    flex: 0 0 85%;
  }
  .embla__slide:nth-child(8) {
    flex: 0 0 46%;
  }
  .embla__slide:nth-child(9) {
    flex: 0 0 30%;
  }
`

const ARROWS_DOTS_STYLES = css`
  .embla__dot,
  .embla__button {
    -webkit-appearance: none;
    background-color: transparent;
    touch-action: manipulation;
    display: inline-flex;
    text-decoration: none;
    cursor: pointer;
    border: 0;
    padding: 0;
    margin: 0;
  }

  .embla__dots {
    z-index: ${LAYERS.STEP};
    bottom: 1.2rem;
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .embla__dot {
    ${createSquareSizeStyles('3rem')};
    display: flex;
    align-items: center;
    margin-right: 0.75rem;
    margin-left: 0.75rem;
  }

  .embla__dot:after {
    background: ${COLORS.BACKGROUND_SITE};
    border-radius: 0.2rem;
    width: 100%;
    height: 0.3rem;
    content: '';
  }

  .embla__dot--selected:after {
    background: ${`linear-gradient(45deg, ${COLORS.BRAND_PRIMARY}, ${COLORS.BRAND_SECONDARY})`};
  }

  .embla__button {
    z-index: ${LAYERS.STEP};
    color: ${COLORS.BACKGROUND_SITE};
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    ${createSquareSizeStyles('4rem')};
  }

  .embla__button--prev {
    left: 1.6rem;
  }

  .embla__button--next {
    right: 1.6rem;
  }

  .embla__button:disabled {
    opacity: 0.3;
  }

  .embla__button__svg {
    ${createSquareSizeStyles('65%')};
  }
`

const THUMBS_STYLES = css`
  .embla-thumbs {
    margin-top: 0.8rem;
  }

  .embla-thumbs__viewport {
    overflow: hidden;
  }

  .embla-thumbs__container {
    display: flex;
    flex-direction: row;
    margin-left: -0.8rem;
    height: calc(
      ${CAROUSEL_THUMBS_HEIGHT} - ${CAROUSEL_DEFAULT_HEIGHT} - 0.8rem
    );
  }

  .embla-thumbs__slide {
    flex: 0 0 28%;
    ${MEDIA.MIN_XS} {
      flex: 0 0 18%;
    }
    padding-left: 0.8rem;
    position: relative;
    height: 100%;
  }

  .embla-thumbs__slide__button {
    -webkit-appearance: none;
    background-color: transparent;
    touch-action: manipulation;
    display: block;
    text-decoration: none;
    cursor: pointer;
    border: 0;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    opacity: 0.2;
    transition: opacity 0.2s;
  }

  .embla-thumbs__slide.is-selected .embla-thumbs__slide__button {
    opacity: 1;
  }

  .embla-thumbs__slide__img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .embla-thumbs__slide__number {
    ${createSquareSizeStyles('3rem')}
    z-index: ${LAYERS.STEP};
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: rgba(${COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.85);
    line-height: 3rem;
    font-weight: 500;
    text-align: center;
    pointer-events: none;
    border-top-left-radius: 0.4rem;
  }

  .embla-thumbs__slide__number > span {
    ${gradientTextStyles}
    font-size: 1.4rem;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

const PROGRESS_STYLES = css`
  .embla__progress {
    z-index: ${LAYERS.STEP};
    background-color: ${COLORS.BACKGROUND_SITE};
    position: absolute;
    height: 0.3rem;
    border-radius: 0.2rem;
    left: 0;
    right: 0;
    bottom: 2.6rem;
    margin-left: auto;
    margin-right: auto;
    pointer-events: none;
    width: 21rem;
    max-width: 90%;
    overflow: hidden;
  }

  .embla__progress__bar {
    ${gradientBackgroundStyles};
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: -100%;
  }
`

const PARALLAX_STYLES = css`
  .embla__parallax {
    height: 100%;
    overflow: hidden;
  }

  .embla__parallax__layer {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .embla__parallax__img {
    max-width: none;
    width: calc(100% + (1rem * 2));
    margin-left: -1rem;
  }
`

const SCALE_STYLES = css`
  .embla__scale {
    height: 100%;
    position: relative;
    backface-visibility: hidden;
  }
`

const LAZY_LOAD_STYLES = css`
  .embla__lazy-load {
    position: relative;
    height: 100%;
  }

  .embla__lazy-load__spinner {
    border: 0.4rem solid rgba(${COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.2);
    border-left: 0.4rem solid ${COLORS.TEXT_HIGH_CONTRAST};
    font-size: 1rem;
    display: inline-flex;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    text-indent: -9999em;
    animation: loading 1.1s infinite linear;
    border-radius: 50%;
    ${createSquareSizeStyles('5rem')};

    @keyframes loading {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  .embla__lazy-load__spinner:after {
    border-radius: inherit;
    ${createSquareSizeStyles('5rem')};
  }

  .embla__lazy-load__img {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .embla__lazy-load.has-loaded .embla__lazy-load__img {
    opacity: 1;
  }
`

const CLASS_NAMES_STYLES = css`
  .embla__class-names {
    transition: opacity 0.2s ease-in-out;
  }

  .embla__class-names:not(.is-selected) {
    opacity: 0.16;
  }
`

const INFINITE_SCROLL_STYLES = css`
  .embla__slide__loading {
    position: relative;
    flex: 0 0 15rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .embla__slide__loading__spinner {
    border: 0.4rem solid rgba(${COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.2);
    border-left: 0.4rem solid ${COLORS.TEXT_HIGH_CONTRAST};
    font-size: 1rem;
    display: inline-flex;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    text-indent: -9999em;
    animation: loading 1.1s infinite linear;
    border-radius: 50%;
    ${createSquareSizeStyles('5rem')};

    @keyframes loading {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  .embla__slide__loading__spinner:after {
    border-radius: inherit;
    ${createSquareSizeStyles('5rem')};
  }
`

const IOS_PICKER_STYLES = css`
  .embla {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    max-width: 30rem;
    margin-left: auto;
    margin-right: auto;
    &:before,
    &:after {
      position: absolute;
      left: 0;
      right: 0;
      content: '';
      display: block;
      height: calc(50% - 32px / 2);
      z-index: ${LAYERS.STEP};
      pointer-events: none;
    }
    &:before {
      top: -0.5px;
      border-bottom: 0.5px solid
        rgba(${COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.3);
      background: linear-gradient(
        to top,
        rgba(${COLORS.BACKGROUND_CODE_RGB_VALUE}, 0.65) 0%,
        rgba(${COLORS.BACKGROUND_CODE_RGB_VALUE}, 1) 100%
      );
    }
    &:after {
      bottom: -0.5px;
      border-top: 0.5px solid rgba(${COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.3);
      background: linear-gradient(
        to bottom,
        rgba(${COLORS.BACKGROUND_CODE_RGB_VALUE}, 0.65) 0%,
        rgba(${COLORS.BACKGROUND_CODE_RGB_VALUE}, 1) 100%
      );
    }
  }

  .embla__ios-picker {
    height: 100%;
    display: flex;
    align-items: center;
    min-width: 50%;
    line-height: 1;
    font-size: 1.8rem;
  }

  .embla__ios-picker__scene {
    min-width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .embla__ios-picker__viewport {
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
  }

  .embla__ios-picker__container {
    height: 32px;
    width: 100%;
    perspective: 1000px;
  }

  .embla__ios-picker__container--perspective-left {
    perspective-origin: 150% center;
    transform: translateX(-8px) !important;
  }

  .embla__ios-picker__container--perspective-right {
    perspective-origin: -50% center;
    transform: translateX(-32px) !important;
  }

  .embla__ios-picker__slide {
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
  }

  .embla__ios-picker__label {
    font-weight: bold;
    pointer-events: none;
  }

  .embla__ios-picker__label--perspective-left {
    transform: translate(-76px);
  }

  .embla__ios-picker__label--perspective-right {
    transform: translate(-70px);
  }
`

export const createCarouselDefaultStyles = (
  slideSize: string = '100%',
  spacingSize: string = '1rem',
  axis: EmblaOptionsType['axis'] = 'x',
  customStyles: FlattenSimpleInterpolation = [],
): string => {
  const horizontal = axis === 'x'
  const flexDirection = horizontal ? 'row' : 'column'
  const spacingDirection = horizontal ? 'left' : 'top'
  const height = horizontal
    ? CAROUSEL_DEFAULT_HEIGHT
    : `calc(${CAROUSEL_DEFAULT_HEIGHT} + ${spacingSize})`

  const baseStyles = BASE_STYLES.join('')
    .replace(/__replace_axis_flex__/gi, flexDirection)
    .replace(/__replace_axis_spacing__/gi, spacingDirection)
    .replace(/__replace_axis_spacing_amount__/gi, spacingSize)
    .replace(/__replace_axis_height__/gi, height)
    .replace(/__replace_slide_size__/gi, slideSize)

  return baseStyles + customStyles.join('')
}

export const createCarouselVariableWidthStyles = (
  slideSize: string = '100%',
  spacingSize: string = '1rem',
  axis: EmblaOptionsType['axis'] = 'x',
): string => {
  return createCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    VARIABLE_WIDTH_STYLES,
  )
}

export const createCarouselArrowsDotsStyles = (
  slideSize: string = '100%',
  spacingSize: string = '1rem',
  axis: EmblaOptionsType['axis'] = 'x',
): string => {
  return createCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    ARROWS_DOTS_STYLES,
  )
}

export const createCarouselThumbsStyles = (
  slideSize: string = '100%',
  spacingSize: string = '1rem',
  axis: EmblaOptionsType['axis'] = 'x',
): string => {
  return createCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    THUMBS_STYLES,
  )
}

export const createCarouselProgressStyles = (
  slideSize: string = '100%',
  spacingSize: string = '1rem',
  axis: EmblaOptionsType['axis'] = 'x',
): string => {
  return createCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    PROGRESS_STYLES,
  )
}

export const createCarouselParallaxStyles = (
  slideSize: string = '100%',
  spacingSize: string = '1rem',
  axis: EmblaOptionsType['axis'] = 'x',
): string => {
  return createCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    PARALLAX_STYLES,
  )
}

export const createCarouselScaleStyles = (
  slideSize: string = '100%',
  spacingSize: string = '1rem',
  axis: EmblaOptionsType['axis'] = 'x',
): string => {
  return createCarouselDefaultStyles(slideSize, spacingSize, axis, SCALE_STYLES)
}

export const createCarouselClassNamesStyles = (
  slideSize: string = '100%',
  spacingSize: string = '1rem',
  axis: EmblaOptionsType['axis'] = 'x',
): string => {
  return createCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    CLASS_NAMES_STYLES,
  )
}

export const createCarouselLazyLoadStyles = (
  slideSize: string = '100%',
  spacingSize: string = '1rem',
  axis: EmblaOptionsType['axis'] = 'x',
): string => {
  return createCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    LAZY_LOAD_STYLES,
  )
}

export const createCarouselInfiniteScrollStyles = (
  slideSize: string = '100%',
  spacingSize: string = '1rem',
  axis: EmblaOptionsType['axis'] = 'x',
): string => {
  return createCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    INFINITE_SCROLL_STYLES,
  )
}

export const createCarouselIosPickerStyles = (
  slideSize: string = '100%',
  spacingSize: string = '1rem',
  axis: EmblaOptionsType['axis'] = 'x',
): string => {
  return createCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    IOS_PICKER_STYLES,
  )
}

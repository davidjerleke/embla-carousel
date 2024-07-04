import { css } from 'styled-components'
import { LAYERS } from 'consts/layers'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { BORDER_RADIUSES, BORDER_SIZES } from 'consts/border'
import { MEDIA } from 'consts/breakpoints'
import { FONT_SIZES, FONT_WEIGHTS } from 'consts/fontSizes'
import { EmblaOptionsType } from 'embla-carousel'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { TAP_HIGHLIGHT_STYLES } from 'consts/tapHighlight'

const CAROUSEL_MAX_WIDTH = '48rem'
export const CAROUSEL_DEFAULT_HEIGHT = '19rem'
export const CAROUSEL_SLIDES_SPACING = '1rem'

export const CAROUSEL_THUMB_SLIDES_HEIGHT = '6rem'
export const CAROUSEL_THUMB_SLIDES_SPACING = '0.8rem'

export const CAROUSEL_IOS_PICKER_HEIGHT = '22.2rem'

export const CAROUSEL_NAV_BUTTON_SIZE = SPACINGS.SIX
export const CAROUSEL_CONTROLS_SPACING = SPACINGS.THREE

export const CAROUSEL_SLIDE_RADIUS_STYLES = css`
  border-radius: ${BORDER_RADIUSES.SOFT};
`

export const CAROUSEL_BORDER_SHADOW_STYLES = css`
  box-shadow: inset 0 0 0 ${BORDER_SIZES.OUTLINE}
    ${COLORS.DETAIL_MEDIUM_CONTRAST};
`

export const CAROUSEL_BUTTON_BASE_STYLES = css`
  ${TAP_HIGHLIGHT_STYLES};
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  touch-action: manipulation;
  display: inline-flex;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;
`

export const BASE_STYLES = css`
  .embla {
    max-width: ${CAROUSEL_MAX_WIDTH};
    margin: auto;
    
    --slide-height: ${CAROUSEL_DEFAULT_HEIGHT};
    --slide-spacing: __replace_axis_spacing_amount__;
    --slide-size: __replace_slide_size__;
  }
  
  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    backface-visibility: hidden;
    display: flex;
    touch-action: __replace-axis-touch_action__;
    margin-__replace_axis_spacing__: calc(var(--slide-spacing) * -1);
    __replace_axis_height__
    __replace_axis_flex__
  }

  .embla__slide {
    flex: 0 0 var(--slide-size);
    min-__replace-axis-size__: 0;
    padding-__replace_axis_spacing__: var(--slide-spacing);
  }
`

export const SLIDES_PER_VIEW_STYLES = css`
  .embla {
    max-width: 70rem;
    margin: auto;

    --slide-height: ${CAROUSEL_DEFAULT_HEIGHT};
    --slide-spacing: 1rem;
    --slide-size: 100%;
    --slide-spacing-sm: 1.6rem;
    --slide-size-sm: 50%;
    --slide-spacing-lg: 2rem;
    --slide-size-lg: calc(100% / 3);
  }

  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    backface-visibility: hidden;
    display: flex;
    touch-action: __replace-axis-touch_action__;
    margin-__replace_axis_spacing__: calc(var(--slide-spacing) * -1);
    __replace_axis_height__
    __replace_axis_flex__
  }

  ${MEDIA.MIN_SM} {
    .embla__container {
      margin-__replace_axis_spacing__: calc(var(--slide-spacing-sm) * -1);
    }
  }
  ${MEDIA.MIN_LG} {
    .embla__container {
      margin-__replace_axis_spacing__: calc(var(--slide-spacing-lg) * -1);
    }
  }


  .embla__slide {
    min-__replace-axis-size__: 0;
    flex: 0 0 var(--slide-size);
    padding-__replace_axis_spacing__: var(--slide-spacing);
  }

  ${MEDIA.MIN_SM} {
    .embla__slide {
      flex: 0 0 var(--slide-size-sm);
      padding-__replace_axis_spacing__: var(--slide-spacing-sm);
    }
  }
  ${MEDIA.MIN_LG} {
    .embla__slide {
      flex: 0 0 var(--slide-size-lg);
      padding-__replace_axis_spacing__: var(--slide-spacing-lg);
    }
  }
`

export const SLIDE_NUMBER_STYLES = css`
  .embla__slide__number {
    ${CAROUSEL_BORDER_SHADOW_STYLES};
    ${CAROUSEL_SLIDE_RADIUS_STYLES};
    font-size: ${FONT_SIZES.CUSTOM(() => 4)};
    font-weight: ${FONT_WEIGHTS.SEMI_BOLD};
    display: flex;
    align-items: center;
    justify-content: center;
    height: __replace_slide_height__;
    user-select: none;
  }
`

export const IMAGE_STYLES = css`
  .embla__slide__img {
    ${CAROUSEL_SLIDE_RADIUS_STYLES};
    display: block;
    height: __replace_slide_height__;
    width: 100%;
    object-fit: cover;
  }
`

export const VARIABLE_WIDTH_STYLES = css`
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
    flex: 0 0 50%;
  }
  .embla__slide:nth-child(9) {
    flex: 0 0 35%;
  }
`

export const CONTROLS_STYLES = css`
  .embla__controls {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    gap: ${SPACINGS.TWO};
    margin-top: ${CAROUSEL_CONTROLS_SPACING};
  }
`

export const ARROWS_STYLES = css`
  .embla__buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${SPACINGS.ONE};
    align-items: center;
  }

  .embla__button {
    ${CAROUSEL_BUTTON_BASE_STYLES};
    ${CAROUSEL_BORDER_SHADOW_STYLES};
    ${createSquareSizeStyles(CAROUSEL_NAV_BUTTON_SIZE)}
    z-index: ${LAYERS.STEP};
    border-radius: ${BORDER_RADIUSES.CIRCLE};
    color: ${COLORS.TEXT_BODY};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .embla__button:disabled {
    color: ${COLORS.DETAIL_HIGH_CONTRAST};
  }

  .embla__button__svg {
    ${createSquareSizeStyles('35%')}
  }
`

export const DOTS_STYLES = css`
  .embla__dots {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    margin-right: calc((2.6rem - 1.4rem) / 2 * -1);
  }

  .embla__dot {
    ${CAROUSEL_BUTTON_BASE_STYLES};
    ${createSquareSizeStyles('2.6rem')}
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${BORDER_RADIUSES.CIRCLE};
  }

  .embla__dot:after {
    ${CAROUSEL_BORDER_SHADOW_STYLES};
    ${createSquareSizeStyles('1.4rem')}
    border-radius: ${BORDER_RADIUSES.CIRCLE};
    display: flex;
    align-items: center;
    content: '';
  }

  .embla__dot--selected:after {
    box-shadow: inset 0 0 0 ${BORDER_SIZES.OUTLINE} ${COLORS.TEXT_BODY};
  }
`

export const SNAP_DISPLAY_STYLES = css`
  .embla__selected-snap-display {
    justify-self: flex-end;
    align-self: center;
    color: ${COLORS.TEXT_LOW_CONTRAST};
    font-weight: ${FONT_WEIGHTS.SEMI_BOLD};
  }
`

export const PLAY_BUTTON_STYLES = css`
  .embla__play {
    ${CAROUSEL_BUTTON_BASE_STYLES};
    ${CAROUSEL_BORDER_SHADOW_STYLES};
    ${CAROUSEL_SLIDE_RADIUS_STYLES};
    display: flex;
    align-items: center;
    justify-content: center;
    justify-self: flex-end;
    color: ${COLORS.TEXT_BODY};
    font-weight: ${FONT_WEIGHTS.BOLD};
    font-size: ${FONT_SIZES.COMPLEMENTARY};
    padding: 0 ${SPACINGS.FOUR};
    min-width: ${SPACINGS.FOURTEEN};
  }
`

export const THUMBS_STYLES = css`
  .embla-thumbs {
    --thumbs-slide-spacing: ${CAROUSEL_THUMB_SLIDES_SPACING};
    --thumbs-slide-height: ${CAROUSEL_THUMB_SLIDES_HEIGHT};
    margin-top: var(--thumbs-slide-spacing);
  }

  .embla-thumbs__viewport {
    overflow: hidden;
  }

  .embla-thumbs__container {
    display: flex;
    flex-direction: row;
    margin-left: calc(var(--thumbs-slide-spacing) * -1);
  }

  .embla-thumbs__slide {
    flex: 0 0 22%;
    min-__replace-axis-size__: 0;
    padding-left: var(--thumbs-slide-spacing);
  }

  ${MEDIA.MIN_XS} {
    .embla-thumbs__slide {
      flex: 0 0 15%;
    }
  }

  .embla-thumbs__slide__number {
    ${CAROUSEL_SLIDE_RADIUS_STYLES};
    ${CAROUSEL_BUTTON_BASE_STYLES};
    ${CAROUSEL_BORDER_SHADOW_STYLES};
    font-size: ${FONT_SIZES.H4};
    font-weight: ${FONT_WEIGHTS.SEMI_BOLD};
    color: ${COLORS.DETAIL_HIGH_CONTRAST};
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--thumbs-slide-height);
    width: 100%;
  }

  .embla-thumbs__slide--selected .embla-thumbs__slide__number {
    color: ${COLORS.TEXT_BODY};
  }
`

export const PROGRESS_STYLES = css`
  .embla__progress {
    ${CAROUSEL_SLIDE_RADIUS_STYLES};
    ${CAROUSEL_BORDER_SHADOW_STYLES};
    background-color: ${COLORS.BACKGROUND_SITE};
    position: relative;
    height: 0.6rem;
    justify-self: flex-end;
    align-self: center;
    width: 13rem;
    max-width: 90%;
    overflow: hidden;
  }

  .embla__progress__bar {
    background-color: ${COLORS.TEXT_BODY};
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: -100%;
  }
`

export const PARALLAX_STYLES = css`
  .embla__parallax {
    ${CAROUSEL_SLIDE_RADIUS_STYLES};
    height: 100%;
    overflow: hidden;
  }

  .embla__parallax__layer {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .embla__parallax__img {
    max-width: none;
    flex: 0 0 calc(115% + (var(--slide-spacing) * 2));
    object-fit: cover;
  }
`

const SCALE_STYLES = css`
  .embla__slide__number {
    backface-visibility: hidden;
  }
`

const LAZY_LOAD_STYLES = css`
  .embla__lazy-load {
    position: relative;
    height: 100%;
  }

  .embla__lazy-load__spinner {
    border: ${BORDER_SIZES.ACCENT_VERTICAL} solid
      rgba(${COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.2);
    border-left: ${BORDER_SIZES.ACCENT_VERTICAL} solid
      ${COLORS.TEXT_HIGH_CONTRAST};
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
    border-radius: ${BORDER_RADIUSES.CIRCLE};
    ${createSquareSizeStyles('5rem')}
  }

  .embla__lazy-load__spinner:after {
    border-radius: inherit;
    ${createSquareSizeStyles('5rem')}
  }

  .embla__lazy-load__img {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .embla__lazy-load--has-loaded .embla__lazy-load__img {
    opacity: 1;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const AUTO_HEIGHT_STYLES = css`
  .embla__container {
    align-items: flex-start;
  }

  .embla__slide:nth-child(1) > .embla__slide__number {
    height: ${CAROUSEL_DEFAULT_HEIGHT};
  }
  .embla__slide:nth-child(2) > .embla__slide__number {
    height: calc(${CAROUSEL_DEFAULT_HEIGHT} + 4rem);
  }
  .embla__slide:nth-child(3) > .embla__slide__number {
    height: calc(${CAROUSEL_DEFAULT_HEIGHT} - 2rem);
  }
  .embla__slide:nth-child(4) > .embla__slide__number {
    height: calc(${CAROUSEL_DEFAULT_HEIGHT} + 2rem);
  }
  .embla__slide:nth-child(5) > .embla__slide__number {
    height: ${CAROUSEL_DEFAULT_HEIGHT};
  }
`

const CLASS_NAMES_STYLES = css`
  .embla__slide {
    transition: opacity 0.2s ease-in-out;
  }

  .embla__slide:not(.is-snapped) {
    opacity: 0.16;
  }
`

const FADE_STYLES = css`
  .embla__slide__img {
    user-select: none;
  }
`

export const INFINITE_SCROLL_STYLES = css`
  .embla-infinite-scroll {
    position: relative;
    flex: 0 0 15rem;
    min-__replace-axis-size__: 0;
    height: var(--slide-height);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .embla-infinite-scroll__spinner {
    display: none;
    border: ${BORDER_SIZES.ACCENT_VERTICAL} solid
      rgba(${COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.2);
    border-left: ${BORDER_SIZES.ACCENT_VERTICAL} solid
      ${COLORS.TEXT_HIGH_CONTRAST};
    font-size: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    text-indent: -9999em;
    animation: loading 1.1s infinite linear;
    border-radius: ${BORDER_RADIUSES.CIRCLE};
    ${createSquareSizeStyles('5rem')}
  }

  .embla-infinite-scroll__spinner:after {
    border-radius: inherit;
    ${createSquareSizeStyles('5rem')}
  }

  .embla-infinite-scroll--loading-more > .embla-infinite-scroll__spinner {
    display: inline-flex;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const IOS_PICKER_STYLES = css`
  .embla {
    position: relative;
    display: flex;
    width: 100%;
    height: ${CAROUSEL_IOS_PICKER_HEIGHT};
    max-width: 30rem;
    margin-left: auto;
    margin-right: auto;
  }

  .embla:before,
  .embla:after {
    position: absolute;
    left: 0;
    right: 0;
    content: '';
    display: block;
    height: calc(50% - 32px / 2);
    z-index: ${LAYERS.STEP};
    pointer-events: none;
  }

  .embla:before {
    top: -0.5px;
    border-bottom: 0.5px solid rgba(${COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.3);
    background: linear-gradient(
      to top,
      rgba(${COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.65) 0%,
      rgba(${COLORS.BACKGROUND_SITE_RGB_VALUE}, 1) 100%
    );
  }

  .embla:after {
    bottom: -0.5px;
    border-top: 0.5px solid rgba(${COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.3);
    background: linear-gradient(
      to bottom,
      rgba(${COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.65) 0%,
      rgba(${COLORS.BACKGROUND_SITE_RGB_VALUE}, 1) 100%
    );
  }

  .embla__ios-picker {
    height: 100%;
    display: flex;
    align-items: center;
    min-width: 50%;
    justify-content: center;
    line-height: 1;
    font-size: 1.8rem;
  }

  .embla__ios-picker__scene {
    min-width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    touch-action: pan-x;
  }

  .embla__ios-picker__viewport {
    height: 32px;
    width: 100%;
    perspective: 1000px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .embla__ios-picker__viewport--perspective-left {
    perspective-origin: calc(50% + 130px) 50%;
    transform: translateX(27px);
  }

  .embla__ios-picker__viewport--perspective-right {
    perspective-origin: calc(50% - 130px) 50%;
    transform: translateX(-27px);
  }

  .embla__ios-picker__container {
    height: 100%;
    width: 100%;
    transform-style: preserve-3d;
    will-change: transform;
  }

  .embla__ios-picker__slide {
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
    font-weight: ${FONT_WEIGHTS.BOLD};
    transform: translateX(-55px);
    pointer-events: none;
  }
`

export const examplesCarouselDefaultStyles = (
  slideSize: string = '100%',
  spacingSize: string = CAROUSEL_SLIDES_SPACING,
  axis: EmblaOptionsType['axis'] = 'x',
  customStyles: string = '',
  baseStyles: string = styledComponentsStylesToString(BASE_STYLES)
): string => {
  const horizontal = axis === 'x'
  const flexDirection = horizontal ? '' : 'flex-direction: column;'
  const spacingDirection = horizontal ? 'left' : 'top'
  const panDirection = `pan-${horizontal ? 'y' : 'x'} pinch-zoom`
  const sizeDimention = horizontal ? 'width' : 'height'
  const slideHeight = horizontal ? 'var(--slide-height)' : '100%'
  const containerHeight = horizontal
    ? ''
    : 'height: calc(var(--slide-spacing) + var(--slide-height));'

  const mergedStyles = baseStyles + customStyles

  return mergedStyles
    .replace(/__replace_axis_flex__/gi, flexDirection)
    .replace(/__replace-axis-size__/gi, sizeDimention)
    .replace(/__replace-axis-touch_action__/gi, panDirection)
    .replace(/__replace_axis_spacing__/gi, spacingDirection)
    .replace(/__replace_axis_spacing_amount__/gi, spacingSize)
    .replace(/__replace_axis_height__/gi, containerHeight)
    .replace(/__replace_slide_height__/gi, slideHeight)
    .replace(/__replace_slide_size__/gi, slideSize)
}

export const examplesCarouselDragFreeStyles = (
  slideSize?: string,
  spacingSize?: string,
  axis?: EmblaOptionsType['axis']
): string => {
  return examplesCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    styledComponentsStylesToString(
      SLIDE_NUMBER_STYLES,
      CONTROLS_STYLES,
      ARROWS_STYLES,
      SNAP_DISPLAY_STYLES
    )
  )
}

export const examplesCarouselVariableWidthStyles = (
  slideSize?: string,
  spacingSize?: string,
  axis?: EmblaOptionsType['axis']
): string => {
  return examplesCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    styledComponentsStylesToString(
      VARIABLE_WIDTH_STYLES,
      SLIDE_NUMBER_STYLES,
      CONTROLS_STYLES,
      ARROWS_STYLES,
      SNAP_DISPLAY_STYLES
    )
  )
}

export const examplesCarouselSlidesPerViewStyles = (
  slideSize?: string,
  spacingSize?: string,
  axis?: EmblaOptionsType['axis']
): string => {
  return examplesCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    styledComponentsStylesToString(
      SLIDE_NUMBER_STYLES,
      CONTROLS_STYLES,
      ARROWS_STYLES,
      DOTS_STYLES
    ),
    styledComponentsStylesToString(SLIDES_PER_VIEW_STYLES)
  )
}

export const examplesCarouselThumbsStyles = (
  slideSize?: string,
  spacingSize?: string,
  axis?: EmblaOptionsType['axis']
): string => {
  return examplesCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    styledComponentsStylesToString(SLIDE_NUMBER_STYLES, THUMBS_STYLES)
  )
}

export const examplesCarouselProgressStyles = (
  slideSize?: string,
  spacingSize?: string,
  axis?: EmblaOptionsType['axis']
): string => {
  return examplesCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    styledComponentsStylesToString(
      SLIDE_NUMBER_STYLES,
      CONTROLS_STYLES,
      ARROWS_STYLES,
      PROGRESS_STYLES
    )
  )
}

export const examplesCarouselParallaxStyles = (
  slideSize?: string,
  spacingSize?: string,
  axis?: EmblaOptionsType['axis']
): string => {
  return examplesCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    styledComponentsStylesToString(
      IMAGE_STYLES,
      CONTROLS_STYLES,
      ARROWS_STYLES,
      DOTS_STYLES,
      PARALLAX_STYLES
    )
  )
}

export const examplesCarouselScaleStyles = (
  slideSize?: string,
  spacingSize?: string,
  axis?: EmblaOptionsType['axis']
): string => {
  return examplesCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    styledComponentsStylesToString(
      SLIDE_NUMBER_STYLES,
      CONTROLS_STYLES,
      ARROWS_STYLES,
      DOTS_STYLES,
      SCALE_STYLES
    )
  )
}

export const examplesCarouselOpacityStyles = (
  slideSize?: string,
  spacingSize?: string,
  axis?: EmblaOptionsType['axis']
): string => {
  return examplesCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    styledComponentsStylesToString(
      IMAGE_STYLES,
      CONTROLS_STYLES,
      ARROWS_STYLES,
      DOTS_STYLES
    )
  )
}

export const examplesCarouselAutoplayStyles = (
  slideSize?: string,
  spacingSize?: string,
  axis?: EmblaOptionsType['axis']
): string => {
  return examplesCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    styledComponentsStylesToString(
      SLIDE_NUMBER_STYLES,
      CONTROLS_STYLES,
      ARROWS_STYLES,
      PLAY_BUTTON_STYLES
    )
  )
}

export const examplesCarouselAutoHeightStyles = (
  slideSize?: string,
  spacingSize?: string,
  axis?: EmblaOptionsType['axis']
): string => {
  return examplesCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    styledComponentsStylesToString(
      SLIDE_NUMBER_STYLES,
      CONTROLS_STYLES,
      ARROWS_STYLES,
      DOTS_STYLES,
      AUTO_HEIGHT_STYLES
    )
  )
}

export const examplesCarouselClassNamesStyles = (
  slideSize?: string,
  spacingSize?: string,
  axis?: EmblaOptionsType['axis']
): string => {
  return examplesCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    styledComponentsStylesToString(
      IMAGE_STYLES,
      CONTROLS_STYLES,
      ARROWS_STYLES,
      DOTS_STYLES,
      CLASS_NAMES_STYLES
    )
  )
}

export const examplesCarouselFadeStyles = (
  slideSize?: string,
  spacingSize?: string,
  axis?: EmblaOptionsType['axis']
): string => {
  return examplesCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    styledComponentsStylesToString(
      IMAGE_STYLES,
      CONTROLS_STYLES,
      ARROWS_STYLES,
      DOTS_STYLES,
      FADE_STYLES
    )
  )
}

export const examplesCarouselLazyLoadStyles = (
  slideSize?: string,
  spacingSize?: string,
  axis?: EmblaOptionsType['axis']
): string => {
  return examplesCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    styledComponentsStylesToString(
      IMAGE_STYLES,
      CONTROLS_STYLES,
      ARROWS_STYLES,
      DOTS_STYLES,
      LAZY_LOAD_STYLES
    )
  )
}

export const examplesCarouselInfiniteScrollStyles = (
  slideSize?: string,
  spacingSize?: string,
  axis?: EmblaOptionsType['axis']
): string => {
  return examplesCarouselDefaultStyles(
    slideSize,
    spacingSize,
    axis,
    styledComponentsStylesToString(
      SLIDE_NUMBER_STYLES,
      CONTROLS_STYLES,
      ARROWS_STYLES,
      SNAP_DISPLAY_STYLES,
      INFINITE_SCROLL_STYLES
    )
  )
}

export const examplesCarouselIosPickerStyles = (): string => {
  return styledComponentsStylesToString(IOS_PICKER_STYLES)
}

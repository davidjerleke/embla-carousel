import { css } from 'styled-components'
import { LAYERS } from 'consts/layers'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { BORDER_RADIUSES, BORDER_SIZES } from 'consts/border'
import { FONT_SIZES, FONT_WEIGHTS } from 'consts/fontSizes'
import { EmblaOptionsType } from 'embla-carousel'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { TAP_HIGHLIGHT_STYLES } from 'consts/tapHighlight'

export const CAROUSEL_MAX_WIDTH = '48rem'

export const CAROUSEL_DEFAULT_HEIGHT = '19rem'
export const CAROUSEL_SLIDES_SPACING = '1rem'

export const CAROUSEL_THUMB_SLIDES_HEIGHT = '6rem'
export const CAROUSEL_THUMB_SLIDES_SPACING = '0.8rem'

export const CAROUSEL_IOS_PICKER_HEIGHT = '22.2rem'

export const CAROUSEL_NAV_BUTTON_SIZE = '3.6rem'
export const CAROUSEL_CONTROLS_SPACING = '1.8rem'

export const CAROUSEL_SCROLLBAR_HEIGHT = '1.6rem'
export const CAROUSEL_SCROLLBAR_TRACK_HEIGHT = '0.6rem'
export const CAROUSEL_SCROLLBAR_SPACING = CAROUSEL_CONTROLS_SPACING

export const CAROUSEL_SLIDE_RADIUS_STYLES = css`
  border-radius: ${BORDER_RADIUSES.SOFT};
`

export const CAROUSEL_BORDER_STYLES = css`
  border: ${BORDER_SIZES.OUTLINE} solid ${COLORS.DETAIL_MEDIUM_CONTRAST};
`

export const CAROUSEL_BASE_IMAGE_STYLES = css`
  display: block;
  height: var(--slide-height);
  width: 100%;
  object-fit: cover;
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

export const DEFAULT_BUTTON_STYLES = css`
  ${TAP_HIGHLIGHT_STYLES};
  ${CAROUSEL_BUTTON_BASE_STYLES};
  ${CAROUSEL_BORDER_STYLES};
  ${CAROUSEL_SLIDE_RADIUS_STYLES};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.TEXT_BODY};
  font-weight: ${FONT_WEIGHTS.BOLD};
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  padding: 0 ${SPACINGS.FOUR};
  min-height: ${CAROUSEL_NAV_BUTTON_SIZE};
`

export const INPUT_STYLES = css`
  .embla__input {
    ${TAP_HIGHLIGHT_STYLES};
    -webkit-appearance: none;
    appearance: none;
    touch-action: manipulation;
    color: ${COLORS.TEXT_BODY};
    background-color: ${COLORS.BACKGROUND_CODE};
    border: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
    padding: ${SPACINGS.ONE} ${SPACINGS.TWO};
    font-size: ${FONT_SIZES.BODY};
    min-height: ${CAROUSEL_NAV_BUTTON_SIZE};
    text-align: center;
  }

  .embla__input {
    -moz-appearance: textfield;
  }

  .embla__input::-webkit-inner-spin-button,
  .embla__input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const BASE_STYLES = css`
  .embla {
    max-width: ${CAROUSEL_MAX_WIDTH};
    margin: auto;

    --slide-height: ${CAROUSEL_DEFAULT_HEIGHT};
    --slide-spacing: 1rem;
    --slide-size: 100%;
  }

  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
    margin-left: calc(var(--slide-spacing) * -1);
  }

  .embla__slide {
    flex: 0 0 var(--slide-size);
    min-width: 0;
    padding-left: var(--slide-spacing);
  }
`

export const BASE_STYLES_VERTICAL = css`
  .embla {
    max-width: ${CAROUSEL_MAX_WIDTH};
    margin: auto;

    --slide-height: ${CAROUSEL_DEFAULT_HEIGHT};
    --slide-spacing: 1rem;
    --slide-size: 100%;
  }

  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    touch-action: pan-x pinch-zoom;
    margin-top: calc(var(--slide-spacing) * -1);
    height: calc(var(--slide-spacing) + var(--slide-height));
    flex-direction: column;
  }

  .embla__slide {
    flex: 0 0 var(--slide-size);
    min-height: 0;
    padding-top: var(--slide-spacing);
  }
`

export const SLIDE_NUMBER_STYLES = css`
  .embla__slide__number {
    ${CAROUSEL_BORDER_STYLES};
    ${CAROUSEL_SLIDE_RADIUS_STYLES};
    font-size: ${FONT_SIZES.CUSTOM(() => 4)};
    font-weight: ${FONT_WEIGHTS.SEMI_BOLD};
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--slide-height);
    user-select: none;
  }
`

export const IMAGE_STYLES = css`
  .embla__slide__img {
    ${CAROUSEL_BASE_IMAGE_STYLES};
  }
`

export const IMAGE_ROUNDED_STYLES = css`
  .embla__slide__img {
    ${CAROUSEL_BASE_IMAGE_STYLES};
    ${CAROUSEL_SLIDE_RADIUS_STYLES};
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
    ${CAROUSEL_BORDER_STYLES};
    ${createSquareSizeStyles(CAROUSEL_NAV_BUTTON_SIZE)}
    z-index: ${LAYERS.STEP};
    border-radius: ${BORDER_RADIUSES.CIRCLE};
    color: ${COLORS.TEXT_BODY};
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(0deg);
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
    position: relative;
  }

  .embla__dot:before,
  .embla__dot:after {
    ${createSquareSizeStyles('1.4rem')}
    border-radius: ${BORDER_RADIUSES.CIRCLE};
    position: absolute;
    display: flex;
    align-items: center;
    content: '';
  }

  .embla__dot:before {
    border: ${BORDER_SIZES.OUTLINE} solid ${COLORS.DETAIL_MEDIUM_CONTRAST};
  }

  .embla__dot:after {
    border: ${BORDER_SIZES.OUTLINE} solid ${COLORS.TEXT_BODY};
    opacity: 0;
  }

  .embla__dot--selected:after {
    opacity: 1;
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
    ${DEFAULT_BUTTON_STYLES};
    min-width: ${SPACINGS.FIFTEEN};
    justify-self: flex-end;
  }
`

export const PROGRESS_STYLES = css`
  .embla__progress {
    ${CAROUSEL_SLIDE_RADIUS_STYLES};
    box-shadow: inset 0 0 0 ${BORDER_SIZES.OUTLINE}
      ${COLORS.DETAIL_MEDIUM_CONTRAST};
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

const SLIDE_SIZE_REGEX = /--slide-size:\s*100%;/gi
const SPACING_SIZE_REGEX = /--slide-spacing:\s*1rem;/gi
const SLIDE_HEIGHT_REGEX = /height\s*:\s*var\(\s*--slide-height\s*\)\s*;?/
const BUTTON_TRANSFORM_VALUE_REGEX = /transform\s*:\s*rotate\(0deg\)\s*;?/

const SLIDE_NUMBER_HEIGHT_REGEX =
  /\.embla__slide__number\s*\{[\s\S]*?\bheight\s*:\s*var\(\s*--slide-height\s*\)\s*;?[\s\S]*?\}/

const BUTTON_TRANSFORM_REGEX =
  /\.embla__button\s*\{[\s\S]*?\btransform\s*:\s*rotate\(0deg\)\s*;?[\s\S]*?\}/

export const examplesCarouselStyles = (
  slideSize: string = '100%',
  spacingSize: string = CAROUSEL_SLIDES_SPACING,
  options: EmblaOptionsType = {},
  customStyles: string = '',
  baseStyles: string = ''
): string => {
  const isHorizontal = options.axis !== 'y'
  const baseFallback = isHorizontal ? BASE_STYLES : BASE_STYLES_VERTICAL
  const isRightToLeft = options.direction === 'rtl'
  const rootStyles = baseStyles || styledComponentsStylesToString(baseFallback)
  const allStyles = rootStyles + customStyles

  return allStyles
    .replace(SLIDE_SIZE_REGEX, `--slide-size: ${slideSize};`)
    .replace(SPACING_SIZE_REGEX, `--slide-spacing: ${spacingSize};`)
    .replace(SLIDE_NUMBER_HEIGHT_REGEX, (match) => {
      const slideHeight = isHorizontal ? 'var(--slide-height)' : '100%'
      const value = `height: ${slideHeight};`
      return match.replace(SLIDE_HEIGHT_REGEX, value)
    })
    .replace(BUTTON_TRANSFORM_REGEX, (match) => {
      const baseDirection = isRightToLeft ? 'rotate(180deg)' : ''
      const buttonDirection = isHorizontal ? baseDirection : 'rotate(90deg)'
      const value = buttonDirection ? `transform: ${buttonDirection};` : ''
      return match.replace(BUTTON_TRANSFORM_VALUE_REGEX, value)
    })
}

import { LAYERS } from 'consts/layers'
import { COLORS } from 'consts/themes'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { gradientTextStyles } from 'utils/gradientTextStyles'
import { EmblaOptionsType } from 'embla-carousel'
import { css, FlattenSimpleInterpolation } from 'styled-components'

export const CAROUSEL_DEFAULT_HEIGHT = '19rem'

const CAROUSEL_DEFAULT_STYLES_TEMPLATE = css`
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

  const baseStyles = CAROUSEL_DEFAULT_STYLES_TEMPLATE.join('')
    .replace(/__replace_axis_flex__/gi, flexDirection)
    .replace(/__replace_axis_spacing__/gi, spacingDirection)
    .replace(/__replace_axis_spacing_amount__/gi, spacingSize)
    .replace(/__replace_axis_height__/gi, height)
    .replace(/__replace_slide_size__/gi, slideSize)

  return baseStyles + customStyles.join('')
}

import { FlattenSimpleInterpolation } from 'styled-components'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { CarouselGeneratorFormDataType } from 'consts/carouselGenerator'
import {
  ARROWS_STYLES,
  createCarouselDefaultStyles,
  DOTS_STYLES
} from 'components/Examples/createCarouselStyles'

export const createCarouselGeneratorStyles = (
  settings: CarouselGeneratorFormDataType
): string => {
  const {
    navigationPrevNextButtons,
    navigationDots,
    slideSize,
    slideGapSize,
    axis
  } = settings
  const styleList: FlattenSimpleInterpolation[] = []

  if (navigationPrevNextButtons) styleList.push(ARROWS_STYLES)
  if (navigationDots) styleList.push(DOTS_STYLES)

  return createCarouselDefaultStyles(
    `${slideSize}%`,
    `${parseFloat(slideGapSize) / 10}rem`,
    axis,
    styleList.map((styles) => styledComponentsStylesToString(styles)).join('')
  )
}

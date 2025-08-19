import { FlattenSimpleInterpolation } from 'styled-components'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { SandboxGeneratorSettingsType } from 'consts/sandbox'
import {
  examplesCarouselStyles,
  SLIDE_NUMBER_STYLES,
  CONTROLS_STYLES,
  ARROWS_STYLES,
  DOTS_STYLES
} from 'components/Examples/examplesCarouselStyles'

export const sandboxGeneratorCreateStyles = (
  settings: SandboxGeneratorSettingsType
): string => {
  const {
    navigationPrevNextButtons,
    navigationDots,
    slideSize,
    slideGapSize,
    axis,
    styles
  } = settings

  if (styles) return styles

  const styleList: FlattenSimpleInterpolation[] = [SLIDE_NUMBER_STYLES]
  const hasControls = navigationPrevNextButtons || navigationDots

  if (hasControls) styleList.push(CONTROLS_STYLES)
  if (navigationPrevNextButtons) styleList.push(ARROWS_STYLES)
  if (navigationDots) styleList.push(DOTS_STYLES)

  return examplesCarouselStyles(
    `${slideSize}%`,
    `${parseFloat(slideGapSize) / 10}rem`,
    axis,
    styledComponentsStylesToString(...styleList)
  )
}

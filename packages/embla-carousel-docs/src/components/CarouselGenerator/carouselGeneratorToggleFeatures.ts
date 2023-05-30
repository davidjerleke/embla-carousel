import { SandboxModuleType } from 'consts/sandbox'
import { CarouselGeneratorFormDataType } from 'consts/carouselGenerator'

const START = '{?\\/\\*'
const END = '\\*\\/}?'
const MIDDLE = `${END}([\\s\\S]*?)${START}`

const carouselGeneratorToggleFeature = (
  featureLabel: string,
  featureActive: boolean,
  carouselScript: string
): string => {
  let regexString = ''

  if (featureActive) {
    regexString = `(${START}__${featureLabel}_REPLACE_START__${END}\n?)|(${START}__${featureLabel}_REPLACE_END__${END}\n?)`
  } else {
    regexString = `${START}__${featureLabel}_REPLACE_START__${MIDDLE}__${featureLabel}_REPLACE_END__${END}\n?`
  }

  const regex = new RegExp(regexString, 'g')
  return carouselScript.replace(regex, '')
}

export const carouselGeneratorToggleFeatures = (
  carouselScript: SandboxModuleType,
  settings: CarouselGeneratorFormDataType
): string => {
  let carouselScriptWithFeatures = carouselScript.default
  const {
    axis,
    navigationPrevNextButtons,
    navigationDots,
    autoplay,
    direction
  } = settings
  const hasNavigation = navigationPrevNextButtons || navigationDots
  const hasAutoplayAndNavigation = autoplay && hasNavigation
  const isHorizontal = axis === 'x'
  const isLeftToRight = direction === 'ltr'
  const isRightToLeft = !isLeftToRight

  carouselScriptWithFeatures = carouselGeneratorToggleFeature(
    'PREV_NEXT_BUTTONS',
    navigationPrevNextButtons,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = carouselGeneratorToggleFeature(
    'DOT_BUTTONS',
    navigationDots,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = carouselGeneratorToggleFeature(
    'PLUGINS',
    autoplay,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = carouselGeneratorToggleFeature(
    'NAV_AUTOPLAY',
    hasAutoplayAndNavigation,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = carouselGeneratorToggleFeature(
    'DIRECTION_RTL',
    isRightToLeft,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = carouselGeneratorToggleFeature(
    'DIRECTION_LTR',
    isLeftToRight,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = carouselGeneratorToggleFeature(
    'PREV_NEXT_BUTTONS_LTR',
    isHorizontal && isLeftToRight && navigationPrevNextButtons,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = carouselGeneratorToggleFeature(
    'PREV_NEXT_BUTTONS_RTL',
    isHorizontal && isRightToLeft && navigationPrevNextButtons,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = carouselGeneratorToggleFeature(
    'PREV_NEXT_BUTTONS_VERTICAL',
    !isHorizontal && navigationPrevNextButtons,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = carouselGeneratorToggleFeature(
    'AUTOPLAY',
    autoplay,
    carouselScriptWithFeatures
  )

  return carouselScriptWithFeatures
}

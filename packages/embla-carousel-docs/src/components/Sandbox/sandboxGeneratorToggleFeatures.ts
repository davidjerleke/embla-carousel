import { SandboxModuleType } from 'consts/sandbox'
import { SandboxGeneratorSettingsType } from 'consts/sandbox'

const START = '{?\\/\\*'
const END = '\\*\\/}?'
const MIDDLE = `${END}([\\s\\S]*?)${START}`

const sandboxGeneratorToggleFeature = (
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

export const sandboxGeneratorToggleFeatures = (
  carouselScript: SandboxModuleType,
  settings: SandboxGeneratorSettingsType
): string => {
  let carouselScriptWithFeatures = carouselScript.default
  const {
    axis,
    direction,
    navigationPrevNextButtons,
    navigationDots,
    selectedSnapDisplay,
    autoplay,
    classNames
  } = settings
  const hasNavigation = navigationPrevNextButtons || navigationDots
  const hasAutoplayAndNavigation = autoplay && hasNavigation
  const isHorizontal = axis === 'x'
  const isLeftToRight = direction === 'ltr'
  const isRightToLeft = !isLeftToRight

  carouselScriptWithFeatures = sandboxGeneratorToggleFeature(
    'CONTROLS',
    hasNavigation || selectedSnapDisplay,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = sandboxGeneratorToggleFeature(
    'PREV_NEXT_BUTTONS',
    navigationPrevNextButtons,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = sandboxGeneratorToggleFeature(
    'DOT_BUTTONS',
    navigationDots,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = sandboxGeneratorToggleFeature(
    'SELECTED_SNAP_DISPLAY',
    selectedSnapDisplay,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = sandboxGeneratorToggleFeature(
    'NAV_AUTOPLAY',
    hasAutoplayAndNavigation,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = sandboxGeneratorToggleFeature(
    'DIRECTION_RTL',
    isRightToLeft,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = sandboxGeneratorToggleFeature(
    'DIRECTION_LTR',
    isLeftToRight,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = sandboxGeneratorToggleFeature(
    'PREV_NEXT_BUTTONS_LTR',
    isHorizontal && isLeftToRight && navigationPrevNextButtons,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = sandboxGeneratorToggleFeature(
    'PREV_NEXT_BUTTONS_RTL',
    isHorizontal && isRightToLeft && navigationPrevNextButtons,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = sandboxGeneratorToggleFeature(
    'PREV_NEXT_BUTTONS_VERTICAL',
    !isHorizontal && navigationPrevNextButtons,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = sandboxGeneratorToggleFeature(
    'PLUGINS',
    autoplay || classNames,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = sandboxGeneratorToggleFeature(
    'AUTOPLAY',
    autoplay,
    carouselScriptWithFeatures
  )
  carouselScriptWithFeatures = sandboxGeneratorToggleFeature(
    'CLASS_NAMES',
    classNames,
    carouselScriptWithFeatures
  )

  return carouselScriptWithFeatures
}

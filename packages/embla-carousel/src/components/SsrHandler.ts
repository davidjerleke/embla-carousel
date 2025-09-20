import { Axis, AxisType } from './Axis'
import { EngineType } from './Engine'
import { NodeHandlerType } from './NodeHandler'
import { OptionsType } from './Options'
import { OptionsHandlerType } from './OptionsHandler'
import { Translate } from './Translate'
import { mathSign } from './utils'

export type SsrHandlerType = {
  getStyles: (containerSelector: string, slidesSelector?: string) => string
}

export function SsrHandler(
  container: HTMLElement,
  axis: AxisType,
  nodeHandler: NodeHandlerType,
  options: OptionsType,
  mergeOptions: OptionsHandlerType['mergeOptions'],
  createEngine: (
    options: OptionsType,
    container: HTMLElement,
    slides: HTMLElement[]
  ) => EngineType
): SsrHandlerType {
  const translate = Translate(axis, container, '%')

  function createStyles(
    options: OptionsType,
    containerSelector: string,
    slidesSelector: string
  ): string {
    const { direction } = Axis(options.axis, options.direction)
    const { slides, container } = nodeHandler.getNodes(options)
    const { location, slideLooper, contentSize } = createEngine(
      options,
      container,
      slides
    )

    const loopPoints = options.loop ? slideLooper.loopPoints : []
    const containerLocation = direction(location)
    const containerSsr = translate.get(containerLocation)
    const baseStyles = `${containerSelector}{transform:${containerSsr};}`

    const loopStyles = loopPoints.reduce((styles, loopPoint) => {
      const { index } = loopPoint
      const sign = mathSign(loopPoint.target())
      const size = options.ssr[index]

      if (!sign || !size) return styles
      const slideLocation = direction((contentSize / size) * 100 * sign)
      const slideSsr = translate.get(slideLocation)

      return (
        styles +
        `${containerSelector} ${slidesSelector}:nth-child(${
          index + 1
        }){transform:${slideSsr};}`
      )
    }, '')

    return baseStyles + loopStyles
  }

  function getStyles(
    containerSelector: string,
    slidesSelector: string = '> *'
  ): string {
    if (!options.ssr.length) return ''

    const optionBreakpoints = options.breakpoints || {}
    const baseStyles = createStyles(options, containerSelector, slidesSelector)
    const mediaStyles = Object.keys(optionBreakpoints).reduce((styles, key) => {
      const optionsAtMedia = mergeOptions(options, optionBreakpoints[key])
      return (
        styles +
        `@media ${key}{${createStyles(
          optionsAtMedia,
          containerSelector,
          slidesSelector
        )}}`
      )
    }, '')

    return baseStyles + mediaStyles
  }

  const self: SsrHandlerType = {
    getStyles
  }
  return self
}

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
    const containerSsr = direction(location.get())

    return `
      ${containerSelector} {
        transform: ${translate.get(containerSsr)};
      }
      ${loopPoints.reduce((acc, loopPoint) => {
        const { index } = loopPoint
        const sign = mathSign(loopPoint.target())
        const size = options.ssr[index]

        if (!sign || !size) return acc
        const slideSsr = direction((contentSize / size) * 100 * sign)

        return `
          ${acc}
          ${containerSelector} ${slidesSelector}:nth-child(${index + 1}) {
            transform: ${translate.get(slideSsr)};
          }
        `
      }, '')}
    `
  }

  function getStyles(
    containerSelector: string,
    slidesSelector: string = '> *'
  ): string {
    if (!options.ssr.length) return ''
    const optionBreakpoints = options.breakpoints

    return `
      ${createStyles(options, containerSelector, slidesSelector)}

      ${Object.keys(optionBreakpoints).reduce((acc, key) => {
        const optionsAtMedia = mergeOptions(options, optionBreakpoints[key])

        return `
          ${acc}
          @media ${key} {
            ${createStyles(optionsAtMedia, containerSelector, slidesSelector)}
          }
        `
      }, '')}
    `
  }

  const self: SsrHandlerType = {
    getStyles
  }
  return self
}

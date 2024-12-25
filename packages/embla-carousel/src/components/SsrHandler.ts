import { Axis, AxisType } from './Axis'
import { EngineType } from './Engine'
import { NodeHandlerType } from './NodeHandler'
import { OptionsType } from './Options'
import { OptionsHandlerType } from './OptionsHandler'
import { Translate } from './Translate'
import { mathSign } from './utils'

// TODO: Enable SSR for library wrappers like React, Vue etc.
// TODO: Remove init event with timeout in EmblaCarousel.ts which won't work with SSR (deprecated)
// TODO: Enable SSR for plugins?

export type SsrHandlerType = {
  getStyles: (container: string, slides: string) => string
}

export function SsrHandler(
  isSsr: boolean,
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

  function getNormalizedEngine(options: OptionsType): EngineType {
    const normalizedOptions = mergeOptions(options, { direction: 'ltr' })
    const { slides, container } = nodeHandler.getNodes(normalizedOptions)
    return createEngine(normalizedOptions, container, slides)
  }

  function createStyles(
    options: OptionsType,
    container: string,
    slides: string
  ): string {
    const { direction } = Axis(options.axis, options.direction)
    const { location, slideLooper, contentSize } = getNormalizedEngine(options)
    const loopPoints = options.loop ? slideLooper.loopPoints : []
    const containerSsr = direction(location.get())

    return `
      ${container} {
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
        ${slides}:nth-child(${index + 1}) {
          transform: ${translate.get(slideSsr)};
        }
        `
      }, '')}
    `
  }

  function getStyles(container: string, slides: string): string {
    if (!isSsr) return ''
    if (!options.ssr.length) return ''

    const optionBreakpoints = options.breakpoints
    const styles = `
      ${createStyles(options, container, slides)}

      ${Object.keys(optionBreakpoints).reduce((acc, key) => {
        const optionsAtMedia = mergeOptions(options, optionBreakpoints[key])

        return `
          ${acc}
          @media ${key} {
            ${createStyles(optionsAtMedia, container, slides)}
          }
        `
      }, '')}
    `

    return styles //.replace(/\s+/g, '')
  }

  const self: SsrHandlerType = {
    getStyles
  }
  return self
}

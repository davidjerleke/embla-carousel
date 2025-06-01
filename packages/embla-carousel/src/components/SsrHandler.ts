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

    // const loopPoints = options.loop ? slideLooper.loopPoints : []
    // const containerSsr = location.get()

    // TODO: Fix broken SSR after changing transform approach
    // ${containerSelector} {
    //   transform: ${translate.get(containerSsr)};
    // }
    console.log(location.get(), 'containerSsr')

    return `
      ${slides.reduce((acc, slide, index) => {
        const loopSlide = slideLooper.loopPoints[index]
        const slideSizeFactor = options.ssr[index] / 100
        const transformFactor = location.get() / (slideSizeFactor * 100)
        // const { index } = loopPoint
        if (!options.loop || !loopSlide) {
          // const sign = mathSign(location.get())
          // const size = options.ssr[index]
          // const slideSsr = direction((location.get() * 100) / size)
          const slideSsr = direction(transformFactor * 100)
          // console.log(transformFactor, 'transformFactor')

          // console.log(
          //   slideSsr,
          //   index,
          //   `
          //   ${acc}
          //   ${containerSelector} ${slidesSelector}:nth-child(${index + 1}) {
          //     transform: ${translate.get(slideSsr)};
          //   }
          //   `
          // )

          return `
            ${acc}
            ${containerSelector} ${slidesSelector}:nth-child(${index + 1}) {
              transform: ${translate.get(slideSsr)};
            }
            `
        }

        const sign = mathSign(loopSlide.target())
        const size = options.ssr[index]
        const baseSlideSsr = transformFactor * 100

        console.log(
          index,
          baseSlideSsr * sign + (contentSize / size) * 100,
          loopSlide.target()
        )
        const slideSsr = loopSlide.target()
          ? direction((baseSlideSsr * sign + (contentSize / size) * 100) * sign)
          : direction(baseSlideSsr)

        // if (!sign || !size) return acc
        // const slideSsr = direction((contentSize / size) * 100 * sign)

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

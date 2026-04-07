import { defaultOptions } from './Options'
import {
  OptionsHandlerType,
  NodesType,
  EmblaSsrType,
  EmblaSsrOptionsType as OptionsType,
  OptionsType as CoreOptionsType
} from 'embla-carousel'

declare module 'embla-carousel' {
  interface EmblaPluginsType {
    ssr?: SsrType | undefined
  }
}

export type SsrType = EmblaSsrType

export type SsrOptionsType = SsrType['options']

function Ssr(userOptions: SsrOptionsType = {}): SsrType {
  let coreOptions: CoreOptionsType
  let pluginOptions: OptionsType

  let mergeOptions: OptionsHandlerType['mergeOptions']
  let createEngine: Parameters<EmblaSsrType['setup']>[0]

  function init(): void {}
  function destroy(): void {}

  function setup(
    createEngineUtil: Parameters<EmblaSsrType['setup']>[0],
    mergeOptionsUtil: OptionsHandlerType['mergeOptions'],
    options: CoreOptionsType
  ): void {
    createEngine = createEngineUtil
    mergeOptions = mergeOptionsUtil
    coreOptions = options

    const optionsBase = mergeOptions(defaultOptions, Ssr.globalOptions)
    pluginOptions = mergeOptions(optionsBase, userOptions)
  }

  function getSlideSizes(options?: SsrOptionsType): number[] {
    if (!options) return pluginOptions.slideSizes || []
    return options.slideSizes || []
  }

  function getTransform(axis: CoreOptionsType['axis'], input: number): string {
    return axis === 'x'
      ? `translate3d(${input}%,0px,0px)`
      : `translate3d(0px,${input}%,0px)`
  }

  function createSsrNode(
    offsetLeft: number,
    offsetTop: number,
    offsetWidth: number,
    offsetHeight: number
  ): HTMLElement {
    return <HTMLElement>{
      offsetLeft,
      offsetTop,
      offsetWidth,
      offsetHeight
    }
  }

  function getNodes(options?: SsrOptionsType): NodesType {
    const slideSizes = getSlideSizes(options)
    const rootSize = 100
    const root = createSsrNode(0, 0, rootSize, rootSize)
    const container = root

    let startOffset = 0

    const slides = slideSizes.map((size) => {
      const slide = createSsrNode(startOffset, startOffset, size, size)
      startOffset += size
      return slide
    })

    return { root, container, slides }
  }

  function createStyles(
    options: CoreOptionsType & SsrOptionsType,
    containerSelector: string,
    slidesSelector: string
  ): string {
    const slideSizes = options.slideSizes || []
    const { slides, container } = getNodes(options)
    const ssrOptions = mergeOptions(options, { direction: 'ltr' })
    const directionHandler = createEngine(options, container, slides)
    const { axis } = directionHandler
    const { location, slideLooper, contentSize } = createEngine(
      ssrOptions,
      container,
      slides
    )

    const loopPoints = options.loop ? slideLooper.loopPoints : []
    const containerLocation = axis.direction(location)
    const containerSsr = getTransform(axis.scroll, containerLocation)
    const baseStyles = `${containerSelector}{transform:${containerSsr};}`

    const loopStyles = loopPoints.reduce((styles, loopPoint) => {
      const { index } = loopPoint
      const sign = Math.sign(loopPoint.target())
      const size = slideSizes[index]

      if (!sign || !size) return styles
      const slideLocation = axis.direction((contentSize / size) * 100 * sign)
      const slideSsr = getTransform(axis.scroll, slideLocation)

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
    const options = mergeOptions(coreOptions, pluginOptions)
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

  const self: SsrType = {
    name: 'ssr',
    options: userOptions,
    init,
    destroy,
    setup,
    getNodes,
    getStyles
  }
  return self
}

declare namespace Ssr {
  let globalOptions: SsrOptionsType | undefined
}

Ssr.globalOptions = undefined

export default Ssr

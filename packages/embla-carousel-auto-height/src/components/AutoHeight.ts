import { defaultOptions, OptionsType } from './Options'
import {
  EmblaEventType,
  CreatePluginType,
  EmblaCarouselType,
  OptionsHandlerType,
  EmblaEventModelType
} from 'embla-carousel'

declare module 'embla-carousel' {
  interface EmblaPluginsType {
    autoHeight: AutoHeightType
  }
}

export type AutoHeightType = CreatePluginType<{}, OptionsType>

export type AutoHeightOptionsType = AutoHeightType['options']

function AutoHeight(userOptions: AutoHeightOptionsType = {}): AutoHeightType {
  let options: OptionsType
  let emblaApi: EmblaCarouselType
  let isSsr = false
  let destroyed = false

  let slideHeights: number[] = []
  let heightEvents: EmblaEventType[] = []
  let isEventSelect = true

  function pluginIsActive(): boolean {
    if (isSsr) return false
    if (destroyed) return false
    return options.active
  }

  function init(
    emblaApiInstance: EmblaCarouselType,
    optionsHandler: OptionsHandlerType
  ): void {
    emblaApi = emblaApiInstance

    const { mergeOptions, optionsAtMedia } = optionsHandler
    const optionsBase = mergeOptions(defaultOptions, AutoHeight.globalOptions)
    const allOptions = mergeOptions(optionsBase, userOptions)

    destroyed = false
    options = optionsAtMedia(allOptions)
    isSsr = emblaApi.internalEngine().isSsr

    const {
      options: { axis },
      slideRects
    } = emblaApi.internalEngine()

    if (!pluginIsActive()) return
    if (axis === 'y') return

    isEventSelect = options.heightEvent === 'select'
    heightEvents = getHeightEvents()
    slideHeights = slideRects.map((slideRect) => slideRect.height)

    emblaApi.on('resize', onResize)
    heightEvents.forEach((evt) => emblaApi.on(evt, setRootNodeHeight))
    setRootNodeHeight()
  }

  function destroy(): void {
    if (!pluginIsActive()) return

    emblaApi.off('resize', onResize)
    heightEvents.forEach((evt) => emblaApi.off(evt, setRootNodeHeight))
    const rootNode = emblaApi.rootNode()
    rootNode.style.height = ''

    destroyed = true
  }

  function highestInView(): number | null {
    const slideIndexes = getSlideIndexes()
    if (!slideIndexes) return null

    return slideIndexes
      .map((index) => slideHeights[index])
      .reduce((a, b) => Math.max(a, b), 0)
  }

  function setRootNodeHeight(): void {
    const height = highestInView()
    if (height === null) return

    emblaApi.rootNode().style.height = `${highestInView()}px`
  }

  function getHeightEvents(): EmblaEventType[] {
    if (isEventSelect) return ['select', 'slidefocus']
    return ['slidesinview']
  }

  function getSlideIndexes(): number[] {
    const { slideGroupBySnap } = emblaApi.internalEngine().scrollSnapList
    if (isEventSelect) return slideGroupBySnap[emblaApi.selectedSnap()]
    return emblaApi.slidesInView()
  }

  function onResize(event: EmblaEventModelType<'resize'>): void | boolean {
    const entries = event.detail

    for (const entry of entries) {
      if (!pluginIsActive()) return

      const node = <HTMLElement>entry.target
      if (node === emblaApi.containerNode()) continue

      const index = emblaApi.slideNodes().indexOf(node)
      if (index < 0) continue

      const currentHeight = slideHeights[index]
      const newHeight = node.offsetHeight
      const diffHeight = Math.abs(newHeight - currentHeight)

      if (diffHeight >= 0.5) {
        emblaApi.reInit()
        return false
      }
    }
  }

  const self: AutoHeightType = {
    name: 'autoHeight',
    options: userOptions,
    init,
    destroy
  }
  return self
}

declare namespace AutoHeight {
  let globalOptions: AutoHeightOptionsType | undefined
}

AutoHeight.globalOptions = undefined

export default AutoHeight

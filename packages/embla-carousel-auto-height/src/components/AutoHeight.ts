import { defaultOptions, OptionsType } from './Options'
import {
  EmblaEventType,
  CreatePluginType,
  EmblaCarouselType,
  OptionsHandlerType
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
  const heightEvents: EmblaEventType[] = ['select', 'slidefocus']

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

    slideHeights = slideRects.map((slideRect) => slideRect.height)

    heightEvents.forEach((evt) => emblaApi.on(evt, setContainerHeight))
    setContainerHeight()
  }

  function destroy(): void {
    if (!pluginIsActive()) return

    heightEvents.forEach((evt) => emblaApi.off(evt, setContainerHeight))
    const container = emblaApi.containerNode()
    container.style.height = ''

    destroyed = true
  }

  function highestInView(): number | null {
    const { slideRegistry } = emblaApi.internalEngine()
    const selectedIndexes = slideRegistry[emblaApi.selectedSnap()]

    if (!selectedIndexes) return null

    return selectedIndexes
      .map((index) => slideHeights[index])
      .reduce((a, b) => Math.max(a, b), 0)
  }

  function setContainerHeight(): void {
    const height = highestInView()
    if (height === null) return

    emblaApi.containerNode().style.height = `${highestInView()}px`
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

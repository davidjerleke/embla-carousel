import { OptionsType } from './Options'
import {
  EmblaEventType,
  CreatePluginType,
  EmblaCarouselType
} from 'embla-carousel'

declare module 'embla-carousel' {
  interface EmblaPluginsType {
    autoHeight: AutoHeightType
  }
}

export type AutoHeightType = CreatePluginType<{}, OptionsType>

export type AutoHeightOptionsType = AutoHeightType['options']

function AutoHeight(userOptions: AutoHeightOptionsType = {}): AutoHeightType {
  let emblaApi: EmblaCarouselType
  let slideHeights: number[] = []
  const heightEvents: EmblaEventType[] = ['select', 'slidefocus']

  function init(emblaApiInstance: EmblaCarouselType): void {
    emblaApi = emblaApiInstance

    const {
      options: { axis },
      slideRects
    } = emblaApi.internalEngine()

    if (axis === 'y') return

    slideHeights = slideRects.map((slideRect) => slideRect.height)

    heightEvents.forEach((evt) => emblaApi.on(evt, setContainerHeight))
    setContainerHeight()
  }

  function destroy(): void {
    heightEvents.forEach((evt) => emblaApi.off(evt, setContainerHeight))
    const container = emblaApi.containerNode()
    container.style.height = ''
    if (!container.getAttribute('style')) container.removeAttribute('style')
  }

  function highestInView(): number | null {
    const { slideRegistry } = emblaApi.internalEngine()
    const selectedIndexes = slideRegistry[emblaApi.selectedScrollSnap()]

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

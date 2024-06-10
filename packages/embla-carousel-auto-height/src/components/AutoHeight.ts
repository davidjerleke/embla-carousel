import { OptionsType } from './Options'
import { CreatePluginType } from 'embla-carousel/components/Plugins'
import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'

declare module 'embla-carousel/components/Plugins' {
  interface EmblaPluginsType {
    autoHeight?: AutoHeightType
  }
}

export type AutoHeightType = CreatePluginType<{}, OptionsType>

export type AutoHeightOptionsType = AutoHeightType['options']

function AutoHeight(userOptions: AutoHeightOptionsType = {}): AutoHeightType {
  let emblaApi: EmblaCarouselType
  let resizeObserver: ResizeObserver
  let slideHeights: number[] = []
  const heightEvents: EmblaEventType[] = ['select', 'slideFocus']

  function init(emblaApiInstance: EmblaCarouselType): void {
    emblaApi = emblaApiInstance

    const {
      options: { axis }
    } = emblaApi.internalEngine()

    if (axis === 'y') return

    resizeObserver = new ResizeObserver(synchronizeSlideHeights)

    emblaApi.slideNodes().forEach((node: HTMLElement) => {
      resizeObserver.observe(node)
    })

    heightEvents.forEach((evt) => emblaApi.on(evt, setContainerHeight))

    synchronizeSlideHeights()
  }

  function destroy(): void {
    emblaApi.slideNodes().forEach((node: HTMLElement) => {
      resizeObserver.unobserve(node)
    })

    heightEvents.forEach((evt) => emblaApi.off(evt, setContainerHeight))

    const container = emblaApi.containerNode()

    container.style.height = ''

    if (!container.getAttribute('style')) container.removeAttribute('style')
  }

  function highestInView(): number {
    const { slideRegistry } = emblaApi.internalEngine()
    const selectedIndexes = slideRegistry[emblaApi.selectedScrollSnap()]

    return selectedIndexes
      .map((index) => slideHeights[index])
      .reduce((a, b) => Math.max(a, b), 0)
  }

  function setContainerHeight(): void {
    emblaApi.containerNode().style.height = `${highestInView()}px`
  }

  function synchronizeSlideHeights(): void {
    const slideNodes = emblaApi.slideNodes()

    slideHeights = slideNodes.map((node: HTMLElement) => node.offsetHeight)

    setContainerHeight()
  }

  const self: AutoHeightType = {
    name: 'autoHeight',
    options: userOptions,
    init,
    destroy
  }
  return self
}

AutoHeight.globalOptions = <AutoHeightOptionsType | undefined>undefined

export default AutoHeight

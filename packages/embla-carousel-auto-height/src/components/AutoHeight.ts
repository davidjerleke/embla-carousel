import { defaultOptions, OptionsType } from './Options'
import { SlideBoundType } from 'embla-carousel/components/SlidesInView'
import { CreatePluginType } from 'embla-carousel/components/Plugins'
import { OptionsHandlerType } from 'embla-carousel/components/OptionsHandler'
import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'

declare module 'embla-carousel/components/Plugins' {
  interface EmblaPluginsType {
    autoHeight?: AutoHeightType
  }
}

export type AutoHeightType = CreatePluginType<{}, OptionsType>

export type AutoHeightOptionsType = AutoHeightType['options']

function AutoHeight(userOptions: AutoHeightOptionsType = {}): AutoHeightType {
  let options: OptionsType
  let carousel: EmblaCarouselType
  let slideBounds: SlideBoundType[] = []
  let slideHeights: number[] = []
  const heightEvents: EmblaEventType[] = ['select', 'pointerUp']
  const inViewThreshold = 0.5

  function init(
    embla: EmblaCarouselType,
    optionsHandler: OptionsHandlerType,
  ): void {
    carousel = embla

    const { mergeOptions, optionsAtMedia } = optionsHandler
    const optionsBase = mergeOptions(defaultOptions, AutoHeight.globalOptions)
    const allOptions = mergeOptions(optionsBase, userOptions)
    options = optionsAtMedia(allOptions)

    const {
      options: { axis },
      slidesInView,
      slideRects,
    } = carousel.internalEngine()
    if (axis === 'y') return

    slideBounds = slidesInView.findSlideBounds(undefined, inViewThreshold)
    slideHeights = slideRects.map((rect) => rect.height)

    heightEvents.forEach((evt) => carousel.on(evt, setContainerHeight))
    setContainerHeight()
  }

  function destroy(): void {
    heightEvents.forEach((evt) => carousel.off(evt, setContainerHeight))
    setContainerHeight(undefined, 'destroy')
  }

  function highestInView(): number {
    const { slidesInView, target } = carousel.internalEngine()
    const inViewIndexes = slidesInView.check(target.get(), slideBounds)
    const heights = inViewIndexes.map((index) => slideHeights[index])
    return heights.reduce((a, b) => Math.max(a, b), 0)
  }

  function setContainerHeight(
    _?: EmblaCarouselType,
    evt?: EmblaEventType,
  ): void {
    const height =
      evt === 'destroy' ? options.destroyHeight : `${highestInView()}px`
    carousel.containerNode().style.height = height
  }

  const self: AutoHeightType = {
    name: 'autoHeight',
    options: userOptions,
    init,
    destroy,
  }
  return self
}

AutoHeight.globalOptions = <AutoHeightOptionsType | undefined>undefined

export default AutoHeight

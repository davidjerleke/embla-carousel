import { defaultOptions, AutoHeightOptionsType, OptionsType } from './Options'
import { SlideBoundType } from 'embla-carousel/components/SlidesInView'
import { CreatePluginType } from 'embla-carousel/components/Plugins'
import EmblaCarousel, {
  EmblaCarouselType,
  EmblaEventType,
} from 'embla-carousel'

export type AutoHeightType = CreatePluginType<{}, OptionsType>

function AutoHeight(userOptions?: AutoHeightOptionsType): AutoHeightType {
  const optionsHandler = EmblaCarousel.optionsHandler()
  const optionsBase = optionsHandler.merge(
    defaultOptions,
    AutoHeight.globalOptions,
  )
  let options: AutoHeightType['options']
  let carousel: EmblaCarouselType

  let slideBounds: SlideBoundType[] = []
  let slideHeights: number[] = []
  const heightEvents: EmblaEventType[] = ['select', 'pointerUp']
  const inViewThreshold = 0.5

  function init(embla: EmblaCarouselType): void {
    carousel = embla
    options = optionsHandler.atMedia(self.options)
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
    setContainerHeight('destroy')
  }

  function highestInView(): number {
    const { slidesInView, target } = carousel.internalEngine()
    const inViewIndexes = slidesInView.check(target.get(), slideBounds)
    const heights = inViewIndexes.map((index) => slideHeights[index])
    return heights.reduce((a, b) => Math.max(a, b), 0)
  }

  function setContainerHeight(evt?: EmblaEventType): void {
    const height =
      evt === 'destroy' ? options.destroyHeight : `${highestInView()}px`
    carousel.containerNode().style.height = height
  }

  const self: AutoHeightType = {
    name: 'autoHeight',
    options: optionsHandler.merge(optionsBase, userOptions),
    init,
    destroy,
  }
  return self
}

AutoHeight.globalOptions = <AutoHeightOptionsType | undefined>undefined

export default AutoHeight

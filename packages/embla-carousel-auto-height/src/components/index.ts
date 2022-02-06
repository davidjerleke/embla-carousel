import { defaultOptions, AutoHeightOptionsType, OptionsType } from './Options'
import { SlideBoundType } from 'embla-carousel/components/SlidesInView'
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaPluginType,
} from 'embla-carousel'

export type AutoHeightType = EmblaPluginType<OptionsType>

function AutoHeight(userOptions?: AutoHeightOptionsType): AutoHeightType {
  const options = Object.assign(
    {},
    defaultOptions,
    AutoHeight.globalOptions,
    userOptions,
  )
  const { destroyHeight } = options
  const heightEvents: EmblaEventType[] = ['select', 'pointerUp']
  const inViewThreshold = 0.5

  let carousel: EmblaCarouselType
  let slideBounds: SlideBoundType[] = []
  let slideHeights: number[] = []

  function init(embla: EmblaCarouselType): void {
    carousel = embla
    const { options, slidesInView, slideRects } = carousel.internalEngine()
    if (options.axis === 'y') return

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
    const height = evt === 'destroy' ? destroyHeight : `${highestInView()}px`
    carousel.containerNode().style.height = height
  }

  const self: AutoHeightType = {
    name: 'AutoHeight',
    options,
    init,
    destroy,
  }
  return self
}

AutoHeight.globalOptions = <AutoHeightOptionsType | undefined>undefined

export default AutoHeight

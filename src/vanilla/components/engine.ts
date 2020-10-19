import { Alignment } from './alignment'
import { Animation } from './animation'
import { Axis } from './axis'
import { Counter } from './counter'
import { DragHandler } from './dragHandler'
import { DragTracker } from './dragTracker'
import { EventEmitter } from './eventEmitter'
import { Limit } from './limit'
import { Options } from './options'
import { PxToPercent } from './pxToPercent'
import { ScrollBody } from './scrollBody'
import { ScrollBounds } from './scrollBounds'
import { ScrollContain } from './scrollContain'
import { ScrollLimit } from './scrollLimit'
import { ScrollLooper } from './scrollLooper'
import { ScrollProgress } from './scrollProgress'
import { ScrollSnap } from './scrollSnap'
import { ScrollTarget } from './scrollTarget'
import { ScrollTo } from './scrollTo'
import { SlideLooper } from './slideLooper'
import { SlideFocus } from './slideFocus'
import { SlidesInView } from './slidesInView'
import { Translate } from './translate'
import { arrayKeys, groupArray } from './utils'
import { Vector1D } from './vector1d'

export type Engine = {
  axis: Axis
  animation: Animation
  scrollBounds: ScrollBounds
  scrollLooper: ScrollLooper
  scrollProgress: ScrollProgress
  index: Counter
  indexPrevious: Counter
  limit: Limit
  location: Vector1D
  options: Options
  pxToPercent: PxToPercent
  scrollBody: ScrollBody
  dragHandler: DragHandler
  slideFocus: SlideFocus
  slideLooper: SlideLooper
  slidesInView: SlidesInView
  target: Vector1D
  translate: Translate
  scrollTo: ScrollTo
  scrollTarget: ScrollTarget
  scrollSnaps: number[]
  slideIndexes: number[]
}

export function Engine(
  root: HTMLElement,
  container: HTMLElement,
  slides: HTMLElement[],
  options: Options,
  events: EventEmitter,
): Engine {
  // Options
  const {
    align,
    axis: scrollAxis,
    startIndex,
    inViewThreshold,
    loop,
    speed,
    dragFree,
    slidesToScroll,
    containScroll,
  } = options

  // Measurements
  const axis = Axis(scrollAxis)
  const pxToPercent = PxToPercent(axis.measure(container))
  const viewSize = pxToPercent.totalPercent
  const slideSizes = slides.map(axis.measure).map(pxToPercent.measure)
  const slideIndexes = arrayKeys(slideSizes)
  const groupedSizes = groupArray(slideSizes, slidesToScroll)
  const snapSizes = groupedSizes.map(g => g.reduce((a, s) => a + s))
  const contentSize = slideSizes.reduce((a, s) => a + s, 0)
  const alignment = Alignment({ align, viewSize })
  const scrollSnap = ScrollSnap({ snapSizes, alignment, loop })
  const defaultSnaps = arrayKeys(snapSizes).map(scrollSnap.measure)
  const contain = ScrollContain({ alignment, contentSize, viewSize })
  const shouldContain = !loop && containScroll !== ''
  const trimSnaps = containScroll === 'trimSnaps'
  const containedSnaps = contain.measure(defaultSnaps, trimSnaps)
  const scrollSnaps = shouldContain ? containedSnaps : defaultSnaps

  // Index
  const indexMax = Math.max(0, scrollSnaps.length - 1)
  const indexSpan = Limit({ min: 0, max: indexMax })
  const index = Counter({ limit: indexSpan, start: startIndex, loop })
  const indexPrevious = index.clone()

  // ScrollLimit
  const scrollLimit = ScrollLimit({ loop, contentSize })
  const limit = scrollLimit.measure(scrollSnaps)

  // Draw
  const update = (): void => {
    engine.scrollBody.seek(target).update()
    const settled = engine.scrollBody.settle(target)

    if (!dragHandler.pointerDown()) {
      if (!loop) engine.scrollBounds.constrain(target)
      if (settled) {
        engine.animation.stop()
        events.emit('settle')
      }
    }
    if (loop) {
      const direction = engine.scrollBody.direction.get()
      engine.scrollLooper.loop(loopVectors, direction)
      engine.slideLooper.loop(slides)
    }

    if (!settled) events.emit('scroll')
    engine.translate.to(location)
    engine.animation.proceed()
  }

  // Shared
  const animation = Animation(update)
  const startLocation = scrollSnaps[index.get()]
  const location = Vector1D(startLocation)
  const target = Vector1D(startLocation)
  const loopVectors = [location, target]
  const scrollBody = ScrollBody({
    location,
    speed,
    mass: 1,
  })
  const scrollTarget = ScrollTarget({
    contentSize,
    index,
    limit,
    loop,
    scrollSnaps,
    target,
  })
  const scrollTo = ScrollTo({
    animation,
    events,
    index,
    indexPrevious,
    scrollTarget,
    target,
  })
  const slidesInView = SlidesInView({
    contentSize,
    inViewThreshold,
    loop,
    slideSizes,
    viewSize,
  })

  // DragHandler
  const dragHandler = DragHandler({
    animation,
    axis,
    dragFree,
    dragTracker: DragTracker({
      axis,
      pxToPercent,
    }),
    element: root,
    events,
    index,
    limit,
    location,
    loop,
    scrollBody,
    scrollTo,
    scrollTarget,
    target,
  })

  // Slider
  const engine: Engine = {
    animation,
    axis,
    dragHandler,
    pxToPercent,
    index,
    indexPrevious,
    limit,
    location,
    options,
    scrollBody,
    scrollBounds: ScrollBounds({
      animation,
      limit,
      location,
      scrollBody,
    }),
    scrollLooper: ScrollLooper({
      contentSize,
      limit,
      location,
      pxToPercent,
    }),
    scrollProgress: ScrollProgress({
      limit,
    }),
    scrollSnaps,
    scrollTarget,
    scrollTo,
    slideFocus: SlideFocus({
      root,
      scrollTo,
      slidesToScroll,
    }),
    slideLooper: SlideLooper({
      axis,
      contentSize,
      location,
      scrollSnaps,
      slideSizes,
      slidesInView,
      viewSize,
    }),
    slidesInView,
    slideIndexes,
    target,
    translate: Translate({
      axis,
      container,
    }),
  }
  return engine
}

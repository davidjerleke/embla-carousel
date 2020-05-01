import { Alignment } from './alignment'
import { Animation } from './animation'
import { Counter } from './counter'
import { DragHandler } from './dragHandler'
import { DragTracker } from './dragTracker'
import { EventDispatcher } from './eventDispatcher'
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
import { SlidesInView } from './slidesInView'
import { Translate } from './translate'
import { arrayKeys, groupArray, rectWidth } from './utils'
import { Vector1D } from './vector1d'

export type Engine = {
  animation: Animation
  scrollBounds: ScrollBounds
  scrollLooper: ScrollLooper
  scrollProgress: ScrollProgress
  index: Counter
  indexPrevious: Counter
  limit: Limit
  location: Vector1D
  pxToPercent: PxToPercent
  scrollBody: ScrollBody
  dragHandler: DragHandler
  slideLooper: SlideLooper
  slidesInView: SlidesInView
  target: Vector1D
  translate: Translate
  scrollTo: ScrollTo
  scrollTarget: ScrollTarget
  scrollSnaps: number[]
  snapIndexes: number[]
}

export function Engine(
  root: HTMLElement,
  container: HTMLElement,
  slides: HTMLElement[],
  options: Options,
  events: EventDispatcher,
): Engine {
  // Options
  const {
    align,
    startIndex,
    inViewThreshold,
    loop,
    speed,
    dragFree,
    slidesToScroll,
    containScroll,
  } = options

  // Measurements
  const containerSize = rectWidth(container)
  const pxToPercent = PxToPercent(containerSize)
  const viewSize = pxToPercent.totalPercent
  const slideSizes = slides.map(rectWidth).map(pxToPercent.measure)
  const groupedSizes = groupArray(slideSizes, slidesToScroll)
  const snapSizes = groupedSizes.map(g => g.reduce((a, s) => a + s))
  const snapIndexes = arrayKeys(snapSizes)
  const contentSize = slideSizes.reduce((a, s) => a + s)
  const alignment = Alignment({ align, viewSize })
  const scrollSnap = ScrollSnap({ snapSizes, alignment, loop })
  const contain = ScrollContain({ alignment, contentSize, viewSize })
  const shouldContain = !loop && containScroll !== ''
  const trimSnaps = containScroll === 'trimSnaps'
  const defaultSnaps = snapIndexes.map(scrollSnap.measure)
  const containedSnaps = contain.snaps(defaultSnaps, trimSnaps)
  const scrollSnaps = shouldContain ? containedSnaps : defaultSnaps

  // Index
  const indexSpan = Limit({ min: 0, max: scrollSnaps.length - 1 })
  const index = Counter({ limit: indexSpan, start: startIndex, loop })
  const indexPrevious = index.clone()

  // ScrollLimit
  const scrollLimit = ScrollLimit({ loop, contentSize })
  const limit = scrollLimit.measure(scrollSnaps)

  // Draw
  const update = (): void => {
    engine.scrollBody.seek(target).update()

    if (!dragHandler.pointerDown()) {
      if (!loop) engine.scrollBounds.constrain(target)
      if (engine.scrollBody.settle(target)) engine.animation.stop()
    }
    if (loop) {
      const direction = engine.scrollBody.direction.get()
      engine.scrollLooper.loop(loopVectors, direction)
      engine.slideLooper.loop(slides)
    }

    const settled = engine.scrollBody.settle(target)
    events.dispatch(settled ? 'settle' : 'scroll')
    engine.translate.to(engine.scrollBody.location)
    engine.animation.proceed()
  }

  // Shared
  const animation = Animation(update)
  const startLocation = scrollSnaps[index.get()]
  const location = Vector1D(startLocation)
  const target = Vector1D(startLocation)
  const loopVectors = [location, target]
  const scrollBody = ScrollBody({ location, speed, mass: 1 })
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

  // DragHandler
  const dragHandler = DragHandler({
    animation,
    dragFree,
    dragTracker: DragTracker(pxToPercent),
    element: root,
    events,
    index,
    limit,
    location,
    loop,
    scrollBody,
    scrollTo,
    snapSizes,
    target,
  })

  // Slider
  const engine: Engine = {
    animation,
    dragHandler,
    pxToPercent,
    index,
    indexPrevious,
    limit,
    location,
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
    slideLooper: SlideLooper({
      contentSize,
      location,
      scrollSnaps,
      slideSizes,
      viewSize,
    }),
    slidesInView: SlidesInView({
      contentSize,
      inViewThreshold,
      loop,
      slideSizes,
      viewSize,
    }),
    snapIndexes,
    target,
    translate: Translate(container),
  }
  return Object.freeze(engine)
}

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
import { ScrollBy } from './scrollBy'
import { ScrollContain } from './scrollContain'
import { ScrollLimit } from './scrollLimit'
import { ScrollLooper } from './scrollLooper'
import { ScrollProgress } from './scrollProgress'
import { ScrollSnap } from './scrollSnap'
import { ScrollTarget } from './scrollTarget'
import { ScrollTo } from './scrollTo'
import { SlideLooper } from './slideLooper'
import { Translate } from './translate'
import { groupNumbers, rectWidth } from './utils'
import { Vector1D } from './vector1d'

export type Engine = {
  animation: Animation
  scrollBounds: ScrollBounds
  scrollLooper: ScrollLooper
  scrollProgress: ScrollProgress
  index: Counter
  indexPrevious: Counter
  indexGroups: number[][]
  scrollBody: ScrollBody
  dragHandler: DragHandler
  slideLooper: SlideLooper
  target: Vector1D
  translate: Translate
  scrollTo: ScrollTo
  scrollBy: ScrollBy
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
  const slideIndexes = Object.keys(slides).map(Number)
  const slideSizes = slides.map(rectWidth).map(pxToPercent.measure)
  const groupedSizes = groupNumbers(slideSizes, slidesToScroll)
  const snapSizes = groupedSizes.map(g => g.reduce((a, s) => a + s))
  const contentSize = slideSizes.reduce((a, s) => a + s)
  const alignment = Alignment({ align, viewSize })
  const scrollSnap = ScrollSnap({ snapSizes, alignment, loop })
  const scrollContain = ScrollContain({
    alignment,
    contentSize,
    slideIndexes,
    slidesToScroll,
    viewSize,
  })
  const contain = !loop && containScroll
  const defaultSnaps = snapSizes.map(scrollSnap.measure)
  const containedSnaps = scrollContain.snaps(defaultSnaps)
  const scrollSnaps = contain ? containedSnaps : defaultSnaps

  // Index
  const defaultIndexes = groupNumbers(slideIndexes, slidesToScroll)
  const containedIndexes = scrollContain.indexes(defaultSnaps)
  const indexMin = 0
  const indexMax = scrollSnaps.length - 1
  const indexGroups = contain ? containedIndexes : defaultIndexes
  const indexSpan = Limit({ min: indexMin, max: indexMax })
  const index = Counter({ limit: indexSpan, start: startIndex, loop })
  const indexPrevious = index.clone()

  // ScrollLimit
  const scrollLimit = ScrollLimit({ loop, contentSize })
  const limit = scrollLimit.measure(scrollSnaps)

  // Direction
  const direction = (): number => {
    return dragHandler.pointerDown()
      ? dragHandler.direction.get()
      : engine.scrollBody.direction.get()
  }

  // Draw
  const update = (): void => {
    engine.scrollBody.seek(target).update()

    if (!dragHandler.pointerDown()) {
      if (!loop) engine.scrollBounds.constrain(target)
      if (engine.scrollBody.settle(target)) engine.animation.stop()
    }
    if (loop) {
      engine.scrollLooper.loop(direction())
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
  const scrollBody = ScrollBody({ location, speed, mass: 1 })
  const scrollTo = ScrollTo({
    animation,
    events,
    index,
    indexPrevious,
    scrollTarget: ScrollTarget({
      align,
      contentSize,
      index,
      limit,
      loop,
      scrollSnaps,
      snapSizes,
      target,
    }),
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
    index,
    indexGroups,
    indexPrevious,
    scrollBody,
    scrollBounds: ScrollBounds({
      animation,
      limit,
      location,
      scrollBody,
      tolerance: 50,
    }),
    scrollBy: ScrollBy({
      limit,
      loop,
      target,
    }),
    scrollLooper: ScrollLooper({
      contentSize,
      limit,
      location,
      pxToPercent,
      vectors: [location, target],
    }),
    scrollProgress: ScrollProgress({
      limit,
      location,
    }),
    scrollTo,
    slideLooper: SlideLooper({
      contentSize,
      location,
      scrollSnaps,
      slideSizes,
      viewSize,
    }),
    target,
    translate: Translate(container),
  }
  return Object.freeze(engine)
}

import { Alignment } from './alignment'
import { Animation } from './animation'
import { Axis } from './axis'
import { Counter } from './counter'
import { Direction } from './direction'
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
import { SlideSize } from './slideSize'
import { Translate } from './translate'
import { arrayKeys, groupArray } from './utils'
import { Vector1D } from './vector1d'

export type Engine = {
  axis: Axis
  direction: Direction
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
    direction: contentDirection,
    startIndex,
    inViewThreshold,
    loop,
    speed,
    dragFree,
    slidesToScroll,
    containScroll,
  } = options

  // Measurements
  const direction = Direction(contentDirection)
  const axis = Axis({ axis: scrollAxis, contentDirection })
  const containerRect = container.getBoundingClientRect()
  const slideRects = slides.map(slide => slide.getBoundingClientRect())
  const pxToPercent = PxToPercent(axis.measureSize(containerRect))
  const slideSize = SlideSize({ axis, pxToPercent, loop })
  const slideSizes = slideSize.measureWithoutGaps(slideRects)
  const slideSizesWithGaps = slideSize.measureWithGaps(slideRects, slides)
  const viewSize = pxToPercent.totalPercent

  const rawSnaps = slideRects.map(slideRect => {
    const position = pxToPercent.measure(
      containerRect[axis.startEdge] - slideRect[axis.startEdge],
    )
    return direction.applyTo(position)
  })

  const groupedSnaps = groupArray(rawSnaps, slidesToScroll)

  const groupedSlideRects = groupArray(slideRects, slidesToScroll)
  const snapSizes = groupedSlideRects
    .map(rects => {
      return pxToPercent.measure(
        rects[rects.length - 1][axis.endEdge] - rects[0][axis.startEdge],
      )
    })
    .map(Math.abs)

  const contentSize =
    rawSnaps[rawSnaps.length - 1] * -1 +
    slideSizesWithGaps[slideSizesWithGaps.length - 1]

  const alignment = Alignment({ align, viewSize })
  const scrollSnap = ScrollSnap({ alignment, snapSizes, groupedSnaps })
  const defaultSnaps = arrayKeys(snapSizes).map(scrollSnap.measure)
  const contain = ScrollContain({ alignment, contentSize, viewSize, rawSnaps })
  const shouldContain = !loop && containScroll !== ''
  const trimSnaps = containScroll === 'trimSnaps'
  const containedSnaps = contain.measure(defaultSnaps, trimSnaps)
  const scrollSnaps = shouldContain ? containedSnaps : defaultSnaps
  const scrollLimit = ScrollLimit({ loop, contentSize })
  const limit = scrollLimit.measure(scrollSnaps)

  // Indexes
  const slideIndexes = arrayKeys(slides)
  const indexMax = Math.max(0, scrollSnaps.length - 1)
  const indexSpan = Limit({ min: 0, max: indexMax })
  const index = Counter({ limit: indexSpan, start: startIndex, loop })
  const indexPrevious = index.clone()

  // Draw
  const update = (): void => {
    if (!loop) {
      engine.scrollBounds.constrain(target, engine.dragHandler.pointerDown())
    }
    engine.scrollBody.seek(target).update()
    const settled = engine.scrollBody.settle(target)

    if (settled && !engine.dragHandler.pointerDown()) {
      engine.animation.stop()
      events.emit('settle')
    }
    if (!settled) {
      events.emit('scroll')
    }
    if (loop) {
      engine.scrollLooper.loop(loopVectors, engine.scrollBody.direction())
      engine.slideLooper.loop(slides)
    }

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
    viewSize,
    rawSnaps,
    slideSizes,
  })

  // DragHandler
  const dragHandler = DragHandler({
    animation,
    axis,
    direction,
    dragFree,
    dragTracker: DragTracker({
      axis,
      pxToPercent,
    }),
    root,
    events,
    index,
    limit,
    location,
    scrollBody,
    scrollTo,
    scrollTarget,
    target,
  })

  // Slider
  const engine: Engine = {
    animation,
    axis,
    direction,
    dragHandler,
    pxToPercent,
    index,
    indexPrevious,
    limit,
    location,
    options,
    scrollBody,
    scrollBounds: ScrollBounds({
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
      slideSizesWithGaps,
      slidesInView,
      viewSize,
    }),
    slidesInView,
    slideIndexes,
    target,
    translate: Translate({
      axis,
      container,
      direction,
    }),
  }
  return engine
}

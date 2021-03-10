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
import { SlideSizes } from './slideSizes'
import { Translate } from './translate'
import { arrayKeys, arrayLast, lastIndex } from './utils'
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
  const containerRect = container.getBoundingClientRect()
  const slideRects = slides.map(slide => slide.getBoundingClientRect())
  const direction = Direction(contentDirection)
  const axis = Axis(scrollAxis, contentDirection)
  const pxToPercent = PxToPercent(axis.measureSize(containerRect))
  const viewSize = pxToPercent.totalPercent
  const alignment = Alignment(align, viewSize)
  const { slideSizes, slideSizesWithGaps } = SlideSizes(
    axis,
    pxToPercent,
    slides,
    slideRects,
    loop,
  )
  const { snaps, snapsAligned } = ScrollSnap(
    axis,
    alignment,
    pxToPercent,
    containerRect,
    slideRects,
    slidesToScroll,
  )
  const contentSize = arrayLast(snaps) * -1 + arrayLast(slideSizesWithGaps)
  const { snapsContained } = ScrollContain(
    viewSize,
    contentSize,
    snaps,
    snapsAligned,
    containScroll,
  )

  const contain = !loop && containScroll !== ''
  const scrollSnaps = contain ? snapsContained : snapsAligned
  const { limit } = ScrollLimit(contentSize, scrollSnaps, loop)

  // Indexes
  const index = Counter(Limit(0, lastIndex(scrollSnaps)), loop, startIndex)
  const indexPrevious = index.clone()
  const slideIndexes = arrayKeys(slides)

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
  const scrollBody = ScrollBody(location, speed, 1)
  const scrollTarget = ScrollTarget(
    index,
    loop,
    scrollSnaps,
    contentSize,
    limit,
    target,
  )
  const scrollTo = ScrollTo(
    animation,
    index,
    indexPrevious,
    scrollTarget,
    target,
    events,
  )
  const slidesInView = SlidesInView(
    viewSize,
    contentSize,
    slideSizes,
    snaps,
    loop,
    inViewThreshold,
  )

  // DragHandler
  const dragHandler = DragHandler(
    axis,
    direction,
    root,
    target,
    dragFree,
    DragTracker(axis, pxToPercent),
    location,
    animation,
    scrollTo,
    scrollBody,
    scrollTarget,
    index,
    limit,
    events,
  )

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
    scrollBounds: ScrollBounds(limit, location, scrollBody),
    scrollLooper: ScrollLooper(contentSize, pxToPercent, limit, location),
    scrollProgress: ScrollProgress(limit),
    scrollSnaps,
    scrollTarget,
    scrollTo,
    slideFocus: SlideFocus(root, scrollTo, slidesToScroll),
    slideLooper: SlideLooper(
      axis,
      viewSize,
      contentSize,
      slideSizesWithGaps,
      scrollSnaps,
      slidesInView,
      location,
    ),
    slidesInView,
    slideIndexes,
    target,
    translate: Translate(axis, direction, container),
  }
  return engine
}

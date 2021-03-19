import { Alignment } from './alignment'
import { Animation, AnimationType } from './animation'
import { Axis, AxisType } from './axis'
import { Counter, CounterType } from './counter'
import { Direction, DirectionType } from './direction'
import { DragHandler, DragHandlerType } from './dragHandler'
import { DragTracker } from './dragTracker'
import { EventEmitterType } from './eventEmitter'
import { Limit, LimitType } from './limit'
import { OptionsType } from './options'
import { PxToPercent, PxToPercentType } from './pxToPercent'
import { ScrollBody, ScrollBodyType } from './scrollBody'
import { ScrollBounds, ScrollBoundsType } from './scrollBounds'
import { ScrollContain } from './scrollContain'
import { ScrollLimit } from './scrollLimit'
import { ScrollLooper, ScrollLooperType } from './scrollLooper'
import { ScrollProgress, ScrollProgressType } from './scrollProgress'
import { ScrollSnap } from './scrollSnap'
import { ScrollTarget, ScrollTargetType } from './scrollTarget'
import { ScrollTo, ScrollToType } from './scrollTo'
import { SlideLooper, SlideLooperType } from './slideLooper'
import { SlideFocus, SlideFocusType } from './slideFocus'
import { SlidesInView, SlidesInViewType } from './slidesInView'
import { SlideSizes } from './slideSizes'
import { Translate, TranslateType } from './translate'
import { arrayKeys, arrayLast, lastIndex } from './utils'
import { Vector1D, Vector1DType } from './vector1d'

export type Engine = {
  axis: AxisType
  direction: DirectionType
  animation: AnimationType
  scrollBounds: ScrollBoundsType
  scrollLooper: ScrollLooperType
  scrollProgress: ScrollProgressType
  index: CounterType
  indexPrevious: CounterType
  limit: LimitType
  location: Vector1DType
  options: OptionsType
  pxToPercent: PxToPercentType
  scrollBody: ScrollBodyType
  dragHandler: DragHandlerType
  slideFocus: SlideFocusType
  slideLooper: SlideLooperType
  slidesInView: SlidesInViewType
  target: Vector1DType
  translate: TranslateType
  scrollTo: ScrollToType
  scrollTarget: ScrollTargetType
  scrollSnaps: number[]
  slideIndexes: number[]
}

export function Engine(
  root: HTMLElement,
  container: HTMLElement,
  slides: HTMLElement[],
  options: OptionsType,
  events: EventEmitterType,
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
  const slideRects = slides.map((slide) => slide.getBoundingClientRect())
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

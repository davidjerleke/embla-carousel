import { Alignment } from './Alignment'
import { Animation, AnimationType } from './Animation'
import { Axis, AxisType } from './Axis'
import { Counter, CounterType } from './Counter'
import { Direction, DirectionType } from './Direction'
import { DragHandler, DragHandlerType } from './DragHandler'
import { DragTracker } from './DragTracker'
import { EventHandlerType } from './EventHandler'
import { EventStore, EventStoreType } from './EventStore'
import { LimitType } from './Limit'
import { OptionsType } from './Options'
import { PercentOfView, PercentOfViewType } from './PercentOfView'
import { ScrollBody, ScrollBodyType } from './ScrollBody'
import { ScrollBounds, ScrollBoundsType } from './ScrollBounds'
import { ScrollContain } from './ScrollContain'
import { ScrollLimit } from './ScrollLimit'
import { ScrollLooper, ScrollLooperType } from './ScrollLooper'
import { ScrollProgress, ScrollProgressType } from './ScrollProgress'
import { ScrollSnaps } from './ScrollSnaps'
import { ScrollTarget, ScrollTargetType } from './ScrollTarget'
import { ScrollTo, ScrollToType } from './ScrollTo'
import { SlideLooper, SlideLooperType } from './SlideLooper'
import { SlidesInView, SlidesInViewType } from './SlidesInView'
import { SlideSizes } from './SlideSizes'
import { SlidesToScroll, SlidesToScrollType } from './SlidesToScroll'
import { Translate, TranslateType } from './Translate'
import { arrayKeys, arrayLast, arrayLastIndex } from './utils'
import { Vector1D, Vector1DType } from './Vector1d'

export type EngineType = {
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
  percentOfView: PercentOfViewType
  scrollBody: ScrollBodyType
  dragHandler: DragHandlerType
  eventStore: EventStoreType
  slideLooper: SlideLooperType
  slidesInView: SlidesInViewType
  slidesToScroll: SlidesToScrollType
  target: Vector1DType
  translate: TranslateType
  scrollTo: ScrollToType
  scrollTarget: ScrollTargetType
  scrollSnaps: number[]
  slideIndexes: number[]
  containerRect: DOMRect
  slideRects: DOMRect[]
}

export function Engine(
  root: HTMLElement,
  container: HTMLElement,
  slides: HTMLElement[],
  options: OptionsType,
  eventHandler: EventHandlerType,
): EngineType {
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
    slidesToScroll: groupSlides,
    skipSnaps,
    containScroll,
  } = options

  // Measurements
  const containerRect = container.getBoundingClientRect()
  const slideRects = slides.map((slide) => slide.getBoundingClientRect())
  const direction = Direction(contentDirection)
  const axis = Axis(scrollAxis, contentDirection)
  const viewSize = axis.measureSize(containerRect)
  const percentOfView = PercentOfView(viewSize)
  const alignment = Alignment(align, viewSize)
  const containSnaps = !loop && containScroll !== ''
  const includeEdgeGap = loop || containScroll !== ''
  const { slideSizes, slideSizesWithGaps } = SlideSizes(
    axis,
    containerRect,
    slideRects,
    slides,
    includeEdgeGap,
  )
  const slidesToScroll = SlidesToScroll(
    viewSize,
    slideSizesWithGaps,
    groupSlides,
  )
  const { snaps, snapsAligned } = ScrollSnaps(
    axis,
    alignment,
    containerRect,
    slideRects,
    slideSizesWithGaps,
    slidesToScroll,
    containSnaps,
  )
  const contentSize = -arrayLast(snaps) + arrayLast(slideSizesWithGaps)
  const { snapsContained } = ScrollContain(
    viewSize,
    contentSize,
    snapsAligned,
    containScroll,
  )
  const scrollSnaps = containSnaps ? snapsContained : snapsAligned
  const { limit } = ScrollLimit(contentSize, scrollSnaps, loop)

  // Indexes
  const index = Counter(arrayLastIndex(scrollSnaps), startIndex, loop)
  const indexPrevious = index.clone()
  const slideIndexes = arrayKeys(slides)

  // Draw
  const update = (): void => {
    if (!loop) engine.scrollBounds.constrain(engine.dragHandler.pointerDown())
    engine.scrollBody.seek(target).update()
    const settled = engine.scrollBody.settle(target)

    if (settled && !engine.dragHandler.pointerDown()) {
      engine.animation.stop()
      eventHandler.emit('settle')
    }
    if (!settled) {
      eventHandler.emit('scroll')
    }
    if (loop) {
      engine.scrollLooper.loop(engine.scrollBody.direction())
      engine.slideLooper.loop()
    }

    engine.translate.to(location)
    engine.animation.proceed()
  }

  // Shared
  const animation = Animation(update)
  const startLocation = scrollSnaps[index.get()]
  const location = Vector1D(startLocation)
  const target = Vector1D(startLocation)
  const scrollBody = ScrollBody(location, speed, 1)
  const scrollTarget = ScrollTarget(
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
    eventHandler,
  )
  const slidesInView = SlidesInView(
    viewSize,
    contentSize,
    slideSizes,
    snaps,
    limit,
    loop,
    inViewThreshold,
  )

  // DragHandler
  const dragHandler = DragHandler(
    axis,
    direction,
    root,
    target,
    DragTracker(axis),
    location,
    animation,
    scrollTo,
    scrollBody,
    scrollTarget,
    index,
    eventHandler,
    percentOfView,
    loop,
    dragFree,
    skipSnaps,
  )

  // Engine
  const engine: EngineType = {
    containerRect,
    slideRects,
    animation,
    axis,
    direction,
    dragHandler,
    eventStore: EventStore(),
    percentOfView,
    index,
    indexPrevious,
    limit,
    location,
    options,
    scrollBody,
    scrollBounds: ScrollBounds(
      limit,
      location,
      target,
      scrollBody,
      percentOfView,
    ),
    scrollLooper: ScrollLooper(contentSize, limit, location, [
      location,
      target,
    ]),
    scrollProgress: ScrollProgress(limit),
    scrollSnaps,
    scrollTarget,
    scrollTo,
    slideLooper: SlideLooper(
      axis,
      direction,
      viewSize,
      contentSize,
      slideSizesWithGaps,
      scrollSnaps,
      slidesInView,
      location,
      slides,
    ),
    slidesToScroll,
    slidesInView,
    slideIndexes,
    target,
    translate: Translate(axis, direction, container),
  }
  return engine
}

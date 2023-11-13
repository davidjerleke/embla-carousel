import { Alignment } from './Alignment'
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
import { ResizeHandler, ResizeHandlerType } from './ResizeHandler'
import { ScrollBody, ScrollBodyType } from './ScrollBody'
import { ScrollBounds, ScrollBoundsType } from './ScrollBounds'
import { ScrollContain } from './ScrollContain'
import { ScrollLimit } from './ScrollLimit'
import { ScrollLooper, ScrollLooperType } from './ScrollLooper'
import { ScrollProgress, ScrollProgressType } from './ScrollProgress'
import { ScrollSnaps } from './ScrollSnaps'
import { SlideRegistry, SlideRegistryType } from './SlideRegistry'
import { ScrollTarget, ScrollTargetType } from './ScrollTarget'
import { ScrollTo, ScrollToType } from './ScrollTo'
import { SlideFocus, SlideFocusType } from './SlideFocus'
import { SlideLooper, SlideLooperType } from './SlideLooper'
import { SlidesHandler, SlidesHandlerType } from './SlidesHandler'
import { SlidesInView, SlidesInViewType } from './SlidesInView'
import { SlideSizes } from './SlideSizes'
import { SlidesToScroll, SlidesToScrollType } from './SlidesToScroll'
import { Translate, TranslateType } from './Translate'
import { arrayKeys, arrayLast, arrayLastIndex, WindowType } from './utils'
import { Vector1D, Vector1DType } from './Vector1d'
import {
  AnimationType,
  AnimationUpdateType,
  AnimationsType,
  AnimationRenderType
} from './Animations'

export type EngineType = {
  ownerDocument: Document
  ownerWindow: WindowType
  eventHandler: EventHandlerType
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
  offsetLocation: Vector1DType
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
  resizeHandler: ResizeHandlerType
  slidesHandler: SlidesHandlerType
  scrollTo: ScrollToType
  scrollTarget: ScrollTargetType
  scrollSnapList: number[]
  scrollSnaps: number[]
  slideIndexes: number[]
  slideFocus: SlideFocusType
  slideRegistry: SlideRegistryType['slideRegistry']
  containerRect: DOMRect
  slideRects: DOMRect[]
}

export function Engine(
  root: HTMLElement,
  container: HTMLElement,
  slides: HTMLElement[],
  ownerDocument: Document,
  ownerWindow: WindowType,
  options: OptionsType,
  eventHandler: EventHandlerType,
  animations: AnimationsType
): EngineType {
  // Options
  const {
    align,
    axis: scrollAxis,
    direction: contentDirection,
    startIndex,
    loop,
    duration,
    dragFree,
    dragThreshold,
    inViewThreshold,
    slidesToScroll: groupSlides,
    skipSnaps,
    containScroll,
    watchResize,
    watchSlides,
    watchDrag
  } = options

  // Measurements
  const containerRect = container.getBoundingClientRect()
  const slideRects = slides.map((slide) => slide.getBoundingClientRect())
  const direction = Direction(contentDirection)
  const axis = Axis(scrollAxis, contentDirection)
  const viewSize = axis.measureSize(containerRect)
  const percentOfView = PercentOfView(viewSize)
  const alignment = Alignment(align, viewSize)
  const containSnaps = !loop && !!containScroll
  const readEdgeGap = loop || !!containScroll
  const { slideSizes, slideSizesWithGaps, startGap, endGap } = SlideSizes(
    axis,
    containerRect,
    slideRects,
    slides,
    readEdgeGap,
    ownerWindow
  )
  const slidesToScroll = SlidesToScroll(
    axis,
    direction,
    viewSize,
    groupSlides,
    loop,
    containerRect,
    slideRects,
    startGap,
    endGap
  )
  const { snaps, snapsAligned } = ScrollSnaps(
    axis,
    alignment,
    containerRect,
    slideRects,
    slidesToScroll
  )
  const contentSize = -arrayLast(snaps) + arrayLast(slideSizesWithGaps)
  const { snapsContained, scrollContainLimit } = ScrollContain(
    viewSize,
    contentSize,
    snapsAligned,
    containScroll
  )
  const scrollSnaps = containSnaps ? snapsContained : snapsAligned
  const { limit } = ScrollLimit(contentSize, scrollSnaps, loop)

  // Indexes
  const index = Counter(arrayLastIndex(scrollSnaps), startIndex, loop)
  const indexPrevious = index.clone()
  const slideIndexes = arrayKeys(slides)

  // Animation
  const update: AnimationUpdateType = ({
    dragHandler,
    scrollBody,
    scrollBounds,
    options: { loop }
  }) => {
    if (!loop) scrollBounds.constrain(dragHandler.pointerDown())
    scrollBody.seek()
  }

  const render: AnimationRenderType = (
    {
      scrollBody,
      translate,
      location,
      offsetLocation,
      scrollLooper,
      slideLooper,
      dragHandler,
      animation,
      eventHandler,
      options: { loop }
    },
    lagOffset
  ) => {
    const velocity = scrollBody.velocity()
    const hasSettled = scrollBody.settled()

    if (hasSettled && !dragHandler.pointerDown()) {
      animation.stop()
      eventHandler.emit('settle')
    }
    if (!hasSettled) eventHandler.emit('scroll')

    offsetLocation.set(location.get() - velocity + velocity * lagOffset)

    if (loop) {
      scrollLooper.loop(scrollBody.direction())
      slideLooper.loop()
    }

    translate.to(offsetLocation.get())
  }

  const animation: AnimationType = {
    start: () => animations.start(engine),
    stop: () => animations.stop(engine),
    update: () => update(engine),
    render: (lagOffset: number) => render(engine, lagOffset)
  }

  // Shared
  const friction = 0.68
  const startLocation = scrollSnaps[index.get()]
  const location = Vector1D(startLocation)
  const offsetLocation = Vector1D(startLocation)
  const target = Vector1D(startLocation)
  const scrollBody = ScrollBody(
    location,
    offsetLocation,
    target,
    duration,
    friction
  )
  const scrollTarget = ScrollTarget(
    loop,
    scrollSnaps,
    contentSize,
    limit,
    target
  )
  const scrollTo = ScrollTo(
    animation,
    index,
    indexPrevious,
    scrollTarget,
    target,
    eventHandler
  )
  const scrollProgress = ScrollProgress(limit)
  const eventStore = EventStore()
  const slidesInView = SlidesInView(
    container,
    slides,
    eventHandler,
    inViewThreshold
  )
  const { slideRegistry } = SlideRegistry(
    viewSize,
    contentSize,
    containSnaps,
    containScroll,
    scrollContainLimit,
    slidesToScroll,
    slideIndexes
  )
  const slideFocus = SlideFocus(
    root,
    slides,
    slideRegistry,
    scrollTo,
    scrollBody,
    eventStore
  )

  // Engine
  const engine: EngineType = {
    ownerDocument,
    ownerWindow,
    eventHandler,
    containerRect,
    slideRects,
    animation,
    axis,
    direction,
    dragHandler: DragHandler(
      axis,
      direction,
      root,
      ownerDocument,
      ownerWindow,
      target,
      DragTracker(axis, ownerWindow),
      location,
      animation,
      scrollTo,
      scrollBody,
      scrollTarget,
      index,
      eventHandler,
      percentOfView,
      dragFree,
      dragThreshold,
      skipSnaps,
      friction,
      watchDrag
    ),
    eventStore,
    percentOfView,
    index,
    indexPrevious,
    limit,
    location,
    offsetLocation,
    options,
    resizeHandler: ResizeHandler(
      container,
      eventHandler,
      ownerWindow,
      slides,
      axis,
      watchResize
    ),
    scrollBody,
    scrollBounds: ScrollBounds(
      limit,
      location,
      target,
      scrollBody,
      percentOfView
    ),
    scrollLooper: ScrollLooper(contentSize, limit, offsetLocation, [
      location,
      offsetLocation,
      target
    ]),
    scrollProgress,
    scrollSnapList: scrollSnaps.map(scrollProgress.get),
    scrollSnaps,
    scrollTarget,
    scrollTo,
    slideLooper: SlideLooper(
      axis,
      direction,
      viewSize,
      contentSize,
      slideSizes,
      slideSizesWithGaps,
      snaps,
      scrollSnaps,
      offsetLocation,
      slides
    ),
    slideFocus,
    slidesHandler: SlidesHandler(container, eventHandler, watchSlides),
    slidesInView,
    slideIndexes,
    slideRegistry,
    slidesToScroll,
    target,
    translate: Translate(axis, direction, container)
  }

  return engine
}

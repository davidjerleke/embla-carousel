import { Alignment } from './Alignment.js'
import {
  Animations,
  AnimationsRenderType,
  AnimationsType,
  AnimationsUpdateType
} from './Animations.js'
import { Axis, AxisType } from './Axis.js'
import { Counter, CounterType } from './Counter.js'
import { DragHandler, DragHandlerType } from './DragHandler.js'
import { DragTracker } from './DragTracker.js'
import { EventHandlerType } from './EventHandler.js'
import { EventStore, EventStoreType } from './EventStore.js'
import { LimitType } from './Limit.js'
import { NodeRectType, NodeRects } from './NodeRects.js'
import { OptionsType } from './Options.js'
import { PercentOfView, PercentOfViewType } from './PercentOfView.js'
import { ResizeHandler, ResizeHandlerType } from './ResizeHandler.js'
import { ScrollBody, ScrollBodyType } from './ScrollBody.js'
import { ScrollBounds, ScrollBoundsType } from './ScrollBounds.js'
import { ScrollContain } from './ScrollContain.js'
import { ScrollLimit } from './ScrollLimit.js'
import { ScrollLooper, ScrollLooperType } from './ScrollLooper.js'
import { ScrollProgress, ScrollProgressType } from './ScrollProgress.js'
import { ScrollSnaps } from './ScrollSnaps.js'
import { ScrollTarget, ScrollTargetType } from './ScrollTarget.js'
import { ScrollTo, ScrollToType } from './ScrollTo.js'
import { SlideFocus, SlideFocusType } from './SlideFocus.js'
import { SlideLooper, SlideLooperType } from './SlideLooper.js'
import { SlideRegistry, SlideRegistryType } from './SlideRegistry.js'
import { SlideSizes } from './SlideSizes.js'
import { SlidesHandler, SlidesHandlerType } from './SlidesHandler.js'
import { SlidesInView, SlidesInViewType } from './SlidesInView.js'
import { SlidesToScroll, SlidesToScrollType } from './SlidesToScroll.js'
import { Translate, TranslateType } from './Translate.js'
import { Vector1D, Vector1DType } from './Vector1d.js'
import { WindowType, arrayKeys, arrayLast, arrayLastIndex } from './utils.js'

export type EngineType = {
  ownerDocument: Document
  ownerWindow: WindowType
  eventHandler: EventHandlerType
  axis: AxisType
  animation: AnimationsType
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
  containerRect: NodeRectType
  slideRects: NodeRectType[]
}

export function Engine(
  root: HTMLElement,
  container: HTMLElement,
  slides: HTMLElement[],
  ownerDocument: Document,
  ownerWindow: WindowType,
  options: OptionsType,
  eventHandler: EventHandlerType
): EngineType {
  // Options
  const {
    align,
    axis: scrollAxis,
    direction,
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
  const pixelTolerance = 2
  const nodeRects = NodeRects()
  const containerRect = nodeRects.measure(container)
  const slideRects = slides.map(nodeRects.measure)
  const axis = Axis(scrollAxis, direction)
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
    viewSize,
    groupSlides,
    loop,
    containerRect,
    slideRects,
    startGap,
    endGap,
    pixelTolerance
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
    containScroll,
    pixelTolerance
  )
  const scrollSnaps = containSnaps ? snapsContained : snapsAligned
  const { limit } = ScrollLimit(contentSize, scrollSnaps, loop)

  // Indexes
  const index = Counter(arrayLastIndex(scrollSnaps), startIndex, loop)
  const indexPrevious = index.clone()
  const slideIndexes = arrayKeys(slides)

  // Animation
  const update: AnimationsUpdateType = ({
    dragHandler,
    scrollBody,
    scrollBounds,
    options: { loop }
  }) => {
    if (!loop) scrollBounds.constrain(dragHandler.pointerDown())
    scrollBody.seek()
  }

  const render: AnimationsRenderType = (
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
  const animation = Animations(
    ownerDocument,
    ownerWindow,
    () => update(engine),
    (lagOffset: number) => render(engine, lagOffset)
  )

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
    scrollBody,
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
    containSnaps,
    containScroll,
    scrollSnaps,
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
    dragHandler: DragHandler(
      axis,
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
      watchResize,
      nodeRects
    ),
    scrollBody,
    scrollBounds: ScrollBounds(
      limit,
      offsetLocation,
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
    translate: Translate(axis, container)
  }

  return engine
}

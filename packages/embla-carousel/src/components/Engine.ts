import { Alignment } from './Alignment'
import {
  Animations,
  AnimationsType,
  AnimationsUpdateType,
  AnimationsRenderType
} from './Animations'
import { Axis, AxisType } from './Axis'
import { Counter, CounterType } from './Counter'
import { DragHandler, DragHandlerType } from './DragHandler'
import { DragTracker } from './DragTracker'
import { EventHandlerType } from './EventHandler'
import { EventStore, EventStoreType } from './EventStore'
import { LimitType } from './Limit'
import { NodeRectType } from './NodeHandler'
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
import { arrayKeys, arrayLast, arrayLastIndex } from './utils'
import { Vector1D, Vector1DType } from './Vector1d'
import { WatchHandlerType } from './WatchHandler'
import { NodeHandlerType } from './NodeHandler'

export type EngineType = {
  isSsr: boolean
  eventHandler: EventHandlerType
  watchHandler: WatchHandlerType
  contentSize: number
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
  previousLocation: Vector1DType
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
  slideTranslates: TranslateType[]
  resizeHandler: ResizeHandlerType
  slidesHandler: SlidesHandlerType
  nodeHandler: NodeHandlerType
  scrollTo: ScrollToType
  scrollTarget: ScrollTargetType
  snapList: number[]
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
  options: OptionsType,
  nodeHandler: NodeHandlerType,
  eventHandler: EventHandlerType,
  watchHandler: WatchHandlerType,
  isSsr: boolean
): EngineType {
  // Options
  const {
    align,
    axis: scrollAxis,
    direction,
    startSnap,
    loop,
    duration,
    dragFree,
    dragThreshold,
    inViewThreshold,
    slidesToScroll: groupSlides,
    skipSnaps,
    containScroll,
    draggable,
    resize,
    slideChanges,
    focus
  } = options

  // Measurements
  const pixelTolerance = isSsr ? 0 : 2
  const axis = Axis(scrollAxis, direction)
  const { containerRect, slideRects } = nodeHandler.getRects(container, slides)
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
    nodeHandler
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
  const index = Counter(arrayLastIndex(scrollSnaps), startSnap, loop)
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
      previousLocation,
      scrollLooper,
      slideLooper,
      dragHandler,
      animation,
      eventHandler,
      scrollBounds,
      options: { loop }
    },
    alpha
  ) => {
    const shouldSettle = scrollBody.settled()
    const withinBounds = !scrollBounds.shouldConstrain()
    const hasSettled = loop ? shouldSettle : shouldSettle && withinBounds
    const hasSettledAndIdle = hasSettled && !dragHandler.pointerDown()

    if (hasSettledAndIdle) animation.stop()

    const interpolatedLocation =
      location.get() * alpha + previousLocation.get() * (1 - alpha)

    offsetLocation.set(interpolatedLocation)

    if (loop) {
      scrollLooper.loop(scrollBody.direction())
      slideLooper.loop()
    }

    translate.to(offsetLocation.get())

    if (hasSettledAndIdle) eventHandler.emit('settle', null)
    if (!hasSettled) eventHandler.emit('scroll', null)
  }

  const animation = Animations(
    () => update(engine),
    (alpha: number) => render(engine, alpha)
  )

  // Shared
  const friction = 0.68
  const startLocation = scrollSnaps[index.get()]
  const location = Vector1D(startLocation)
  const previousLocation = Vector1D(startLocation)
  const offsetLocation = Vector1D(startLocation)
  const target = Vector1D(startLocation)
  const translate = Translate(axis, container)
  const slideTranslates = slides.map((slide) => Translate(axis, slide))

  const scrollBody = ScrollBody(
    location,
    offsetLocation,
    previousLocation,
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
    focus,
    root,
    slides,
    slideRegistry,
    scrollTo,
    scrollBody,
    eventStore,
    eventHandler,
    watchHandler
  )

  // Engine
  const engine: EngineType = {
    eventHandler,
    containerRect,
    contentSize,
    slideRects,
    nodeHandler,
    animation,
    isSsr,
    axis,
    dragHandler: DragHandler(
      draggable,
      axis,
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
      watchHandler,
      percentOfView,
      dragFree,
      dragThreshold,
      skipSnaps,
      friction
    ),
    eventStore,
    percentOfView,
    index,
    indexPrevious,
    limit,
    location,
    offsetLocation,
    previousLocation,
    options,
    resizeHandler: ResizeHandler(
      resize,
      container,
      eventHandler,
      watchHandler,
      slides,
      axis,
      nodeHandler
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
      previousLocation,
      target
    ]),
    scrollProgress,
    snapList: scrollSnaps.map(scrollProgress.get),
    scrollSnaps,
    scrollTarget,
    scrollTo,
    slideLooper: SlideLooper(
      viewSize,
      contentSize,
      slideSizes,
      slideSizesWithGaps,
      snaps,
      scrollSnaps,
      offsetLocation,
      slideTranslates
    ),
    slideFocus,
    slidesHandler: SlidesHandler(
      slideChanges,
      container,
      eventHandler,
      watchHandler
    ),
    slidesInView,
    slideIndexes,
    slideRegistry,
    slidesToScroll,
    slideTranslates,
    translate,
    target,
    watchHandler
  }

  return engine
}

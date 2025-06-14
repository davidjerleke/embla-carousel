import { Alignment } from './Alignment'
import { Animations, AnimationsType } from './Animations'
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
import { ScrollAnimator } from './ScrollAnimator'
import { ScrollBody, ScrollBodyType } from './ScrollBody'
import { ScrollBounds, ScrollBoundsType } from './ScrollBounds'
import { ScrollContain } from './ScrollContain'
import { ScrollLimit } from './ScrollLimit'
import { ScrollLooper, ScrollLooperType } from './ScrollLooper'
import { SlideScroller, SlideScrollerType } from './SlideScroller'
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
import { NodeHandlerType } from './NodeHandler'

export type EngineType = {
  isSsr: boolean
  eventHandler: EventHandlerType
  contentSize: number
  axis: AxisType
  animation: AnimationsType
  scrollBounds: ScrollBoundsType
  scrollLooper: ScrollLooperType
  slideScroller: SlideScrollerType
  scrollProgress: ScrollProgressType
  indexCurrent: CounterType
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
  const indexCurrent = Counter(arrayLastIndex(scrollSnaps), startSnap, loop)
  const indexPrevious = indexCurrent.clone()
  const slideIndexes = arrayKeys(slides)

  // Animation
  const scrollAnimator = ScrollAnimator()
  const animation = Animations(
    () => scrollAnimator.update(engine),
    (alpha: number) => scrollAnimator.render(engine, alpha)
  )

  // Shared
  const friction = 0.68
  const startLocation = scrollSnaps[indexCurrent.get()]
  const location = Vector1D(startLocation)
  const previousLocation = Vector1D(startLocation)
  const offsetLocation = Vector1D(startLocation)
  const target = Vector1D(startLocation)
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
    indexCurrent,
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
    eventHandler
  )
  const slideLooper = SlideLooper(
    viewSize,
    contentSize,
    slideSizes,
    slideSizesWithGaps,
    snaps,
    scrollSnaps,
    offsetLocation
  )
  const slideScroller = SlideScroller(
    viewSize,
    contentSize,
    slideSizes,
    snaps,
    slideIndexes,
    loop,
    indexCurrent,
    slideRegistry,
    offsetLocation,
    target,
    slideTranslates,
    slideLooper
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
      indexCurrent,
      eventHandler,
      percentOfView,
      dragFree,
      dragThreshold,
      skipSnaps,
      friction
    ),
    eventStore,
    percentOfView,
    indexCurrent,
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
    slideLooper,
    slideFocus,
    slidesHandler: SlidesHandler(slideChanges, container, eventHandler),
    slidesInView,
    slideIndexes,
    slideRegistry,
    slidesToScroll,
    slideScroller,
    slideTranslates,
    target
  }

  return engine
}

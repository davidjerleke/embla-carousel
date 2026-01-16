import { Alignment } from './Alignment'
import { Animations, AnimationsType } from './Animations'
import { Axis, AxisType } from './Axis'
import { Counter, CounterType } from './Counter'
import { DragHandler, DragHandlerType } from './DragHandler'
import { DragTracker } from './DragTracker'
import { EventHandlerType } from './EventHandler'
import { EventStore, EventStoreType } from './EventStore'
import { LimitType } from './Limit'
import { NodeRectsType, NodeRectType } from './NodeHandler'
import { OptionsType } from './Options'
import { PercentOfView, PercentOfViewType } from './PercentOfView'
import { ResizeHandler, ResizeHandlerType } from './ResizeHandler'
import { ScrollAnimator } from './ScrollAnimator'
import { ScrollBody, ScrollBodyType } from './ScrollBody'
import { ScrollBounds, ScrollBoundsType } from './ScrollBounds'
import { ScrollContain } from './ScrollContain'
import { ScrollLimit } from './ScrollLimit'
import { ScrollLooper, ScrollLooperType } from './ScrollLooper'
import { ScrollProgress, ScrollProgressType } from './ScrollProgress'
import { ScrollSnaps } from './ScrollSnaps'
import { ScrollSnapList, ScrollSnapListType } from './ScrollSnapList'
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
import { NumberStore, NumberStoreType } from './NumberStore'
import { NodeHandlerType } from './NodeHandler'
import { ScrollOptimizer, ScrollOptimizerType } from './ScrollOptimizer'

export type EngineType = {
  isSsr: boolean
  eventHandler: EventHandlerType
  contentSize: number
  axis: AxisType
  animation: AnimationsType
  scrollBounds: ScrollBoundsType
  scrollLooper: ScrollLooperType
  scrollProgress: ScrollProgressType
  indexCurrent: CounterType
  indexPrevious: CounterType
  limit: LimitType
  location: NumberStoreType
  offsetLocation: NumberStoreType
  previousLocation: NumberStoreType
  options: OptionsType
  percentOfView: PercentOfViewType
  scrollBody: ScrollBodyType
  dragHandler: DragHandlerType
  eventStore: EventStoreType
  slideLooper: SlideLooperType
  slidesInView: SlidesInViewType
  slidesToScroll: SlidesToScrollType
  target: NumberStoreType
  translate: TranslateType
  slideTranslates: TranslateType[]
  resizeHandler: ResizeHandlerType
  slidesHandler: SlidesHandlerType
  nodeHandler: NodeHandlerType
  scrollTo: ScrollToType
  scrollTarget: ScrollTargetType
  scrollSnaps: number[]
  slideIndexes: number[]
  scrollOptimizer: ScrollOptimizerType
  slideSizes: number[]
  slideFocus: SlideFocusType
  scrollSnapList: ScrollSnapListType
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
  rects: NodeRectsType,
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
    inViewMargin,
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
  const { containerRect, slideRects } = rects
  const viewSize = axis.getSize(containerRect)
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
  const location = NumberStore(startLocation)
  const previousLocation = NumberStore(startLocation)
  const offsetLocation = NumberStore(startLocation)
  const target = NumberStore(startLocation)
  const translate = Translate(axis, container)
  const slideTranslates = slides.map((slide) => Translate(axis, slide))

  const scrollProgress = ScrollProgress(limit)
  const scrollBody = ScrollBody(
    location,
    offsetLocation,
    previousLocation,
    target,
    duration,
    friction
  )
  const scrollSnapList = ScrollSnapList(
    containSnaps,
    containScroll,
    scrollSnaps,
    scrollContainLimit,
    slidesToScroll,
    slideIndexes,
    scrollProgress
  )
  const slideLooper = SlideLooper(
    viewSize,
    contentSize,
    slideSizes,
    slideSizesWithGaps,
    snaps,
    scrollSnaps,
    offsetLocation,
    slideTranslates
  )
  const scrollOptimizer = ScrollOptimizer(
    viewSize,
    contentSize,
    slideSizesWithGaps,
    snaps,
    loop,
    indexCurrent,
    scrollSnapList,
    offsetLocation,
    target,
    slideTranslates,
    slideLooper,
    eventHandler
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
  const eventStore = EventStore()
  const slidesInView = SlidesInView(
    container,
    slides,
    eventHandler,
    inViewThreshold,
    inViewMargin
  )
  const slideFocus = SlideFocus(
    axis,
    focus,
    root,
    slides,
    scrollSnapList,
    scrollTo,
    scrollBody,
    eventStore,
    eventHandler
  )

  // Engine
  const engine: EngineType = {
    eventHandler,
    containerRect,
    contentSize,
    slideRects,
    nodeHandler,
    animation,
    slideSizes,
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
    scrollSnaps,
    scrollTarget,
    scrollTo,
    slideLooper,
    slideFocus,
    slidesHandler: SlidesHandler(slideChanges, container, eventHandler),
    slidesInView,
    slideIndexes,
    slidesToScroll,
    slideTranslates,
    scrollSnapList,
    scrollOptimizer,
    translate,
    target
  }

  return engine
}

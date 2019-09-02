import { AlignSize } from './alignSize'
import { Animation } from './animation'
import { ChunkSize } from './chunkSize'
import { Counter } from './counter'
import { DragBehaviour } from './dragBehaviour'
import { EventDispatcher } from './eventDispatcher'
import { Limit } from './limit'
import { Mover } from './mover'
import { Options } from './options'
import { Pointer } from './pointer'
import { Scroll } from './scroll'
import { ScrollBounds } from './scrollBounds'
import { ScrollContain } from './scrollContain'
import { ScrollLooper } from './scrollLooper'
import { ScrollSnap } from './scrollSnap'
import { ScrollTarget } from './scrollTarget'
import { SlideLooper } from './slideLooper'
import { Translate } from './translate'
import { groupNumbers, rectWidth } from './utils'
import { Vector1D } from './vector1d'

export type Engine = {
  animation: Animation
  scrollBounds: ScrollBounds
  scrollLooper: ScrollLooper
  index: Counter
  indexPrevious: Counter
  indexGroups: number[][]
  mover: Mover
  pointer: DragBehaviour
  slideLooper: SlideLooper
  target: Vector1D
  translate: Translate
  scroll: Scroll
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
  const chunkSize = ChunkSize(containerSize)
  const viewSize = chunkSize.root
  const slideIndexes = Object.keys(slides).map(Number)
  const slideSizes = slides.map(rectWidth).map(chunkSize.measure)
  const groupedSizes = groupNumbers(slideSizes, slidesToScroll)
  const snapSizes = groupedSizes.map(g => g.reduce((a, s) => a + s))
  const contentSize = slideSizes.reduce((a, s) => a + s)
  const alignSize = AlignSize({ align, viewSize })
  const snap = ScrollSnap({ snapSizes, alignSize, loop })
  const scrollContain = ScrollContain({
    alignSize,
    contentSize,
    slideIndexes,
    slidesToScroll,
    viewSize,
  })
  const contain = !loop && containScroll
  const defaultSnaps = snapSizes.map(snap.measure)
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
  const loopSize = -contentSize + chunkSize.measure(1)
  const max = scrollSnaps[0]
  const min = loop ? max + loopSize : scrollSnaps[index.max]
  const limit = Limit({ max, min })

  // Direction
  const direction = (): number =>
    pointer.isDown()
      ? pointer.direction.get()
      : engine.mover.direction.get()

  // Draw
  const update = (): void => {
    engine.mover.seek(target).update()
    if (!pointer.isDown()) {
      if (!loop) engine.scrollBounds.constrain(target)
      if (engine.mover.settle(target)) engine.animation.stop()
    }
    if (loop) {
      engine.scrollLooper.loop(direction())
      engine.slideLooper.loop(slides)
    }
    if (engine.mover.location.get() !== target.get()) {
      events.dispatch('scroll')
    }
    engine.translate.to(engine.mover.location)
    engine.animation.proceed()
  }

  // Shared
  const animation = Animation(update)
  const startLocation = scrollSnaps[index.get()]
  const location = Vector1D(startLocation)
  const target = Vector1D(startLocation)
  const mover = Mover({ location, speed, mass: 1 })
  const scroll = Scroll({
    animation,
    events,
    index,
    indexPrevious,
    scrollTarget: ScrollTarget({
      align,
      contentSize,
      dragFree,
      index,
      limit,
      loop,
      scrollSnaps,
      snapSizes,
      target,
    }),
    target,
  })

  // Pointer
  const pointer = DragBehaviour({
    animation,
    dragFree,
    element: root,
    events,
    index,
    limit,
    location,
    loop,
    mover,
    pointer: Pointer(chunkSize),
    scroll,
    snapSizes,
    target,
  })

  // Slider
  const engine: Engine = {
    animation,
    index,
    indexGroups,
    indexPrevious,
    mover,
    pointer,
    scroll,
    scrollBounds: ScrollBounds({
      animation,
      limit,
      location,
      mover,
      tolerance: 50,
    }),
    scrollLooper: ScrollLooper({
      contentSize,
      limit,
      location,
      vectors: [location, target],
    }),
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

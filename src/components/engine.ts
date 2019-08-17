import { AlignSize } from './alignSize'
import { Animation } from './animation'
import { ChunkSize } from './chunkSize'
import { Counter } from './counter'
import { DragBehaviour } from './dragBehaviour'
import { EventDispatcher } from './eventDispatcher'
import { InfiniteShifter } from './infiniteShifter'
import { Limit } from './limit'
import { Mover } from './mover'
import { Options } from './options'
import { Pointer } from './pointer'
import { Scroll } from './scroll'
import { ScrollBounds } from './scrollBounds'
import { ScrollLooper } from './scrollLooper'
import { ScrollSnap } from './scrollSnap'
import { ScrollTarget } from './scrollTarget'
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
  shifter: InfiniteShifter
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

  // Index
  const indexMin = 0
  const indexMax = Math.ceil(slides.length / slidesToScroll) - 1
  const indexes = Object.keys(slides).map(Number)
  const indexGroups = groupNumbers(indexes, slidesToScroll)
  const indexSpan = Limit({ min: indexMin, max: indexMax })
  const index = Counter({ limit: indexSpan, start: startIndex, loop })
  const indexPrevious = index.clone()

  // Measurements
  const containerSize = rectWidth(container)
  const chunkSize = ChunkSize(containerSize)
  const viewSize = chunkSize.root
  const slideSizes = slides.map(rectWidth).map(chunkSize.measure)
  const groupedSizes = groupNumbers(slideSizes, slidesToScroll)
  const snapSizes = groupedSizes.map(g => g.reduce((a, s) => a + s))
  const contentSize = snapSizes.reduce((a, s) => a + s)
  const alignSize = AlignSize({ align, viewSize })
  const contain = !loop && containScroll
  const scrollSnap = ScrollSnap({
    alignSize,
    contain,
    contentSize,
    index,
    snapSizes,
    viewSize,
  })
  const scrollSnaps = snapSizes.map(scrollSnap.measure)
  const loopSize = -contentSize + chunkSize.measure(1)
  const max = scrollSnaps[0]
  const min = loop ? max + loopSize : scrollSnaps[index.max]
  const limit = Limit({ max, min })

  // Direction
  const direction = (): number =>
    pointer.isDown()
      ? pointer.direction.get()
      : slider.mover.direction.get()

  // Draw
  const update = (): void => {
    slider.mover.seek(target).update()
    if (!pointer.isDown()) {
      if (!loop) slider.scrollBounds.constrain(target)
      if (slider.mover.settle(target)) slider.animation.stop()
    }
    if (loop) {
      slider.scrollLooper.loop(direction())
      slider.shifter.shiftInfinite(slides)
    }
    if (slider.mover.location.get() !== target.get()) {
      events.dispatch('scroll')
    }
    slider.translate.to(slider.mover.location)
    slider.animation.proceed()
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
  const slider: Engine = {
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
    shifter: InfiniteShifter({
      contentSize,
      location,
      scrollSnaps,
      slideSizes,
      viewSize,
    }),
    target,
    translate: Translate(container),
  }
  return Object.freeze(slider)
}

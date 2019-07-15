import { AlignSize } from './alignSize'
import { Animation } from './animation'
import { ChunkSize } from './chunkSize'
import { Counter } from './counter'
import { DragBehaviour } from './dragBehaviour'
import { EdgeGuard } from './edgeGuard'
import { EdgeLooper } from './edgeLooper'
import { EventDispatcher } from './eventDispatcher'
import { InfiniteShifter } from './infiniteShifter'
import { Limit } from './limit'
import { Mover } from './mover'
import { Options } from './options'
import { Pointer } from './pointer'
import { Scroller } from './scroller'
import { SnapPosition } from './snapPosition'
import { TargetFinder } from './targetFinder'
import { Translate } from './translate'
import { groupNumbers, rectWidth } from './utils'
import { Vector1D } from './vector1d'

export type Engine = {
  animation: Animation
  edgeGuard: EdgeGuard
  edgeLooper: EdgeLooper
  index: Counter
  indexPrevious: Counter
  indexGroups: number[][]
  mover: Mover
  pointer: DragBehaviour
  shifter: InfiniteShifter
  target: Vector1D
  translate: Translate
  scroll: Scroller
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
  const snapPosition = SnapPosition({
    alignSize,
    contain,
    contentSize,
    index,
    snapSizes,
    viewSize,
  })
  const snapPositions = snapSizes.map(snapPosition.measure)
  const loopSize = -contentSize + chunkSize.measure(1)
  const max = snapPositions[0]
  const min = loop ? max + loopSize : snapPositions[index.max]
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
      if (!loop) slider.edgeGuard.constrain(target)
      if (slider.mover.settle(target)) slider.animation.stop()
    }
    if (loop) {
      slider.edgeLooper.loop(direction())
      slider.shifter.shiftInfinite(slides)
    }
    slider.translate.to(slider.mover.location)
    slider.animation.proceed()
  }

  // Shared
  const animation = Animation(update)
  const startLocation = snapPositions[index.get()]
  const location = Vector1D(startLocation)
  const target = Vector1D(startLocation)
  const mover = Mover({ location, speed, mass: 1 })
  const scroll = Scroller({
    animation,
    events,
    findTarget: TargetFinder({
      align,
      contentSize,
      dragFree,
      index,
      limit,
      loop,
      snapPositions,
      snapSizes,
      target,
    }),
    index,
    indexPrevious,
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
    edgeGuard: EdgeGuard({
      animation,
      limit,
      location,
      mover,
      tolerance: 50,
    }),
    edgeLooper: EdgeLooper({
      contentSize,
      limit,
      location,
      vectors: [location, target],
    }),
    index,
    indexGroups,
    indexPrevious,
    mover,
    pointer,
    scroll,
    shifter: InfiniteShifter({
      contentSize,
      location,
      slideSizes,
      snapPositions,
      viewSize,
    }),
    target,
    translate: Translate(container),
  }
  return Object.freeze(slider)
}

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
import { TargetFinder } from './targetFinder'
import { Translate } from './translate'
import { Traveller } from './traveller'
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
  travel: Traveller
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
  } = options

  // Index
  const indexMax = Math.ceil(slides.length / slidesToScroll) - 1
  const indexes = Object.keys(slides).map(Number)
  const indexGroups = groupNumbers(indexes, slidesToScroll)
  const index = Counter({
    limit: Limit({ max: indexMax, min: 0 }),
    loop,
    start: startIndex,
  })
  const indexPrevious = index.clone()

  // Measurements
  const rootSize = rectWidth(container)
  const chunkSize = ChunkSize(rootSize)
  const alignSize = AlignSize({ align, root: chunkSize.root })
  const slideSizes = slides.map(rectWidth).map(chunkSize.measure)
  const groupedSizes = groupNumbers(slideSizes, slidesToScroll)
  const groupSizes = groupedSizes.map(g => g.reduce((a, s) => a + s))
  const alignSizes = groupSizes.map(alignSize.measure)
  const contentSize = groupSizes.reduce((a, s) => a + s)
  const diffSizes = groupSizes.map((size, i) => {
    const next = index.clone().set(i + 1)
    return size + alignSizes[i] - alignSizes[next.get()]
  })
  const groupPositions = groupSizes.map((s, i) => {
    const sizes = diffSizes.slice(0, i)
    return sizes.reduce((a, d) => a - d, alignSizes[0])
  })
  const loopSize = -contentSize + chunkSize.measure(1)
  const max = groupPositions[0]
  const min = loop ? max + loopSize : groupPositions[index.max]
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
      if (slider.mover.settle(target)) {
        slider.animation.stop()
        slider.translate.useType('x')
      }
    }
    if (loop) {
      slider.edgeLooper.loop(direction())
      slider.shifter.shiftInfinite(slides)
    }
    slider.translate.to(slider.mover.location).useType('x3d')
    slider.animation.proceed()
  }

  // Shared
  const animation = Animation(update)
  const startLocation = groupPositions[index.get()]
  const location = Vector1D(startLocation)
  const target = Vector1D(startLocation)
  const vectors = [location, target]
  const mover = Mover({
    location,
    mass: 1.5,
    maxForce: chunkSize.root * 2,
    speed,
  })
  const travel = Traveller({
    animation,
    events,
    findTarget: TargetFinder({
      diffSizes,
      dragFree,
      groupPositions,
      groupSizes,
      index,
      limit,
      loop,
      span: contentSize,
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
    groupSizes,
    index,
    limit,
    location,
    loop,
    mover,
    pointer: Pointer(chunkSize),
    target,
    travel,
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
      limit,
      location,
      span: contentSize,
      vectors,
    }),
    index,
    indexGroups,
    indexPrevious,
    mover,
    pointer,
    shifter: InfiniteShifter({
      alignSizes,
      chunkSize,
      location,
      slideSizes,
      span: contentSize,
    }),
    target,
    translate: Translate(container),
    travel,
  }
  return Object.freeze(slider)
}

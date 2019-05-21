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
    groupSlides,
  } = options
  const speedLimit = Limit({ min: 5, max: 20 })

  // Index
  const indexMax = Math.ceil(slides.length / groupSlides) - 1
  const index = Counter({
    limit: Limit({
      max: indexMax,
      min: 0,
    }),
    loop,
    start: startIndex,
  })

  // Measurements
  const rootSize = rectWidth(container)
  const chunkSize = ChunkSize(rootSize)
  const alignSize = AlignSize({ align, root: chunkSize.root })
  const slideSizes = slides.map(rectWidth).map(chunkSize.measure)
  const groupedSizes = groupNumbers(slideSizes, groupSlides)
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
    if (!pointer.isDown()) {
      if (!loop) {
        slider.edgeGuard.constrain(target)
      }
      slider.mover.seek(target).update()

      if (slider.mover.settle(target)) {
        slider.animation.stop()
        slider.translate.useType('x')
      }
    }
    if (loop) {
      slider.edgeLooper.loop(direction())
      slider.shifter.shiftAccordingTo(slider.mover.location)
    }
    slider.translate.to(slider.mover.location).useType('x3d')
    slider.animation.proceed()
  }

  // Shared
  const animation = Animation(update)
  const startLocation = groupPositions[index.get()]
  const locationAtDragStart = Vector1D(startLocation)
  const location = Vector1D(startLocation)
  const target = Vector1D(startLocation)
  const vectors = [locationAtDragStart, location, target]
  const mover = Mover({
    location,
    mass: 1.5,
    maxForce: chunkSize.root * 2,
    speed: speedLimit.constrain(speed),
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
      location,
      loop,
      span: contentSize,
      target,
    }),
    index,
    target,
  })

  // Pointer
  const pointer = DragBehaviour({
    animation,
    element: root,
    events,
    index,
    limit,
    location,
    locationAtDragStart,
    loop,
    mover,
    pointer: Pointer(chunkSize),
    target,
    travel,
  })

  // Slider
  const slider = {
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
    mover,
    pointer,
    shifter: InfiniteShifter({
      alignSizes,
      chunkSize,
      contentSize,
      slideSizes,
      slides,
    }),
    target,
    translate: Translate(container),
    travel,
  }

  return slider
}

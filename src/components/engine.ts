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
import { TargetFinder } from './targetFinder'
import { Translate } from './translate'
import { Traveller } from './traveller'
import { groupedArray, rectWidth } from './utils'
import { Vector1D } from './vector1d'
import { VectorBounds } from './vectorBounds'
import { VectorLooper } from './vectorLooper'

export type Engine = {
  animation: Animation
  bounds: VectorBounds
  index: Counter
  pointer: DragBehaviour
  target: Vector1D
  translate: Translate
  travel: Traveller
  infinite: VectorLooper
  shifter: InfiniteShifter
  mover: Mover
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
      min: 0,
      max: indexMax,
    }),
    loop,
    start: startIndex,
  })

  // Measurements
  const rootSize = rectWidth(container)
  const chunkSize = ChunkSize(rootSize)
  const alignSize = AlignSize({ align, root: chunkSize.root })
  const slideSizes = slides.map(rectWidth).map(chunkSize.measure)
  const groupedSizes = groupedArray(slideSizes, groupSlides)
  const groupSizes = groupedSizes.map(g => g.reduce((a, s) => a + s))
  const alignSizes = groupSizes.map(alignSize.measure)
  const contentSize = groupSizes.reduce((a, s) => a + s, 0)
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
        slider.bounds.constrain(target)
      }
      slider.mover.seek(target).update()

      if (slider.mover.settle(target)) {
        slider.animation.stop()
        slider.translate.useType('x')
      }
    }
    if (loop) {
      slider.infinite.loop(direction())
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
      groupSizes,
      index,
      limit,
      location,
      loop,
      groupPositions,
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
    bounds: VectorBounds({
      animation,
      limit,
      location,
      mover,
      tolerance: 50,
    }),
    index,
    infinite: VectorLooper({
      limit,
      location,
      span: contentSize,
      vectors,
    }),
    mover,
    pointer,
    shifter: InfiniteShifter({
      alignSizes,
      chunkSize,
      contentSize,
      slides,
      slideSizes,
    }),
    target,
    translate: Translate(container),
    travel,
  }

  return slider
}

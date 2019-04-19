import { ChunkSize } from './chunkSize'
import { Direction } from './direction'
import { Vector1D } from './vector1d'

type Axis = 'x' | 'y'

type State = {
  isDown: boolean
  isMouse: boolean
  trackPoints: number[]
  trackTime: number
}

export type Pointer = {
  direction: Direction
  isDown: () => boolean
  down: (evt: Event) => number
  move: (evt: Event) => number
  up: () => number
  read: (evt: any, axis: Axis) => Vector1D
}

export function Pointer(size: ChunkSize): Pointer {
  const self = {} as Pointer
  const coords = { x: 'clientX', y: 'clientY' }
  const startDrag = Vector1D(0)
  const diffDrag = Vector1D(0)
  const lastDrag = Vector1D(0)
  const direction = Direction(0)
  const pointValue = Vector1D(0)
  const trackInterval = 10
  const pointer: State = {
    isDown: false,
    isMouse: false,
    trackPoints: [],
    trackTime: new Date().getTime(),
  }

  function readPoint(evt: any, axis: Axis): Vector1D {
    const { isMouse } = pointer
    const c = coords[axis]
    const value = isMouse ? evt[c] : evt.touches[0][c]
    return pointValue.setNumber(value)
  }

  function down(evt: Event): number {
    pointer.isMouse = !!evt.type.match(/mouse/)
    const point = readPoint(evt, 'x')
    startDrag.set(point)
    lastDrag.set(point)
    pointer.isDown = true
    return size.measure(startDrag.get())
  }

  function move(evt: Event): number {
    const point = readPoint(evt, 'x')
    const time2 = new Date().getTime()
    const time1 = pointer.trackTime

    if (time2 - time1 >= trackInterval) {
      pointer.trackPoints.push(point.get())
      pointer.trackTime = time2
    }

    diffDrag.set(point).subtract(lastDrag)
    direction.set(diffDrag)
    lastDrag.set(point)
    return size.measure(diffDrag.get())
  }

  function up(): number {
    const currentPoint = lastDrag.get()
    const trackLength = pointer.isMouse ? 5 : 4

    lastDrag.setNumber(
      pointer.trackPoints
        .slice(-trackLength)
        .map(point => currentPoint - point)
        .sort((p1, p2) =>
          Math.abs(p1) < Math.abs(p2) ? 1 : -1,
        )[0] || 0,
    )

    pointer.isDown = false
    pointer.trackPoints = []
    return size.measure(lastDrag.get())
  }

  return Object.assign(self, {
    direction,
    down,
    isDown: () => pointer.isDown,
    move,
    read: readPoint,
    up,
  })
}

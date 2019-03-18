import { ChunkSize } from './chunkSize'
import { Direction } from './direction'
import { Vector1D } from './vector1d'

type Axis = 'x' | 'y'

interface State {
  isDown: boolean
  trackPoints: number[]
  trackTime: number
}

export interface Pointer {
  direction: Direction
  isDown(): boolean
  down(evt: Event): number
  move(evt: Event): number
  up(): number
  read(evt: any, axis: Axis): Vector1D
}

export function Pointer(size: ChunkSize): Pointer {
  const self = {} as Pointer
  const coords = { x: 'clientX', y: 'clientY' }
  const startDrag = Vector1D(0)
  const diffDrag = Vector1D(0)
  const lastDrag = Vector1D(0)
  const direction = Direction(0)
  const pointValue = Vector1D(0)
  const state: State = {
    isDown: false,
    trackPoints: [],
    trackTime: new Date().getTime(),
  }

  function readPoint(evt: any, axis: Axis): Vector1D {
    const isMouse = !!evt.type.match(/mouse/)
    const c = coords[axis]
    const value = isMouse ? evt[c] : evt.touches[0][c]
    return pointValue.setNumber(value)
  }

  function down(evt: Event): number {
    const point = readPoint(evt, 'x')
    startDrag.set(point)
    lastDrag.set(point)
    state.isDown = true
    return size.measure(startDrag.get())
  }

  function move(evt: Event): number {
    const point = readPoint(evt, 'x')
    const time2 = new Date().getTime()
    const time1 = state.trackTime

    if (time2 - time1 >= 10) {
      state.trackPoints.push(point.get())
      state.trackTime = time2
    }

    diffDrag.set(point).subtract(lastDrag)
    direction.set(diffDrag)
    lastDrag.set(point)
    return size.measure(diffDrag.get())
  }

  function up(): number {
    lastDrag.setNumber(
      state.trackPoints
        .slice(-5)
        .map(p => lastDrag.get() - p)
        .sort((p1, p2) => {
          const point1 = Math.abs(p1)
          const point2 = Math.abs(p2)
          return point1 < point2 ? 1 : -1
        })[0] || 0,
    )
    state.isDown = false
    state.trackPoints = []
    return size.measure(lastDrag.get())
  }

  return Object.assign(self, {
    direction,
    down,
    isDown: () => state.isDown,
    move,
    read: readPoint,
    up,
  })
}

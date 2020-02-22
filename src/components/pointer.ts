import { Direction } from './direction'
import { PxToPercent } from './pxToPercent'
import { Vector1D } from './vector1d'

type Axis = 'x' | 'y'

type State = {
  isMouse: boolean
  trackPoints: number[]
  trackTime: number
}

export type Pointer = {
  direction: Direction
  down: (evt: Event) => number
  move: (evt: Event) => number
  up: () => number
  read: (evt: any, axis: Axis) => Vector1D
}

export function Pointer(pxToPercent: PxToPercent): Pointer {
  const coords = { x: 'clientX', y: 'clientY' }
  const startDrag = Vector1D(0)
  const diffDrag = Vector1D(0)
  const lastDrag = Vector1D(0)
  const pointValue = Vector1D(0)
  const direction = Direction(0)
  const trackInterval = 10
  const state: State = {
    isMouse: false,
    trackPoints: [],
    trackTime: new Date().getTime(),
  }

  function read(evt: any, axis: Axis): Vector1D {
    state.isMouse = !evt.touches
    const c = coords[axis]
    const value = state.isMouse ? evt[c] : evt.touches[0][c]
    return pointValue.setNumber(value)
  }

  function down(evt: Event): number {
    const point = read(evt, 'x')
    startDrag.set(point)
    lastDrag.set(point)
    return pxToPercent.measure(startDrag.get())
  }

  function move(evt: Event): number {
    const point = read(evt, 'x')
    const time2 = new Date().getTime()
    const time1 = state.trackTime

    if (time2 - time1 >= trackInterval) {
      state.trackPoints.push(point.get())
      state.trackTime = time2
    }

    diffDrag.set(point).subtract(lastDrag)
    direction.set(diffDrag)
    lastDrag.set(point)
    return pxToPercent.measure(diffDrag.get())
  }

  function up(): number {
    const currentPoint = lastDrag.get()
    const trackLength = state.isMouse ? 5 : 4
    const point = state.trackPoints
      .slice(-trackLength)
      .map(trackPoint => currentPoint - trackPoint)
      .sort((p1, p2) => (Math.abs(p1) < Math.abs(p2) ? 1 : -1))[0]

    lastDrag.setNumber(point || 0)
    state.trackPoints = []
    return pxToPercent.measure(lastDrag.get())
  }

  const self: Pointer = {
    direction,
    down,
    move,
    read,
    up,
  }
  return Object.freeze(self)
}

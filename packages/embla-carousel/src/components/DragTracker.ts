import { AxisOptionType, AxisType } from './Axis'
import { PxToPercentType } from './PxToPercent'
import { Vector1D, Vector1DType } from './Vector1d'

export type DragTrackerType = {
  pointerDown: (evt: Event) => number
  pointerMove: (evt: Event) => number
  pointerUp: () => number
  readPoint: (evt: any, axis: AxisOptionType) => Vector1DType
}

export function DragTracker(
  axis: AxisType,
  pxToPercent: PxToPercentType,
): DragTrackerType {
  const { scroll: scrollAxis } = axis
  const coords = { x: 'clientX', y: 'clientY' }
  const startDrag = Vector1D(0)
  const diffDrag = Vector1D(0)
  const lastDrag = Vector1D(0)
  const pointValue = Vector1D(0)
  const trackInterval = 10
  const trackLength = 5
  const trackTime = 100
  let trackPoints: number[] = []
  let lastMoveTime = new Date().getTime()
  let isMouse = false

  function readPoint(evt: any, type: AxisOptionType): Vector1DType {
    isMouse = !evt.touches
    const c = coords[type]
    const value = isMouse ? evt[c] : evt.touches[0][c]
    return pointValue.set(value)
  }

  function pointerDown(evt: Event): number {
    const point = readPoint(evt, scrollAxis)
    startDrag.set(point)
    lastDrag.set(point)
    return pxToPercent.measure(startDrag.get())
  }

  function pointerMove(evt: Event): number {
    const point = readPoint(evt, scrollAxis)
    const nowTime = new Date().getTime()
    const diffTime = nowTime - lastMoveTime

    if (diffTime >= trackInterval) {
      if (diffTime >= trackTime) trackPoints = []
      trackPoints.push(point.get())
      lastMoveTime = nowTime
    }

    diffDrag.set(point).subtract(lastDrag)
    lastDrag.set(point)
    return pxToPercent.measure(diffDrag.get())
  }

  function pointerUp(): number {
    const nowTime = new Date().getTime()
    const diffTime = nowTime - lastMoveTime
    const currentPoint = lastDrag.get()

    const force = trackPoints
      .slice(-trackLength)
      .map((trackPoint) => currentPoint - trackPoint)
      .sort((p1, p2) => (Math.abs(p1) < Math.abs(p2) ? 1 : -1))[0]

    lastDrag.set(diffTime > trackTime || !force ? 0 : force)
    trackPoints = []
    return pxToPercent.measure(lastDrag.get())
  }

  const self: DragTrackerType = {
    pointerDown,
    pointerMove,
    pointerUp,
    readPoint,
  }
  return self
}

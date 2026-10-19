import { Axis } from '../components/Axis'
import { DragTracker } from '../components/DragTracker'

function mouseEvent(clientX: number, timeStamp: number): MouseEvent {
  const evt = new MouseEvent('mousemove', {
    button: 0,
    buttons: 1,
    clientX,
    clientY: 10,
    view: window
  })
  Object.defineProperty(evt, 'timeStamp', { value: timeStamp })
  return evt
}

function swipe(
  tracker: ReturnType<typeof DragTracker>,
  lastMoveAt: number
): void {
  const x0 = 320
  const distance = 160

  tracker.pointerDown(mouseEvent(x0, 0))
  for (let t = 15; t < Math.min(lastMoveAt, 170); t += 15) {
    tracker.pointerMove(mouseEvent(x0 - distance * (t / lastMoveAt), t))
  }
  tracker.pointerMove(
    mouseEvent(x0 - distance * (lastMoveAt / lastMoveAt), lastMoveAt)
  )
}

describe('DragTracker', () => {
  test('Keeps a velocity sample when the window expires on the last move', () => {
    const tracker = DragTracker(Axis('x', 'ltr'))
    tracker.init(window)

    swipe(tracker, 185)
    const force = tracker.pointerUp(mouseEvent(160, 190))

    expect(force).not.toBe(0)
  })

  test('Still produces a flick when the window has NOT expired on the last move', () => {
    const tracker = DragTracker(Axis('x', 'ltr'))
    tracker.init(window)

    swipe(tracker, 165)
    const force = tracker.pointerUp(mouseEvent(160, 170))

    expect(force).not.toBe(0)
  })
})

import { EventStore } from './EventStore'

type CallbackType = () => void

export type AnimationType = {
  init: () => void
  destroy: () => void
  start: () => void
  stop: () => void
  proceed: () => void
}

export function Animation(callback: FrameRequestCallback): AnimationType {
  const documentVisibleHandler = EventStore()
  let lastTimeStamp: number | null = null
  let animationFrame = 0

  function init(): void {
    documentVisibleHandler.add(document, 'visibilitychange', () => {
      if (document.hidden) lastTimeStamp = null
    })
  }

  function destroy(): void {
    stop()
    documentVisibleHandler.removeAll()
  }

  function ifAnimating(active: boolean, cb: CallbackType): CallbackType {
    return (): void => {
      if (active === !!animationFrame) cb()
    }
  }

  function animate(timeStamp: DOMHighResTimeStamp): void {
    if (lastTimeStamp === null) {
      lastTimeStamp = timeStamp
      return start()
    }

    callback(timeStamp - lastTimeStamp)
    if (animationFrame) lastTimeStamp = timeStamp
  }

  function start(): void {
    animationFrame = window.requestAnimationFrame(animate)
  }

  function stop(): void {
    window.cancelAnimationFrame(animationFrame)
    lastTimeStamp = null
    animationFrame = 0
  }

  const self: AnimationType = {
    init,
    destroy,
    proceed: ifAnimating(true, start),
    start: ifAnimating(false, start),
    stop: ifAnimating(true, stop),
  }
  return self
}

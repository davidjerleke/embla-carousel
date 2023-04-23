import { EventStore } from './EventStore'

type CallbackType = () => void

export type AnimationType = {
  init: () => void
  destroy: () => void
  start: () => void
  stop: () => void
}

export function Animation(callback: CallbackType): AnimationType {
  const documentVisibleHandler = EventStore()
  const timeStep = 1000 / 60
  let lastTimeStamp: number | null = null
  let delta = 0
  let animationFrame = 0

  function init(): void {
    documentVisibleHandler.add(document, 'visibilitychange', () => {
      if (document.hidden) lastTimeStamp = null
    })
  }

  function destroy(): void {
    stop()
    documentVisibleHandler.clear()
  }

  function ifAnimating(active: boolean, cb: CallbackType): CallbackType {
    return (): void => {
      if (active === !!animationFrame) cb()
    }
  }

  function animate(timeStamp: DOMHighResTimeStamp): void {
    if (!lastTimeStamp) {
      lastTimeStamp = timeStamp
      return start()
    }

    delta += timeStamp - lastTimeStamp
    lastTimeStamp = timeStamp

    while (delta >= timeStep) {
      callback()
      delta -= timeStep
    }

    if (animationFrame) start()
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
    start: ifAnimating(false, start),
    stop: ifAnimating(true, stop),
  }
  return self
}

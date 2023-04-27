import { EventStore } from './EventStore'
import { EngineType } from './Engine'

type CallbackType = () => void
type AnimationCallbackType = (engine: EngineType) => void

export type AnimationType = {
  init: (engineInstance: EngineType) => void
  destroy: () => void
  start: () => void
  stop: () => void
}

export function Animation(
  update: AnimationCallbackType,
  draw: AnimationCallbackType,
): AnimationType {
  const documentVisibleHandler = EventStore()
  const timeStep = 1000 / 60
  let lastTimeStamp: number | null = null
  let delta = 0
  let animationFrame = 0
  let engine: EngineType

  function init(engineInstance: EngineType): void {
    engine = engineInstance
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
      update(engine)
      delta -= timeStep
    }

    draw(engine)
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

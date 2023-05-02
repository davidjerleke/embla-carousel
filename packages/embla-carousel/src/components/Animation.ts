import { EventStore } from './EventStore'
import { EngineType } from './Engine'
import { mathAbs } from './utils'

type CallbackType = () => void

export type AnimationUpdateType = (engine: EngineType) => void
export type AnimationRenderType = (
  engine: EngineType,
  lagFactor: number,
) => void

export type AnimationType = {
  init: (engineInstance: EngineType) => void
  destroy: () => void
  start: () => void
  stop: () => void
}

export function Animation(
  update: AnimationUpdateType,
  render: AnimationRenderType,
): AnimationType {
  const documentVisibleHandler = EventStore()
  const timeStep = 1000 / 60
  let lastTimeStamp: number | null = null
  let lag = 0
  let animationFrame = 0
  let engine: EngineType

  function init(engineInstance: EngineType): void {
    engine = engineInstance
    documentVisibleHandler.add(document, 'visibilitychange', () => {
      if (document.hidden) {
        lastTimeStamp = null
        lag = 0
      }
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

    const elapsed = timeStamp - lastTimeStamp
    lastTimeStamp = timeStamp
    lag += elapsed

    while (lag >= timeStep) {
      update(engine)
      lag -= timeStep
    }

    render(engine, mathAbs(lag / timeStep))
    if (animationFrame) start()
  }

  function start(): void {
    animationFrame = window.requestAnimationFrame(animate)
  }

  function stop(): void {
    window.cancelAnimationFrame(animationFrame)
    lastTimeStamp = null
    lag = 0
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

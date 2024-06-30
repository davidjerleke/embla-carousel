import { EngineType } from './Engine'
import { EventStore } from './EventStore'
import { WindowType } from './utils'

export type AnimationsUpdateType = (engine: EngineType) => void

export type AnimationsType = {
  init: () => void
  destroy: () => void
  start: () => void
  stop: () => void
  update: () => void
}

export function Animations(
  ownerDocument: Document,
  ownerWindow: WindowType,
  update: AnimationsType['update']
): AnimationsType {
  const documentVisibleHandler = EventStore()
  const timeStep = 1000 / 60
  let lastTimeStamp: number | null = null
  let animationFrame = 0
  let lag = 0

  function init(): void {
    documentVisibleHandler.add(ownerDocument, 'visibilitychange', () => {
      if (ownerDocument.hidden) reset()
    })
  }

  function destroy(): void {
    stop()
    documentVisibleHandler.clear()
  }

  function animate(timeStamp: DOMHighResTimeStamp): void {
    if (!animationFrame) return
    if (!lastTimeStamp) lastTimeStamp = timeStamp

    const timeElapsed = timeStamp - lastTimeStamp
    lastTimeStamp = timeStamp
    lag += timeElapsed

    while (lag >= timeStep) {
      update()
      lag -= timeStep
    }

    if (animationFrame) ownerWindow.requestAnimationFrame(animate)
  }

  function start(): void {
    if (animationFrame) return

    animationFrame = ownerWindow.requestAnimationFrame(animate)
  }

  function stop(): void {
    ownerWindow.cancelAnimationFrame(animationFrame)
    lastTimeStamp = null
    lag = 0
    animationFrame = 0
  }

  function reset(): void {
    lastTimeStamp = null
    lag = 0
  }

  const self: AnimationsType = {
    init,
    destroy,
    start,
    stop,
    update
  }
  return self
}

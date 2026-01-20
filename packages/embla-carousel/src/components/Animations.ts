import { EngineType } from './Engine'
import { EventStore } from './EventStore'
import { WindowType } from './utils'

export type AnimationsUpdateType = (engine: EngineType) => void
export type AnimationsRenderType = (engine: EngineType, alpha: number) => void

export type AnimationsType = {
  init: (ownerWindow: WindowType) => void
  destroy: () => void
  start: () => void
  stop: () => void
  update: () => void
  render: (alpha: number) => void
}

export function Animations(
  update: () => void,
  render: (alpha: number) => void
): AnimationsType {
  const documentVisibleHandler = EventStore()
  const fixedTimeStep = 1000 / 60

  let windowInstance: WindowType
  let lastTimeStamp: number | null = null
  let accumulatedTime = 0
  let animationId = 0

  function init(ownerWindow: WindowType): void {
    const ownerDocument = ownerWindow.document
    windowInstance = ownerWindow

    documentVisibleHandler.add(ownerDocument, 'visibilitychange', () => {
      if (ownerDocument.hidden) reset()
    })
  }

  function destroy(): void {
    stop()
    documentVisibleHandler.clear()
  }

  function animate(timeStamp: DOMHighResTimeStamp): void {
    if (!animationId) return
    if (!lastTimeStamp) {
      lastTimeStamp = timeStamp
      update()
      update()
    }

    const timeElapsed = timeStamp - lastTimeStamp
    lastTimeStamp = timeStamp
    accumulatedTime += timeElapsed

    while (accumulatedTime >= fixedTimeStep) {
      update()
      accumulatedTime -= fixedTimeStep
    }

    const alpha = accumulatedTime / fixedTimeStep
    render(alpha)

    if (animationId) {
      animationId = windowInstance.requestAnimationFrame(animate)
    }
  }

  function start(): void {
    if (animationId) return
    animationId = windowInstance.requestAnimationFrame(animate)
  }

  function stop(): void {
    if (!animationId) return
    windowInstance.cancelAnimationFrame(animationId)
    lastTimeStamp = null
    accumulatedTime = 0
    animationId = 0
  }

  function reset(): void {
    lastTimeStamp = null
    accumulatedTime = 0
  }

  const self: AnimationsType = {
    init,
    destroy,
    start,
    stop,
    update,
    render
  }
  return self
}

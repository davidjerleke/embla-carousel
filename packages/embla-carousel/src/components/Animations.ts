import { EngineType } from './Engine'
import { EventStore } from './EventStore'
import { WindowType } from './utils'

export type AnimationsUpdateType = (engine: EngineType) => void
export type AnimationsRenderType = (engine: EngineType, alpha: number) => void

export type AnimationsType = {
  init: () => void
  destroy: () => void
  start: () => void
  stop: () => void
  update: () => void
  render: (alpha: number) => void
}

export function Animations(
  ownerDocument: Document,
  ownerWindow: WindowType,
  update: () => void,
  render: (alpha: number) => void
): AnimationsType {
  const documentVisibleHandler = EventStore()
  const fixedTimeStep = 1000 / 60

  let lastTimeStamp: number | null = null
  let accumulatedTime = 0
  let animationId = 0

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
    if (!animationId) return
    if (!lastTimeStamp) lastTimeStamp = timeStamp

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
      animationId = ownerWindow.requestAnimationFrame(animate)
    }
  }

  function start(): void {
    if (animationId) return
    animationId = ownerWindow.requestAnimationFrame(animate)
  }

  function stop(): void {
    ownerWindow.cancelAnimationFrame(animationId)
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

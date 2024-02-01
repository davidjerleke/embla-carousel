import { EngineType } from './Engine'
import { EventStore } from './EventStore'
import { mathAbs, WindowType } from './utils'

export type AnimationsUpdateType = (engine: EngineType) => void
export type AnimationsRenderType = (
  engine: EngineType,
  lagOffset: number
) => void

export type AnimationsType = {
  init: () => void
  destroy: () => void
  start: () => void
  stop: () => void
  update: () => void
  render: (lagOffset: number) => void
}

export function Animations(
  ownerDocument: Document,
  ownerWindow: WindowType,
  update: AnimationsType['update'],
  render: AnimationsType['render']
): AnimationsType {
  const documentVisibleHandler = EventStore()
  const timeStep = 1000 / 60
  let lastTimeStamp: number | null = null
  let lag = 0
  let animationFrame = 0

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

    const elapsed = timeStamp - lastTimeStamp
    lastTimeStamp = timeStamp
    lag += elapsed

    while (lag >= timeStep) {
      update()
      lag -= timeStep
    }

    const lagOffset = mathAbs(lag / timeStep)
    render(lagOffset)

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
    update,
    render
  }
  return self
}

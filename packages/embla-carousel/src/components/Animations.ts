import { EngineType } from './Engine'
import { mathAbs, WindowType } from './utils'

export type AnimationUpdateType = (engine: EngineType) => void
export type AnimationRenderType = (
  engine: EngineType,
  lagFactor: number
) => void

export type AnimationType = {
  start: () => void
  stop: () => void
  update: () => void
  render: (lagFactor: number) => void
}

export type AnimationsType = {
  start: (engine: EngineType) => void
  stop: (engine: EngineType) => void
  reset: () => void
  window: WindowType
}

export function Animations(ownerWindow: WindowType): AnimationsType {
  const timeStep = 1000 / 60
  let engines: EngineType[] = []
  let lastTimeStamp: number | null = null
  let lag = 0
  let animationFrame = 0

  function animate(timeStamp: DOMHighResTimeStamp): void {
    if (!lastTimeStamp) lastTimeStamp = timeStamp

    const elapsed = timeStamp - lastTimeStamp
    lastTimeStamp = timeStamp
    lag += elapsed

    while (lag >= timeStep) {
      engines.forEach(({ animation }) => animation.update())
      lag -= timeStep
    }

    const lagOffset = mathAbs(lag / timeStep)
    engines.forEach(({ animation }) => animation.render(lagOffset))

    if (animationFrame) ownerWindow.requestAnimationFrame(animate)
  }

  function start(engine: EngineType): void {
    if (!engines.includes(engine)) engines.push(engine)
    if (animationFrame) return

    animationFrame = ownerWindow.requestAnimationFrame(animate)
  }

  function stop(engine: EngineType): void {
    engines = engines.filter((e) => e !== engine)
    if (engines.length) return

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
    start,
    stop,
    reset,
    window: ownerWindow
  }
  return self
}

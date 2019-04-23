type Callback = () => void
type IfAnimation = () => Animation

export type Animation = {
  start: () => Animation
  stop: () => Animation
  proceed: () => Animation
}

export function Animation(callback: FrameRequestCallback): Animation {
  const run = requestAnimationFrame.bind(window)
  const kill = cancelAnimationFrame.bind(window)
  const state = { animationFrame: 0 }

  function ifAnimation(active: boolean, cb: Callback): IfAnimation {
    return (): Animation => {
      if (active === !!state.animationFrame) {
        cb()
      }
      return self
    }
  }

  function start(): void {
    state.animationFrame = run(callback)
  }

  function stop(): void {
    kill(state.animationFrame)
    state.animationFrame = 0
  }

  const self: Animation = {
    proceed: ifAnimation(true, start),
    start: ifAnimation(false, start),
    stop: ifAnimation(true, stop),
  }
  return Object.freeze(self)
}

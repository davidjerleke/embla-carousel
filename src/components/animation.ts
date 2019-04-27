type Callback = () => void
type IfAnimating = () => Animation

export type Animation = {
  start: () => Animation
  stop: () => Animation
  proceed: () => Animation
}

export function Animation(callback: FrameRequestCallback): Animation {
  const run = requestAnimationFrame.bind(window)
  const kill = cancelAnimationFrame.bind(window)
  const state = { animationFrame: 0 }

  function ifAnimating(active: boolean, cb: Callback): IfAnimating {
    return (): Animation => {
      if (active === !!state.animationFrame) cb()
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
    proceed: ifAnimating(true, start),
    start: ifAnimating(false, start),
    stop: ifAnimating(true, stop),
  }
  return Object.freeze(self)
}

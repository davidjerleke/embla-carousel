type Callback = () => void

export type Animation = {
  start: () => void
  stop: () => void
  proceed: () => void
}

export function Animation(callback: FrameRequestCallback): Animation {
  const run = requestAnimationFrame.bind(window)
  const kill = cancelAnimationFrame.bind(window)
  const state = { animationFrame: 0 }

  function ifAnimating(active: boolean, cb: Callback): Callback {
    return (): void => {
      if (active === !!state.animationFrame) cb()
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

type Callback = () => void
type IfAnimation = () => Animation

export interface Animation {
  start(): Animation
  stop(): Animation
  proceed(): Animation
}

export function Animation(callback: FrameRequestCallback): Animation {
  const self = {} as Animation
  const run = requestAnimationFrame.bind(window)
  const kill = cancelAnimationFrame.bind(window)
  const state = { animationFrame: 0 }

  function ifAnimation(active: boolean, func: Callback): IfAnimation {
    return (): Animation => {
      if (active === !!state.animationFrame) {
        func()
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

  return Object.assign(self, {
    proceed: ifAnimation(true, start),
    start: ifAnimation(false, start),
    stop: ifAnimation(true, stop),
  })
}

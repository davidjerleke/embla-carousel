type Callback = () => void

export type Animation = {
  start: () => void
  stop: () => void
  proceed: () => void
}

export function Animation(callback: FrameRequestCallback): Animation {
  let animationFrame = 0

  function ifAnimating(active: boolean, cb: Callback): Callback {
    return (): void => {
      if (active === !!animationFrame) cb()
    }
  }

  function start(): void {
    animationFrame = window.requestAnimationFrame(callback)
  }

  function stop(): void {
    window.cancelAnimationFrame(animationFrame)
    animationFrame = 0
  }

  const self: Animation = {
    proceed: ifAnimating(true, start),
    start: ifAnimating(false, start),
    stop: ifAnimating(true, stop),
  }
  return self
}

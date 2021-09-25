type CallbackType = () => void

export type AnimationType = {
  start: () => void
  stop: () => void
  proceed: () => void
}

export function Animation(callback: FrameRequestCallback): AnimationType {
  let animationFrame = 0

  function ifAnimating(active: boolean, cb: CallbackType): CallbackType {
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

  const self: AnimationType = {
    proceed: ifAnimating(true, start),
    start: ifAnimating(false, start),
    stop: ifAnimating(true, stop),
  }
  return self
}

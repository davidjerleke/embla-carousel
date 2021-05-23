import { useCallback, useEffect, useRef, useState } from 'react'
import { isBrowser } from 'utils'

type UseInterval = {
  play: () => void
  stop: () => void
}

export const useInterval = (
  callback: () => void,
  delay: number,
): UseInterval => {
  const [isRunning, setIsRunning] = useState(false)
  const savedCallback = useRef(callback)
  const stop = useCallback(() => setIsRunning(false), [setIsRunning])
  const play = useCallback(() => setIsRunning(true), [setIsRunning])

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (!isBrowser || !isRunning) return
    let id = 0

    const tick = () => {
      if (!isRunning) return clearTimeout(id)
      savedCallback.current()
      requestAnimationFrame(() => (id = window.setTimeout(tick, delay)))
    }
    requestAnimationFrame(() => (id = window.setTimeout(tick, delay)))

    return () => {
      if (id) window.clearTimeout(id)
      stop()
    }
  }, [isRunning, delay, stop])

  return { play, stop }
}

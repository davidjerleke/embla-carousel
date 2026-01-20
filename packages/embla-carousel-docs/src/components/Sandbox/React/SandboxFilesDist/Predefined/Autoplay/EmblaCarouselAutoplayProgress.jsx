import { useCallback, useEffect, useRef, useState } from 'react'

export const useAutoplayProgress = (emblaApi, progressNode) => {
  const [showAutoplayProgress, setShowAutoplayProgress] = useState(false)
  const animationName = useRef('')
  const timeoutId = useRef(0)
  const rafId = useRef(0)

  const startProgress = useCallback((timeUntilNext) => {
    const node = progressNode.current

    if (!node) return
    if (timeUntilNext === null) return

    if (!animationName.current) {
      const style = window.getComputedStyle(node)
      animationName.current = style.animationName
    }

    node.style.animationName = 'none'
    node.style.transform = 'translate3d(0,0,0)'

    rafId.current = window.requestAnimationFrame(() => {
      timeoutId.current = window.setTimeout(() => {
        node.style.animationName = animationName.current
        node.style.animationDuration = `${timeUntilNext}ms`
      }, 0)
    })

    setShowAutoplayProgress(true)
  }, [])

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    emblaApi
      .on('autoplay:timerset', () => startProgress(autoplay.timeUntilNext()))
      .on('autoplay:timerstopped', () => setShowAutoplayProgress(false))
  }, [emblaApi])

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current)
      clearTimeout(timeoutId.current)
    }
  }, [])

  return {
    showAutoplayProgress
  }
}

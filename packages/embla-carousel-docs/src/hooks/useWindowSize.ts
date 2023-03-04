import { useState, useCallback } from 'react'
import { useWindowResize } from 'hooks/useWindowResize'
import { isBrowser } from 'utils/isBrowser'

type UseWindowSizeType = {
  windowWidth: number
  windowHeight: number
}

export const useWindowSize = (wait: number = 0): UseWindowSizeType => {
  const getWindowSize = useCallback(
    () => ({
      windowWidth: isBrowser ? window.innerWidth : 0,
      windowHeight: isBrowser ? window.innerHeight : 0,
    }),
    [],
  )
  const [windowSize, setWindowSize] = useState(getWindowSize)

  useWindowResize({
    wait,
    callback: () => setWindowSize(getWindowSize),
  })

  return windowSize
}

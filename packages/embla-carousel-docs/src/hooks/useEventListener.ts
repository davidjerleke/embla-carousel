import { useRef, useEffect, useCallback, RefObject } from 'react'
import { getRefElementOrNode, isBrowser } from 'utils'

type PropType = {
  type: keyof WindowEventMap
  listener: EventListener
  element?: RefObject<Element> | Document | Window | null
  options?: AddEventListenerOptions
}

export const useEventListener = (props: PropType): void => {
  const storedListener = useRef<EventListener>()
  const {
    type,
    listener,
    element = isBrowser ? window : undefined,
    options,
  } = props

  useEffect(() => {
    storedListener.current = listener
  }, [listener])

  const onEvent = useCallback((event: Event) => {
    storedListener.current?.(event)
  }, [])

  useEffect(() => {
    const target = getRefElementOrNode(element)
    if (!target) return

    target.addEventListener(type, onEvent, options)
    return () => target.removeEventListener(type, onEvent)
  }, [type, element, options, onEvent])
}

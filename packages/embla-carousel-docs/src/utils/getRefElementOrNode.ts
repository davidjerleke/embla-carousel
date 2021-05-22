import { RefObject } from 'react'

export const getRefElementOrNode = <T>(
  element?: RefObject<Element> | T,
): Element | T | undefined | null => {
  if (element && 'current' in element) return element.current
  return element
}

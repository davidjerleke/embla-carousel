import { RefObject } from 'react'
import { useEventListener } from '@/hooks/use-event-listener'

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  const listener = (event: MouseEvent | TouchEvent) => {
    if (!ref.current || ref.current.contains(event.target as Node)) return
    handler(event)
  }

  useEventListener('mousedown', listener)
  useEventListener('touchstart', listener)
}

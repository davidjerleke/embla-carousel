import { useMemo } from 'react'
import { useEventListener } from 'hooks'
import { debounce } from 'lodash'

type PropType = {
  callback: (event: Event) => void
  wait: number
}

export const useWindowResize = (props: PropType): void => {
  const { callback, wait = 300 } = props
  const onResize = useMemo(() => {
    return wait !== 0
      ? debounce((event: Event) => callback(event), wait)
      : (event: Event) => callback(event)
  }, [wait, callback])

  useEventListener({
    type: 'resize',
    listener: onResize,
  })
}

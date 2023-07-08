import React, {
  useState,
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo
} from 'react'
import { useEventListener } from 'hooks/useEventListener'

export type KeyNavigatingContextType = {
  isKeyNavigating: boolean
  setIsKeyNavigating: React.Dispatch<React.SetStateAction<boolean>>
}

export const KeyNavigatingContext = createContext<KeyNavigatingContextType>({
  isKeyNavigating: false,
  setIsKeyNavigating: () => undefined
})

type PropType = PropsWithChildren<{}>

export const KeyNavigatingProvider = (props: PropType) => {
  const { children } = props
  const [isKeyNavigating, setIsKeyNavigating] = useState(false)

  const onMouseDown = useCallback(() => {
    if (isKeyNavigating) setIsKeyNavigating(false)
  }, [isKeyNavigating, setIsKeyNavigating])

  const onKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'Tab' && !isKeyNavigating) setIsKeyNavigating(true)
    },
    [isKeyNavigating, setIsKeyNavigating]
  )

  const value = useMemo(
    () => ({
      isKeyNavigating,
      setIsKeyNavigating
    }),
    [isKeyNavigating, setIsKeyNavigating]
  )

  useEventListener('keydown', onKeyDown)
  useEventListener('mousedown', onMouseDown)

  return (
    <KeyNavigatingContext.Provider value={value}>
      {children}
    </KeyNavigatingContext.Provider>
  )
}

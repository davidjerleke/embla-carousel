import React, {
  useState,
  createContext,
  PropsWithChildren,
  useCallback,
} from 'react'
import { useEventListener } from 'hooks/useEventListener'

export type TabAccessContextType = boolean

export const TabAccessContext = createContext<TabAccessContextType>(false)

type PropType = PropsWithChildren<{}>

export const TabAccessProvider = (props: PropType) => {
  const { children } = props
  const [userIsTabbing, setUserIsTabbing] = useState(false)

  const onMouseDown = useCallback(() => {
    if (userIsTabbing) setUserIsTabbing(false)
  }, [setUserIsTabbing, userIsTabbing])

  const onKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'Tab' && !userIsTabbing) setUserIsTabbing(true)
    },
    [setUserIsTabbing, userIsTabbing],
  )

  useEventListener('keydown', onKeyDown)
  useEventListener('mousedown', onMouseDown)

  return (
    <TabAccessContext.Provider value={userIsTabbing}>
      {children}
    </TabAccessContext.Provider>
  )
}

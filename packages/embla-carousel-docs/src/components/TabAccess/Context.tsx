import React, {
  useState,
  createContext,
  PropsWithChildren,
  useCallback,
} from 'react'
import { useEventListener } from 'hooks'

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
    ({ keyCode }) => {
      if (keyCode === 9 && !userIsTabbing) setUserIsTabbing(true)
    },
    [setUserIsTabbing, userIsTabbing],
  )

  useEventListener({
    type: 'keydown',
    listener: onKeyDown,
  })

  useEventListener({
    type: 'mousedown',
    listener: onMouseDown,
  })

  return (
    <TabAccessContext.Provider value={userIsTabbing}>
      {children}
    </TabAccessContext.Provider>
  )
}

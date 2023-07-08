import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState
} from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { LOCALSTORAGE_KEYS } from 'consts/localStorage'

export type TabsContextType = {
  storedTabSelections: { [key: string]: string }
  storeTabSelection: (key: string, value: string) => void
}

export const TabsContext = createContext<TabsContextType>({
  storedTabSelections: {},
  storeTabSelection: () => undefined
})

type PropType = PropsWithChildren<{}>

export const TabsProvider = (props: PropType) => {
  const { children } = props
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage(
    LOCALSTORAGE_KEYS.TAB_SELECTIONS
  )
  const [storedTabSelections, setStoredTabSelections] = useState<
    TabsContextType['storedTabSelections']
  >(JSON.parse(getLocalStorageItem()))

  const storeTabSelection = useCallback(
    (key: string, value: string) => {
      const updatedSelections = { ...storedTabSelections, [key]: value }
      setStoredTabSelections(updatedSelections)
      setLocalStorageItem(JSON.stringify(updatedSelections))
    },
    [storedTabSelections, setLocalStorageItem]
  )

  const value = useMemo(
    () => ({ storedTabSelections, storeTabSelection }),
    [storedTabSelections]
  )

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
}

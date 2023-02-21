import { useContext } from 'react'
import { TabsContext, TabsContextType } from 'components/Tabs/TabsContext'

export const useTabs = (): TabsContextType => useContext(TabsContext)

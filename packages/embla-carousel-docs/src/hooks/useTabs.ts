import { useContext } from 'react'
import { TabsContext, TabsContextType } from 'components/Tabs/Context'

export const useTabs = (): TabsContextType => useContext(TabsContext)

import { useCallback } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '@/hooks/redux'
import { selectKeyNavigating } from '@/components/KeyEvents/key-events-reducer'
import { TabsItemType } from '@/utils/tabs'
import {
  KEY_NAVIGATING_STYLES,
  KeyNavigatingPropType
} from '@/utils/key-events'

export const TabsPanelWrapper = styled.section<KeyNavigatingPropType>`
  ${KEY_NAVIGATING_STYLES};
`

type PropType = {
  tab: TabsItemType
  activeTab: TabsItemType
  groupId: string
  setActiveTab: (tab: TabsItemType) => void
}

export function TabsPanel(props: PropType) {
  const { tab, activeTab, groupId, setActiveTab } = props
  const isKeyNavigating = useAppSelector(selectKeyNavigating)
  const isHidden = tab.value !== activeTab.value

  const setTab = useCallback(() => {
    setActiveTab(tab)
  }, [setActiveTab, tab])

  return (
    <TabsPanelWrapper
      role="tabpanel"
      id={`panel-id-${tab.value}-${groupId}`}
      tabIndex={0}
      aria-labelledby={`tab-id-${tab.value}-${groupId}`}
      hidden={isHidden}
      $isKeyNavigating={isKeyNavigating}
      onClick={setTab}
    >
      {tab.children}
    </TabsPanelWrapper>
  )
}

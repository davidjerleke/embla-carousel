import React, { useCallback } from 'react'
import styled from 'styled-components'
import { KEY_NAVIGATING_STYLES } from 'consts/keyNavigatingStyles'
import { TabsItemWithIndexType } from 'consts/tabs'
import { useKeyNavigating } from 'hooks/useKeyNavigating'

export const TabsPanelWrapper = styled.section`
  ${KEY_NAVIGATING_STYLES};
`

type PropType = {
  tab: TabsItemWithIndexType
  activeTab: TabsItemWithIndexType
  groupId: string
  setActiveTab: (tab: TabsItemWithIndexType) => void
}

export const TabsPanel = (props: PropType) => {
  const { tab, activeTab, groupId, setActiveTab } = props
  const { isKeyNavigating } = useKeyNavigating()
  const isHidden = tab.value !== activeTab.value

  const setTab = useCallback(() => {
    setActiveTab(tab)
  }, [setActiveTab])

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

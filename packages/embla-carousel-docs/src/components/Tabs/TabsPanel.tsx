import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useAppSelector } from 'hooks/useRedux'
import { selectKeyNavigating } from 'components/KeyEvents/keyEventsReducer'
import { KEY_NAVIGATING_STYLES } from 'consts/keyEvents'
import { TabsItemType } from 'consts/tabs'

export const TabsPanelWrapper = styled.section`
  ${KEY_NAVIGATING_STYLES};
`

type PropType = {
  tab: TabsItemType
  activeTab: TabsItemType
  groupId: string
  setActiveTab: (tab: TabsItemType) => void
}

export const TabsPanel = (props: PropType) => {
  const { tab, activeTab, groupId, setActiveTab } = props
  const isKeyNavigating = useAppSelector(selectKeyNavigating)
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

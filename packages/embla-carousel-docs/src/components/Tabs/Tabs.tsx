import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import { useIsomorphicLayoutEffect } from 'utils/useIsomorphicLayoutEffect'
import uniqueId from 'lodash/uniqueId'
import styled from 'styled-components'
import { useTabs } from 'hooks/useTabs'
import { useKeyNavigating } from 'hooks/useKeyNavigating'
import { TabsPanel } from './TabsPanel'
import { TabsButton } from './TabsButton'
import { TabsList } from './TabsList'
import { TabsItemType } from 'consts/tabs'
import {
  getDefaultTab,
  getTabsPosition,
  getTabsPositionDiff,
  mapChildrenToTabs
} from 'utils/tabs'

export const TabsWrapper = styled.div``

type PropType = PropsWithChildren<{
  groupId?: string
}>

export const Tabs = (props: PropType) => {
  const { groupId = '', children, ...restProps } = props
  const { setIsKeyNavigating } = useKeyNavigating()
  const { storedTabSelections, storeTabSelection } = useTabs()
  const localStorageTab = storedTabSelections[groupId]
  const allTabs = useMemo(() => mapChildrenToTabs(children), [children])
  const tabs = useMemo(() => allTabs.filter((tab) => !tab.disabled), [allTabs])
  const defaultTab = useMemo(
    () => getDefaultTab(tabs, localStorageTab),
    [tabs, localStorageTab]
  )
  const [activeTab, setActiveTab] = useState<TabsItemType>(defaultTab)
  const focusedTab = useRef<HTMLButtonElement | null>(null)
  const tabRefs = useRef(tabs.map(() => React.createRef<HTMLButtonElement>()))
  const tabsGroupId = useRef(uniqueId())
  const tabsWrapper = useRef<HTMLDivElement>(null)
  const tabsActiveIndex = useRef(activeTab.index)
  const tabsPosition = useRef(getTabsPosition(tabsWrapper.current))

  const storeTabInLocalStorage = useCallback(
    (tabValue: string) => {
      if (groupId) storeTabSelection(groupId, tabValue)
    },
    [groupId, storeTabSelection]
  )

  const goToTab = useCallback(
    (index: number): void => {
      const tab = tabs[index]
      const tabElement = tabRefs.current[index].current

      if (tab && tabElement) {
        focusedTab.current = tabElement
        setActiveTab(tab)
        setIsKeyNavigating(true)
        tabElement.focus()
      }
    },
    [tabs, setIsKeyNavigating]
  )

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const tabsCount = tabs.length
      const activeIndex = tabsActiveIndex.current

      const goToNextTab = (): void => {
        goToTab((activeIndex + 1) % tabsCount)
      }
      const goToPrevTab = (): void => {
        goToTab((activeIndex - 1 + tabsCount) % tabsCount)
      }
      const goToFirstTab = (): void => {
        goToTab(0)
      }
      const goToLastTab = (): void => {
        goToTab(tabsCount - 1)
      }

      const keyNavigationMap: { [key: string]: () => void } = {
        ArrowRight: goToNextTab,
        ArrowLeft: goToPrevTab,
        Home: goToFirstTab,
        End: goToLastTab
      }

      const navigateToTab = keyNavigationMap[event.key]

      if (navigateToTab) {
        event.preventDefault()
        navigateToTab()
      }
    },
    [tabs, goToTab]
  )

  const onClick = useCallback(
    (tab: TabsItemType, element: EventTarget & HTMLButtonElement) => {
      focusedTab.current = element
      setActiveTab(tab)
    },
    []
  )

  useIsomorphicLayoutEffect(() => {
    tabsActiveIndex.current = activeTab.index
    if (!groupId) return

    tabsPosition.current = getTabsPosition(tabsWrapper.current)
    storeTabInLocalStorage(activeTab.value)

    queueMicrotask(() => {
      const focusedTabId = focusedTab.current?.id || ''
      const autoNavigated = !focusedTabId.endsWith(tabsGroupId.current)
      focusedTab.current = null

      if (autoNavigated) return

      const newTabsPosition = getTabsPosition(tabsWrapper.current)
      const diff = getTabsPositionDiff(newTabsPosition, tabsPosition.current)
      if (diff) window.scrollBy({ top: diff })

      tabsPosition.current = getTabsPosition(tabsWrapper.current)
    })
  }, [tabs, activeTab])

  useIsomorphicLayoutEffect(() => {
    const tabToActivate = tabs.find((tab) => tab.value === localStorageTab)
    if (!tabToActivate) return
    if (tabToActivate.value === tabs[tabsActiveIndex.current].value) return
    setActiveTab(tabToActivate)
  }, [tabs, localStorageTab])

  return (
    <TabsWrapper ref={tabsWrapper} {...restProps}>
      <TabsList role="tablist" aria-orientation="horizontal">
        {allTabs.map((tab) => (
          <TabsButton
            key={`${tab.value}-${tabsGroupId.current}`}
            groupId={tabsGroupId.current}
            tab={tab}
            ref={tabRefs.current[tab.index]}
            activeTab={activeTab}
            setActiveTab={onClick}
            onKeyDown={onKeyDown}
          />
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsPanel
          key={`${tab.value}-${tabsGroupId.current}`}
          groupId={tabsGroupId.current}
          tab={tab}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </TabsWrapper>
  )
}

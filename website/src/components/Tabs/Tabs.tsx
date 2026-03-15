'use client'

import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setIsKeyNavigating } from '@/components/KeyEvents/key-events-reducer'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import {
  selectTabSelections,
  setTabSelection
} from '@/components/Tabs/tabs-reducer'
import uniqueId from 'lodash/uniqueId'
import styled from 'styled-components'
import { TabsPanel } from '@/components/Tabs/TabsPanel'
import { TabsButton } from '@/components/Tabs/TabsButton'
import { TabsList } from '@/components/Tabs/TabsList'
import {
  getDefaultTab,
  mapChildrenToTabs,
  type TabsItemType
} from '@/utils/tabs'
import {
  getScrollPosition,
  getScrollPositionDiff
} from '@/utils/get-scroll-position'

export const TabsWrapper = styled.div``

type PropType = PropsWithChildren<{
  groupId?: string
}>

export function Tabs(props: PropType) {
  const { groupId = '', children, ...restProps } = props
  const dispatch = useAppDispatch()
  const storedTab = useAppSelector(selectTabSelections)[groupId]
  const allTabs = useMemo(() => mapChildrenToTabs(children), [children])
  const tabs = useMemo(() => allTabs.filter((tab) => !tab.disabled), [allTabs])
  const [activeTab, setActiveTab] = useState(getDefaultTab(tabs, storedTab))
  const focusedTab = useRef<HTMLButtonElement | null>(null)
  const tabRefs = useRef(tabs.map(() => React.createRef<HTMLButtonElement>()))
  const tabsGroupId = useRef(uniqueId())
  const tabsWrapper = useRef<HTMLDivElement>(null)
  const tabsActiveIndex = useRef(activeTab.index)
  const tabsPosition = useRef(getScrollPosition(tabsWrapper.current))

  const goToTab = useCallback(
    (index: number): void => {
      const tab = tabs[index]
      const tabElement = tabRefs.current[index].current

      if (tab && tabElement) {
        focusedTab.current = tabElement
        setActiveTab(tab)
        dispatch(setIsKeyNavigating(true))
        tabElement.focus()
      }
    },
    [tabs, dispatch]
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

    tabsPosition.current = getScrollPosition(tabsWrapper.current)
    dispatch(setTabSelection({ key: groupId, value: activeTab.value }))

    queueMicrotask(() => {
      const autoNavigated = !focusedTab.current

      if (autoNavigated) return
      focusedTab.current = null

      const newTabsPosition = getScrollPosition(tabsWrapper.current)
      const diff = getScrollPositionDiff(newTabsPosition, tabsPosition.current)
      if (diff) window.scrollBy({ top: diff })

      tabsPosition.current = getScrollPosition(tabsWrapper.current)
    })
  }, [tabs, activeTab])

  useIsomorphicLayoutEffect(() => {
    if (!groupId) return

    const tabToActivate = tabs.find((tab) => tab.value === storedTab)
    if (!tabToActivate) return
    if (tabToActivate.value === tabs[tabsActiveIndex.current].value) return
    setActiveTab(tabToActivate)
  }, [tabs, storedTab])

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

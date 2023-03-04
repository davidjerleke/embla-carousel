import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import uniqueId from 'lodash/uniqueId'
import styled, { css } from 'styled-components'
import { isTabsItemProps, PropType as TabsItemPropType } from './TabsItem'
import { gradientBackgroundStyles } from 'utils/gradientBackgroundStyles'
import { MAIN_CONTENT_ID } from 'components/KeyNavigating/KeyNavigatingSkipToContent'
import { BareButton } from 'components/Button/BareButton'
import { SPACINGS } from 'consts/spacings'
import { useTabs } from 'hooks/useTabs'
import { COLORS } from 'consts/themes'
import { keyNavigatingStyles } from 'components/KeyNavigating/keyNavigatingStyles'
import { useKeyNavigating } from 'hooks/useKeyNavigating'
import {
  ActiveText as TabActiveText,
  InactiveText as TabInactiveText,
} from 'components/Link/NavigationLink'

const mapChildrenToTabs = (children: React.ReactNode): TabsItemPropType[] => {
  return React.Children.toArray(children)
    .map((child) => (React.isValidElement(child) ? child.props : {}))
    .filter(isTabsItemProps)
}

const pickDefaultTab = (
  tabs: TabsItemPropType[],
  storedTabSelection: string,
): TabsItemPropType => {
  const storedTab = tabs.find((tab) => tab.value === storedTabSelection)
  return storedTab || tabs.find((tab) => tab.default) || tabs[0]
}

const getActiveTabIndex = (
  tabToFind: TabsItemPropType,
  tabs: TabsItemPropType[],
): number => {
  return tabs.findIndex((tab) => tab.value === tabToFind.value)
}

export const TabsWrapper = styled.div``

export const TabList = styled.div`
  margin-bottom: ${SPACINGS.FOUR};
  border-bottom: 0.1rem solid ${COLORS.DETAIL_LOW_CONTRAST};
  display: flex;
  overflow-x: auto;
`

export const TabPanel = styled.section`
  ${keyNavigatingStyles};
`

export const Tab = styled(BareButton)<{ $selected: boolean }>`
  padding: ${SPACINGS.TWO} ${SPACINGS.TWO};
  position: relative;
  display: inline-flex;
  align-items: center;
  position: relative;

  &:disabled > ${TabInactiveText} {
    color: ${COLORS.DETAIL_HIGH_CONTRAST};
  }

  ${({ $selected }) =>
    $selected &&
    css`
      &:before {
        ${gradientBackgroundStyles};
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 0.3rem;
        pointer-events: none;
      }
    `};
`

type PropType = PropsWithChildren<{
  groupId?: string
}>

export const Tabs = (props: PropType) => {
  const { groupId = '', children, ...restProps } = props
  const { isKeyNavigating, setIsKeyNavigating } = useKeyNavigating()
  const { storedTabSelections, storeTabSelection } = useTabs()
  const storedTabSelection = storedTabSelections[groupId]
  const allTabs = useMemo(() => mapChildrenToTabs(children), [children])
  const { tabs, tabsId, defaultTab } = useMemo(() => {
    const enabledTabs = allTabs.filter((tab) => !tab.disabled)
    return {
      tabs: enabledTabs,
      tabsId: uniqueId(),
      defaultTab: pickDefaultTab(enabledTabs, storedTabSelection),
    }
  }, [allTabs, storedTabSelection])
  const [activeTab, setActiveTab] = useState<TabsItemPropType>(defaultTab)
  const focusedTab = useRef<HTMLButtonElement>()
  const tabRefs = useRef(tabs.map(() => React.createRef<HTMLButtonElement>()))
  const tabRefLoopIndex = useRef(0)
  const tabsWrapper = useRef<HTMLDivElement>(null)
  const tabsWrapperRectTop = useRef(0)
  const activeTabIndex = useRef(getActiveTabIndex(defaultTab, tabs))

  const readTabsRectTop = useCallback(() => {
    return tabsWrapper.current?.getBoundingClientRect().top || 0
  }, [])

  const setActiveTabAndStoreSelection = useCallback(
    (tab: TabsItemPropType) => {
      tabsWrapperRectTop.current = readTabsRectTop()
      activeTabIndex.current = getActiveTabIndex(tab, tabs)
      setActiveTab(tab)

      if (groupId) storeTabSelection(groupId, tab.value)
    },
    [tabs, groupId, readTabsRectTop, storeTabSelection],
  )

  const goToTab = useCallback(
    (index: number): void => {
      const tab = tabs[index]
      const tabElement = tabRefs.current[index].current

      if (tab && tabElement) {
        setActiveTabAndStoreSelection(tab)
        setIsKeyNavigating(true)
        focusedTab.current = tabElement
        tabElement.focus()
      }
    },
    [tabs, setActiveTabAndStoreSelection, setIsKeyNavigating],
  )

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const tabsCount = tabs.length
      const activeIndex = activeTabIndex.current

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
        End: goToLastTab,
      }

      const navigateToTab = keyNavigationMap[event.key]

      if (navigateToTab) {
        event.preventDefault()
        navigateToTab()
      }
    },
    [tabs, goToTab],
  )

  useEffect(() => {
    if (!groupId) return

    const mainContentElement = document.getElementById(MAIN_CONTENT_ID)
    let storedHeight = mainContentElement?.getBoundingClientRect().height

    const resizeObserver = new ResizeObserver((entries) => {
      const autoNavigated = !tabRefs.current.some(
        (tabRef) => tabRef.current === focusedTab.current,
      )

      if (autoNavigated) return

      for (const entry of entries) {
        if (entry.contentRect.height === storedHeight) return
        storedHeight = entry.contentRect.height
        const rectTopDiff = readTabsRectTop() - tabsWrapperRectTop.current
        if (rectTopDiff) window.scrollBy(0, rectTopDiff)
      }
    })

    if (mainContentElement) resizeObserver.observe(mainContentElement)
    return () => {
      if (mainContentElement) resizeObserver.disconnect()
    }
  }, [groupId, readTabsRectTop])

  useEffect(() => {
    const tabToActivate = tabs.find((tab) => tab.value === storedTabSelection)
    if (tabToActivate?.value === activeTab.value) return
    if (tabToActivate) setActiveTabAndStoreSelection(tabToActivate)
  }, [activeTab, storedTabSelection, setActiveTabAndStoreSelection])

  useEffect(() => {
    const hasActiveTab = tabs.find((tab) => tab.value === activeTab.value)
    if (hasActiveTab) return

    const newDefaultTab = pickDefaultTab(tabs, storedTabSelection)
    setActiveTab(newDefaultTab)
    activeTabIndex.current = getActiveTabIndex(newDefaultTab, tabs)
  }, [tabs, activeTab, storedTabSelection])

  return (
    <TabsWrapper ref={tabsWrapper} {...restProps}>
      <TabList role="tablist" aria-orientation="horizontal">
        {allTabs.map((tab) => {
          const selected = activeTab.value === tab.value
          const enabled = !tab.disabled
          const tabRefIndex = tabRefLoopIndex.current
          const tabElementRef = tabRefs.current[tabRefIndex]

          if (enabled) {
            const isLastTab = tabRefIndex === tabs.length - 1
            tabRefLoopIndex.current = isLastTab ? 0 : tabRefIndex + 1
          }

          return (
            <Tab
              role="tab"
              key={`tab-${tab.value}`}
              id={`tab-id-${tab.value}-${tabsId}`}
              tabIndex={selected ? 0 : -1}
              ref={enabled ? tabElementRef : undefined}
              aria-controls={`panel-id-${tab.value}-${tabsId}`}
              aria-selected={selected}
              onKeyDown={onKeyDown}
              onClick={() => {
                const tabElement = tabElementRef.current
                if (tabElement) focusedTab.current = tabElement
                setActiveTabAndStoreSelection(tab)
              }}
              $selected={selected}
              disabled={!enabled}
            >
              <TabInactiveText $isActive={selected}>
                {tab.label}
              </TabInactiveText>
              <TabActiveText $isActive={selected} aria-hidden="true">
                {tab.label}
              </TabActiveText>
            </Tab>
          )
        })}
      </TabList>

      {tabs.map((tab) => (
        <TabPanel
          role="tabpanel"
          key={`tabpanel-${tab.value}`}
          id={`panel-id-${tab.value}-${tabsId}`}
          tabIndex={0}
          aria-labelledby={`tab-id-${tab.value}-${tabsId}`}
          hidden={activeTab.value !== tab.value}
          onClick={() => setActiveTabAndStoreSelection(tab)}
          $isKeyNavigating={isKeyNavigating}
        >
          {tab.children}
        </TabPanel>
      ))}
    </TabsWrapper>
  )
}

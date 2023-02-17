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
import { isTabItemProps, PropType as TabItemPropType } from './TabItem'
import { gradientBackgroundStyles } from 'utils/gradientBackgroundStyles'
import { MAIN_CONTENT_ID } from 'components/KeyNavigating/SkipToContent'
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

const mapChildrenToTabs = (children: React.ReactNode): TabItemPropType[] => {
  return React.Children.toArray(children)
    .map((child) => (React.isValidElement(child) ? child.props : {}))
    .filter(isTabItemProps)
}

const getDefaultTab = (
  tabs: TabItemPropType[],
  storedTabSelection: string,
): TabItemPropType => {
  const storedTab = tabs.find((tab) => tab.value === storedTabSelection)
  return storedTab || tabs.find((tab) => tab.default) || tabs[0]
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
  selectedTabIndex?: number
}>

export const Tabs = (props: PropType) => {
  const { groupId = '', children, ...restProps } = props
  const { isKeyNavigating, setIsKeyNavigating } = useKeyNavigating()
  const { storedTabSelections, storeTabSelection } = useTabs()
  const storedTabSelection = storedTabSelections[groupId]
  const { tabs, tabsId, defaultTab } = useMemo(() => {
    const tabs = mapChildrenToTabs(children)
    return {
      tabs,
      tabsId: uniqueId(),
      defaultTab: getDefaultTab(tabs, storedTabSelection),
    }
  }, [children, storedTabSelection])
  const [activeTab, setActiveTab] = useState<TabItemPropType>(defaultTab)
  const tabRefs = useRef(tabs.map(() => React.createRef<HTMLButtonElement>()))
  const tabsRef = useRef<HTMLDivElement>(null)
  const tabsRectTop = useRef(0)
  const getTabIndex = useCallback(
    (tabToFind: TabItemPropType): number => {
      return tabs.findIndex((tab) => tab.value === tabToFind.value)
    },
    [tabs],
  )
  const activeTabIndex = useRef(getTabIndex(activeTab))

  const readTabsRectTop = useCallback(() => {
    return tabsRef.current?.getBoundingClientRect().top || 0
  }, [])

  const setActiveTabAndStoreSelection = useCallback(
    (tab: TabItemPropType) => {
      tabsRectTop.current = readTabsRectTop()
      activeTabIndex.current = getTabIndex(tab)
      setActiveTab(tab)

      if (groupId) storeTabSelection(groupId, tab.value)
    },
    [groupId, readTabsRectTop, getTabIndex, storeTabSelection],
  )

  const goToTab = useCallback(
    (index: number): void => {
      const tab = tabs[index]
      const tabElement = tabRefs.current[index].current

      if (tab && tabElement) {
        setActiveTabAndStoreSelection(tab)
        setIsKeyNavigating(true)
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
        (tabRef) => tabRef.current === document.activeElement,
      )
      if (autoNavigated) return

      for (const entry of entries) {
        if (entry.contentRect.height === storedHeight) return
        storedHeight = entry.contentRect.height
        const rectTopDiff = readTabsRectTop() - tabsRectTop.current
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

  return (
    <TabsWrapper ref={tabsRef} {...restProps}>
      <TabList role="tablist" aria-orientation="horizontal">
        {tabs.map((tab, index) => {
          const selected = activeTab.value === tab.value

          return (
            <Tab
              role="tab"
              key={`tab-${tab.value}`}
              id={`tab-id-${tab.value}-${tabsId}`}
              tabIndex={selected ? 0 : -1}
              ref={tabRefs.current[index]}
              aria-controls={`panel-id-${tab.value}-${tabsId}`}
              aria-selected={selected}
              onKeyDown={onKeyDown}
              onClick={() => setActiveTabAndStoreSelection(tab)}
              $selected={selected}
              disabled={tab.disabled}
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

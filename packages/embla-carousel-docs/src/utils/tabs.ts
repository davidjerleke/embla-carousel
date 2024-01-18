import React, { PropsWithChildren } from 'react'
import { TabsItemType, TabsPositionType } from 'consts/tabs'
import { PropType as TabsItemPropType } from 'components/Tabs/TabsItem'

export const mapChildrenToTabs = (
  children: React.ReactNode
): TabsItemType[] => {
  let tabIndex = 0

  return React.Children.toArray(children).reduce((tabs, child) => {
    if (!React.isValidElement(child)) return tabs
    if (!isTabsItemProps(child.props)) return tabs

    const { props } = child
    const clonedChild = React.cloneElement(
      child as React.ReactElement<TabsItemType>,
      {
        index: props.disabled ? -1 : tabIndex,
        label: props.tab.LABEL,
        value: props.tab.VALUE,
        ...props
      }
    )
    if (!props.disabled) tabIndex += 1
    return [...tabs, clonedChild.props]
  }, [] as TabsItemType[])
}

export const isTabsItemProps = (
  props: TabsItemPropType | PropsWithChildren<{}>
): props is TabsItemPropType => {
  return 'tab' in props
}

export const getDefaultTab = (
  tabs: TabsItemType[],
  storedTabSelection: string
): TabsItemType => {
  const storedTab = tabs.find((tab) => tab.value === storedTabSelection)
  return storedTab || tabs.find((tab) => tab.default) || tabs[0]
}

export const getTabsPosition = <ElementType extends HTMLElement>(
  element: ElementType | null
): TabsPositionType => {
  if (!element) return { offsetTop: 0, rectTop: 0 }
  return {
    offsetTop: element.offsetTop,
    rectTop: element.getBoundingClientRect().top
  }
}

export const getTabsPositionDiff = (
  currentScroll: TabsPositionType,
  previousScroll: TabsPositionType
): number => {
  const offsetDiff = currentScroll.offsetTop - previousScroll.offsetTop
  const rectDiff = currentScroll.rectTop - previousScroll.rectTop
  return Math.abs(offsetDiff - rectDiff) > 1 ? rectDiff : offsetDiff
}

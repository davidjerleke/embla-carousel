import React, { PropsWithChildren } from 'react'
import { TabsItemType } from 'consts/tabs'
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
  storedTab: string
): TabsItemType => {
  const stored = tabs.find((tab) => tab.value === storedTab)
  return stored || tabs.find((tab) => tab.default) || tabs[0]
}

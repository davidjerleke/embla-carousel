import React, { PropsWithChildren } from 'react'
import { PropType as TabsItemPropType } from '@/components/Tabs/TabsItem'

/* CONSTS */
export type TabsGroupType = {
  GROUP_ID: string
  TABS: {
    [key: string]: TabsGroupItemType
  }
}

export type TabsGroupItemType = {
  LABEL: string
  VALUE: string
}

export type TabsItemType = PropsWithChildren<{
  value: string
  label: string
  index: number
  default?: boolean
  disabled?: boolean
}>

export const TABS_SIDEBAR_NAVIGATION: TabsGroupType = {
  GROUP_ID: '',
  TABS: {
    MAIN_MENU: {
      LABEL: 'Docs menu',
      VALUE: 'docs-menu'
    },
    ON_THIS_PAGE: {
      LABEL: 'On this page',
      VALUE: 'table-of-contents'
    }
  }
}

export const TABS_PACKAGE_MANAGER: TabsGroupType = {
  GROUP_ID: 'package-manager',
  TABS: {
    CDN: {
      LABEL: 'CDN',
      VALUE: 'cdn'
    },
    NPM: {
      LABEL: 'npm',
      VALUE: 'npm'
    },
    PNPM: {
      LABEL: 'pnpm',
      VALUE: 'pnpm'
    },
    YARN: {
      LABEL: 'yarn',
      VALUE: 'yarn'
    }
  }
}

export const TABS_LIBRARY: TabsGroupType = {
  GROUP_ID: 'library',
  TABS: {
    VANILLA: {
      LABEL: 'Vanilla',
      VALUE: 'vanilla'
    },
    REACT: {
      LABEL: 'React',
      VALUE: 'react'
    },
    VUE: {
      LABEL: 'Vue',
      VALUE: 'vue'
    },
    SVELTE: {
      LABEL: 'Svelte',
      VALUE: 'svelte'
    },
    SOLID: {
      LABEL: 'Solid',
      VALUE: 'solid'
    }
  }
}

/* UTILS */
export function mapChildrenToTabs(children: React.ReactNode): TabsItemType[] {
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

export function isTabsItemProps(props: any): props is TabsItemPropType {
  return 'tab' in props
}

export function getDefaultTab(
  tabs: TabsItemType[],
  storedTab: string
): TabsItemType {
  const stored = tabs.find((tab) => tab.value === storedTab)
  return stored || tabs.find((tab) => tab.default) || tabs[0]
}

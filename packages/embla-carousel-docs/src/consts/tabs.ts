import { PropsWithChildren } from 'react'

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

export const TABS_SITE_NAVIGATION: TabsGroupType = {
  GROUP_ID: '',
  TABS: {
    MAIN_MENU: {
      LABEL: 'Main menu',
      VALUE: 'main-menu'
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
    },
    ANGULAR: {
      LABEL: 'Angular',
      VALUE: 'angular'
    }
  }
}

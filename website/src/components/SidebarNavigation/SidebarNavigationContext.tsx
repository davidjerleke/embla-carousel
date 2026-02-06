'use client'

import React, { createContext, useContext } from 'react'
import { FlatAndHierarchicalRoutesType } from '@/utils/routes'

const SidebarNavigationContext = createContext<FlatAndHierarchicalRoutesType>({
  hierarchicalRoutes: [],
  flatRoutes: []
})

type PropType = {
  children: React.ReactNode
  routes: FlatAndHierarchicalRoutesType
}

export function SidebarNavigationProvider(props: PropType) {
  const { routes, children } = props

  return (
    <SidebarNavigationContext.Provider value={routes}>
      {children}
    </SidebarNavigationContext.Provider>
  )
}

export function useSidebarNavigationContext(): FlatAndHierarchicalRoutesType {
  return useContext(SidebarNavigationContext)
}

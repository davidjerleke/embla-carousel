'use client'

import React, { createContext, useContext } from 'react'
import { FlatAndHierarchicalRoutesType } from '@/utils/routes'

export type SidebarNavigationContextType = FlatAndHierarchicalRoutesType

const SidebarNavigationContext = createContext<SidebarNavigationContextType>({
  hierarchicalRoutes: [],
  flatRoutes: []
})

type PropType = {
  children: React.ReactNode
  routes: SidebarNavigationContextType
}

export function SidebarNavigationProvider(props: PropType) {
  const { routes, children } = props

  return (
    <SidebarNavigationContext.Provider value={routes}>
      {children}
    </SidebarNavigationContext.Provider>
  )
}

export function useSidebarNavigationContext(): SidebarNavigationContextType {
  return useContext(SidebarNavigationContext)
}

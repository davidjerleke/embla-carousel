'use client'

import React, { createContext, useContext } from 'react'
import { FlatAndHierarchicalRoutesType } from '@/utils/routes'

const SiteNavigationContext = createContext<FlatAndHierarchicalRoutesType>({
  hierarchicalRoutes: [],
  flatRoutes: []
})

type PropType = {
  children: React.ReactNode
  routes: FlatAndHierarchicalRoutesType
}

export function SiteNavigationProvider(props: PropType) {
  const { routes, children } = props

  return (
    <SiteNavigationContext.Provider value={routes}>
      {children}
    </SiteNavigationContext.Provider>
  )
}

export function useSiteNavigationContext(): FlatAndHierarchicalRoutesType {
  return useContext(SiteNavigationContext)
}

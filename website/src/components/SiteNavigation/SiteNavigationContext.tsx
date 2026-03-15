'use client'

import React, { createContext, useContext } from 'react'
import { RouteType } from '@/utils/routes'

export type SiteNavigationContextType = {
  flatRoutes: RouteType[]
  homeRoute: RouteType
}

const SiteNavigationContext = createContext<SiteNavigationContextType>({
  flatRoutes: [],
  homeRoute: {
    title: '',
    description: '',
    level: 0,
    order: 0,
    children: [],
    slug: '/'
  }
})

type PropType = {
  children: React.ReactNode
  routes: SiteNavigationContextType
}

export function SiteNavigationProvider(props: PropType) {
  const { routes, children } = props

  return (
    <SiteNavigationContext.Provider value={routes}>
      {children}
    </SiteNavigationContext.Provider>
  )
}

export function useSiteNavigationContext(): SiteNavigationContextType {
  return useContext(SiteNavigationContext)
}

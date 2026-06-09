'use client'

import React, { createContext, useContext } from 'react'
import { RouteType } from '@/utils/routes'

export type HeaderNavigationContextType = {
  flatRoutes: RouteType[]
  homeRoute: RouteType
}

const HeaderNavigationContext = createContext<HeaderNavigationContextType>({
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
  routes: HeaderNavigationContextType
}

export function HeaderNavigationProvider(props: PropType) {
  const { routes, children } = props

  return (
    <HeaderNavigationContext.Provider value={routes}>
      {children}
    </HeaderNavigationContext.Provider>
  )
}

export function useHeaderNavigationContext(): HeaderNavigationContextType {
  return useContext(HeaderNavigationContext)
}

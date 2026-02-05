'use client'

import React, { createContext, useContext } from 'react'
import { RouteType } from '@/utils/routes'

export type RoutesContextType = {
  hierarchicalRoutes: RouteType[]
  flatRoutes: RouteType[]
}

const RoutesContext = createContext<RoutesContextType>({
  hierarchicalRoutes: [],
  flatRoutes: []
})

type PropType = {
  children: React.ReactNode
  routes: RoutesContextType
}

export function RoutesProvider(props: PropType) {
  const { routes, children } = props

  return (
    <RoutesContext.Provider value={routes}>{children}</RoutesContext.Provider>
  )
}

export function useRoutesContext(): RoutesContextType {
  return useContext(RoutesContext)
}

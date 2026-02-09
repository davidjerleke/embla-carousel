'use client'

import React, { createContext, useContext } from 'react'

export type GlobalDataContextType = {
  title: string
  description: string
  author: string
  latestVersion: string
}

const GlobalDataContext = createContext<GlobalDataContextType>({
  title: '',
  description: '',
  author: '',
  latestVersion: ''
})

type PropType = {
  children: React.ReactNode
  data: GlobalDataContextType
}

export function GlobalDataProvider(props: PropType) {
  const { data, children } = props

  return (
    <GlobalDataContext.Provider value={data}>
      {children}
    </GlobalDataContext.Provider>
  )
}

export function useGlobalDataContext(): GlobalDataContextType {
  return useContext(GlobalDataContext)
}

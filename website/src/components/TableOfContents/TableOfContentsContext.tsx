'use client'

import React, { createContext, useContext } from 'react'
import { TableOfContentsType } from '@/utils/table-of-contents'

const TableOfContentsContext = createContext<TableOfContentsType>([])

type PropType = {
  children: React.ReactNode
  tableOfContents: TableOfContentsType
}

export function TableOfContentsProvider(props: PropType) {
  const { tableOfContents, children } = props

  return (
    <TableOfContentsContext.Provider value={tableOfContents}>
      {children}
    </TableOfContentsContext.Provider>
  )
}

export function useTableOfContentsContext(): TableOfContentsType {
  return useContext(TableOfContentsContext)
}

import React, { createContext, PropsWithChildren, useMemo } from 'react'

export type TableOfContentsItemType = {
  items?: TableOfContentsItemType[]
  title?: string
  url?: string
}

export type TableOfContentsType = {
  items: TableOfContentsItemType[]
}

export type TableOfContentsContextType = TableOfContentsItemType

export const TableOfContentsContext = createContext<TableOfContentsContextType>(
  {}
)

type PropType = PropsWithChildren<{
  tableOfContents: TableOfContentsType
}>

export const TableOfContentsProvider = (props: PropType) => {
  const { tableOfContents, children } = props

  const value = useMemo(() => {
    const hasItems = tableOfContents?.items && tableOfContents.items[0]
    return hasItems || { items: [] }
  }, [tableOfContents])

  return (
    <TableOfContentsContext.Provider value={value}>
      {children}
    </TableOfContentsContext.Provider>
  )
}

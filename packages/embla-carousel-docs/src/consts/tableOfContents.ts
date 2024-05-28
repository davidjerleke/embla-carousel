export type TableOfContentsType = {
  items: TableOfContentsItemType[]
}

export type TableOfContentsItemType = {
  items?: TableOfContentsItemType[]
  title?: string
  url?: string
}

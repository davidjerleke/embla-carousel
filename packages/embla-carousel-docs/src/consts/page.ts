import { GraphQLNodeType } from './graphQL'
import { TableOfContentsType } from 'components/TableOfContents/TableOfContentsContext'

export const PAGE_LAYOUTS = <const>{
  HOME: 'Home',
  NOT_FOUND: '404',
  GENERATOR: 'Generator',
  DEFAULT: 'Default'
}

export type PageHomeLayoutType = typeof PAGE_LAYOUTS.HOME
export type PageNotFoundLayoutType = typeof PAGE_LAYOUTS.NOT_FOUND
export type PageGeneratorLayoutType = typeof PAGE_LAYOUTS.GENERATOR
export type PageDefaultLayoutType = typeof PAGE_LAYOUTS.DEFAULT

export type PageLayoutType = typeof PAGE_LAYOUTS[keyof typeof PAGE_LAYOUTS]

export type PageOverviewType = {
  id: GraphQLNodeType['id']
  slug: GraphQLNodeType['fields']['slug']
  title: GraphQLNodeType['frontmatter']['title']
  order: GraphQLNodeType['frontmatter']['order']
  level: number
}

type PageBaseType = {
  data: {
    mdx: {
      tableOfContents: TableOfContentsType
      frontmatter: GraphQLNodeType['frontmatter']
    }
  }
}

export type PageContextType<LayoutType = PageLayoutType> = {
  id: string
  layout: LayoutType
  slug: string
  filePath: string
}

export type PagePaginationType = {
  next?: PageOverviewType
  previous?: PageOverviewType
}

export type PagePropType<
  LayoutType = PageLayoutType,
  ExtendType = {}
> = PageBaseType & { pageContext: PageContextType<LayoutType> & ExtendType }

export type SetupGatsbyPageType<
  LayoutType = PageLayoutType,
  ExtendType = {}
> = {
  path: string
  component: string
  context: PageContextType<LayoutType> & ExtendType
}

export type PageHeadPropType = PagePropType & {
  params: {}
  location: { pathname: string }
}

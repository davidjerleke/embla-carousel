import { RouteType } from 'components/Routes/RoutesContext'
import { TableOfContentsType } from 'components/TableOfContents/TableOfContentsContext'

export const PAGE_TEMPLATES = <const>{
  HOME: 'Home',
  PAGE: 'Page',
  NOT_FOUND: '404',
}

export type PageTemplateType =
  typeof PAGE_TEMPLATES[keyof typeof PAGE_TEMPLATES]

export type PageTemplatePropType = {
  data: {
    mdx: {
      tableOfContents: TableOfContentsType
      frontmatter: {
        title: string
        date: string
        description: string
      }
    }
  }
  pageContext: {
    id: string
    layout: PageTemplateType
    slug: string
    filePath: string
    next?: RouteType
    previous?: RouteType
  }
}

export type PageTemplateSeoPropType = PageTemplatePropType & {
  params: {}
  location: { pathname: string }
}

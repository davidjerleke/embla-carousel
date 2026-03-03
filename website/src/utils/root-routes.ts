import { getMetadataFromMdxContent } from '@/utils/mdx'
import { GLOBAL_DATA } from '@/utils/global-data'
import { RouteType } from '@/utils/routes'
import { SiteNavigationContextType } from '@/components/SiteNavigation/SiteNavigationContext'
import { getHomePageContent } from '@/utils/home-page'
import { getDocsPageContent } from '@/utils/docs-page'
import { prefixSlugWithDocs } from '@/utils/slug'

/* UTILS */
export async function getRootRoutes(): Promise<SiteNavigationContextType> {
  const { URLS } = GLOBAL_DATA

  const homeModule = await getHomePageContent()
  const homeMetadata = getMetadataFromMdxContent(homeModule)

  const docsModule = await getDocsPageContent()
  const docsMetadata = getMetadataFromMdxContent(docsModule)

  const homeRoute: RouteType = {
    title: homeMetadata.title,
    description: homeMetadata.description,
    level: 0,
    order: 0,
    children: [],
    slug: '/'
  }

  const docsRoute: RouteType = {
    title: docsMetadata.title,
    description: docsMetadata.description,
    level: 1,
    order: 0,
    children: [],
    slug: prefixSlugWithDocs('')
  }

  const gitHubRoute: RouteType = {
    title: 'GitHub',
    description: '',
    level: 1,
    order: 1,
    children: [],
    slug: URLS.GITHUB_ROOT
  }

  const sponsorRoute: RouteType = {
    title: 'Sponsor',
    description: '',
    level: 1,
    order: 2,
    children: [],
    slug: URLS.GITHUB_SPONSORS_PAGE
  }

  return {
    homeRoute,
    flatRoutes: [docsRoute, gitHubRoute, sponsorRoute]
  }
}

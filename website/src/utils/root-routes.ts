import path from 'path'
import {
  getSharedPageFolderPath,
  getVersionedPageFolderPath
} from '@/utils/content-path'
import { LATEST_VERSION } from '@/utils/version'
import { filePathToMdxFrontmatter } from '@/utils/mdx'
import { URLS } from '@/utils/urls'
import { RouteType } from '@/utils/routes'
import { SiteNavigationContextType } from '@/components/SiteNavigation/SiteNavigationContext'

/* UTILS */
export async function getRootRoutes(): Promise<SiteNavigationContextType> {
  const sharedDir = getSharedPageFolderPath()
  const versionedDir = getVersionedPageFolderPath(LATEST_VERSION)

  const homeRootFilePath = path.join(sharedDir, 'home.mdx')
  const homeRootFrontmatter = filePathToMdxFrontmatter(homeRootFilePath)

  const docsRootFilePath = path.join(versionedDir, 'index.mdx')
  const docsRootFrontmatter = filePathToMdxFrontmatter(docsRootFilePath)

  const homeRoute: RouteType = {
    ...homeRootFrontmatter,
    level: 0,
    order: 0,
    children: [],
    slug: '/'
  }

  const docsRoute: RouteType = {
    ...docsRootFrontmatter,
    level: 1,
    order: 0,
    children: [],
    slug: '/docs'
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

import fs from 'fs'
import path from 'path'
import { getVersionedPageFolderPath } from '@/utils/content-path'
import { LATEST_VERSION } from '@/utils/version'
import { filePathToMdxFrontmatter } from '@/utils/mdx'
import { FlatAndHierarchicalRoutesType, RouteType } from '@/utils/routes'
import { URLS } from './urls'

/* UTILS */
export async function getRootRoutes(): Promise<FlatAndHierarchicalRoutesType> {
  const pagesDir = getVersionedPageFolderPath(LATEST_VERSION)
  const flatRoutes: RouteType[] = []

  const docsRootFilePath = path.join(pagesDir, 'index.mdx')
  const docsRootFrontmatter = filePathToMdxFrontmatter(docsRootFilePath)
  const docsRoute: RouteType = {
    ...docsRootFrontmatter,
    level: 0,
    order: 0,
    children: [],
    slug: '/docs'
  }

  const gitHubRoute: RouteType = {
    title: 'GitHub',
    description: '',
    level: 0,
    order: 1,
    children: [],
    slug: URLS.GITHUB_ROOT
  }

  const sponsorRoute: RouteType = {
    title: 'Sponsor',
    description: '',
    level: 0,
    order: 2,
    children: [],
    slug: URLS.GITHUB_SPONSORS_PAGE
  }

  flatRoutes.push(docsRoute)
  flatRoutes.push(gitHubRoute)
  flatRoutes.push(sponsorRoute)

  return {
    hierarchicalRoutes: [],
    flatRoutes
  }
}

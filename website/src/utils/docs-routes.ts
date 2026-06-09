import fs from 'fs'
import path from 'path'
import { getVersionedPageFolderStaticPath } from '@/utils/content-path'
import { DOCS_LATEST_VERSION } from '@/utils/global-data'
import { getMetadataFromMdxContent } from '@/utils/mdx'
import {
  getSlugWithVersion,
  pathToSlug,
  prefixSlugWithDocs
} from '@/utils/slug'
import { getDocsPageContent } from '@/utils/docs-page'
import { SidebarNavigationContextType } from '@/components/SidebarNavigation/SidebarNavigationContext'
import {
  createHierarchicalRoutes,
  RouteType,
  sortRoutesByOrder
} from '@/utils/routes'

/* UTILS */
export async function getDocsRoutes(
  slugOrEmpty?: string[]
): Promise<SidebarNavigationContextType> {
  const slug = slugOrEmpty || []
  const slugWithVersion = getSlugWithVersion(slug)
  const version = slugWithVersion[0]
  const isLatestVersion = version === `v${DOCS_LATEST_VERSION.MAJOR}`
  const pagesDir = getVersionedPageFolderStaticPath(version)
  const flatRoutes: RouteType[] = []

  const walk = async (dir: string): Promise<void> => {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const isDirectory = fs.statSync(filePath).isDirectory()

      if (isDirectory) {
        await walk(filePath)
        continue
      }

      if (!file.endsWith('.mdx')) continue

      const relativePath = filePath
        .replace(pagesDir, '')
        .replace(/(index)?\.mdx$/, '')

      const slugPath = pathToSlug(relativePath)
      const modulePath = slugPath.split('/').filter(Boolean)
      const modulePathWithVersion = isLatestVersion
        ? modulePath
        : [version, ...modulePath]
      const module = await getDocsPageContent(modulePathWithVersion)

      const slugWithoutTrailingSlash = slugPath.replace(/\/$/, '')
      const versionedSlugWhenNotLatest = isLatestVersion
        ? slugWithoutTrailingSlash
        : version + slugWithoutTrailingSlash

      const metadata = getMetadataFromMdxContent(module)
      const slug = prefixSlugWithDocs(versionedSlugWhenNotLatest)
      const removeVersionLevel = isLatestVersion ? 0 : 1
      const level = slug.split('/').filter(Boolean).length - removeVersionLevel

      flatRoutes.push({
        title: metadata.title,
        description: metadata.description,
        order: metadata.order,
        slug,
        level,
        children: []
      })
    }
  }

  await walk(pagesDir)
  flatRoutes.sort(sortRoutesByOrder)

  return {
    hierarchicalRoutes: createHierarchicalRoutes(flatRoutes, 2),
    flatRoutes
  }
}

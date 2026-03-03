import fs from 'fs'
import path from 'path'
import { getVersionedPageFolderStaticPath } from '@/utils/content-path'
import { LATEST_VERSION, VERSION_REGEX } from '@/utils/version'
import { getMetadataFromMdxContent } from '@/utils/mdx'
import { pathToSlug } from '@/utils/path-to-slug'
import { getDocsPageContent } from '@/utils/docs-page'
import { SidebarNavigationContextType } from '@/components/SidebarNavigation/SidebarNavigationContext'
import {
  createHierarchicalRoutes,
  RouteType,
  sortRoutesByOrder
} from '@/utils/routes'

/* UTILS */
export function prefixSlugWithDocs(slugOrEmpty: string): string {
  const slug = slugOrEmpty || ''
  if (slug.startsWith('/docs')) return slug
  if (!slug) return '/docs'

  const separator = slug.startsWith('/') ? '' : '/'
  return `/docs${separator}${slug}`
}

export async function getDocsRoutes(
  slugOrEmpty?: string[]
): Promise<SidebarNavigationContextType> {
  const slug = slugOrEmpty || []
  const slugIncludesVersion = slug[0]?.match(VERSION_REGEX)
  const version = slugIncludesVersion ? slug[0] : LATEST_VERSION
  const isLatestVersion = version === LATEST_VERSION
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
      const slugWithVersion = isLatestVersion
        ? slugWithoutTrailingSlash
        : version + slugWithoutTrailingSlash

      const metadata = getMetadataFromMdxContent(module)
      const slug = prefixSlugWithDocs(slugWithVersion)
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

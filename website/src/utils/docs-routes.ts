import fs from 'fs'
import path from 'path'
import { getVersionedPageFolderPath } from '@/utils/content-path'
import { LATEST_VERSION, VERSION_REGEX } from '@/utils/version'
import { filePathToMdxFrontmatter } from '@/utils/mdx'
import { createHierarchicalRoutes, RouteType } from '@/utils/routes'
import { SidebarNavigationContextType } from '@/components/SidebarNavigation/SidebarNavigationContext'

/* UTILS */
export function prefixSlugWithDocs(slugOrEmpty: string): string {
  const slug = slugOrEmpty || ''
  return path.join('/docs', slug)
}

export async function getDocsRoutes(
  slugOrEmpty?: string[]
): Promise<SidebarNavigationContextType> {
  const slug = slugOrEmpty || []
  const slugIncludesVersion = slug[0]?.match(VERSION_REGEX)
  const version = slugIncludesVersion ? slug[0] : LATEST_VERSION
  const isLatestVersion = version === LATEST_VERSION
  const pagesDir = getVersionedPageFolderPath(version)
  const flatRoutes: RouteType[] = []

  const walk = (dir: string): void => {
    fs.readdirSync(dir).flatMap((file) => {
      const filePath = path.join(dir, file)
      const isDirectory = fs.statSync(filePath).isDirectory()

      if (isDirectory) {
        return walk(filePath)
      }
      if (!file.endsWith('.mdx')) {
        return
      }

      const frontmatter = filePathToMdxFrontmatter(filePath)
      const slugPath = filePath
        .replace(pagesDir, '')
        .replace('.mdx', '')
        .replace(/\/index$/, '')
      const slugWithVersion = isLatestVersion
        ? slugPath
        : path.join(version, slugPath)
      const slug = prefixSlugWithDocs(slugWithVersion)
      const removeVersionLevel = isLatestVersion ? 0 : 1
      const level = slug.split('/').filter(Boolean).length - removeVersionLevel

      flatRoutes.push({
        ...frontmatter,
        slug,
        level,
        children: []
      })
    })
  }

  walk(pagesDir)

  return {
    hierarchicalRoutes: createHierarchicalRoutes(flatRoutes, 2),
    flatRoutes
  }
}

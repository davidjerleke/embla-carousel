import fs from 'fs'
import path from 'path'
import { getVersionedPageFolderPath } from '@/utils/content-path'
import { LATEST_VERSION, VERSION_REGEX } from '@/utils/version'
import { filePathToMdxFrontmatter } from '@/utils/mdx'
import { SidebarNavigationContextType } from '@/components/SidebarNavigation/SidebarNavigationContext'
import { createHierarchicalRoutes, RouteType } from '@/utils/routes'

/* UTILS */
export async function getDocsPageRoutes(
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
      const slug = isLatestVersion
        ? slugPath
        : path.join(`${version}`, slugPath)

      flatRoutes.push({
        ...frontmatter,
        slug: path.join('/docs', slug),
        level: slugPath.split('/').filter(Boolean).length,
        children: []
      })
    })
  }

  walk(pagesDir)

  return {
    hierarchicalRoutes: createHierarchicalRoutes(flatRoutes),
    flatRoutes
  }
}

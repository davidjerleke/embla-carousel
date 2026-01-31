import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getVersionedPageFolderPath } from '@/utils/content-path'
import { LATEST_VERSION, VERSION_REGEX } from '@/consts/version'
import { MdxFrontmatterType } from '@/consts/mdx'

// TODO: Move RouteType to consts/routes.ts
// TODO: Add hierarchal routes
type RouteType = {
  slug: string
  title: string
  description: string
  level: number
  children: RouteType[]
  // TODO: Add order here, maybe based on file name prefix like 01-filename.mdx
}

export async function getDocsPageRoutes(
  slugOrEmpty?: string[]
): Promise<RouteType[]> {
  const slug = slugOrEmpty || []
  const slugIncludesVersion = slug[0]?.match(VERSION_REGEX)
  const version = slugIncludesVersion ? slug[0] : LATEST_VERSION
  const isLatestVersion = version === LATEST_VERSION
  const pagesDir = getVersionedPageFolderPath(version)
  const flatRoutes: RouteType[] = []

  const walk = (dir: string) => {
    fs.readdirSync(dir).flatMap((file) => {
      const filePath = path.join(dir, file)
      const isDirectory = fs.statSync(filePath).isDirectory()

      if (isDirectory) {
        return walk(filePath)
      }
      if (!file.endsWith('.mdx')) {
        return
      }

      const { data } = matter(fs.readFileSync(filePath, 'utf8'))
      const frontmatter = data as MdxFrontmatterType
      const slugPath = filePath
        .replace(pagesDir, '')
        .replace('.mdx', '')
        .replace(/\/index$/, '')
      const slug = isLatestVersion
        ? slugPath
        : path.join(`/${version}`, slugPath)

      flatRoutes.push({
        slug,
        title: frontmatter.title || '',
        description: frontmatter.description || '',
        level: slugPath.split('/').filter(Boolean).length,
        children: []
      })
    })
  }

  walk(pagesDir)
  return flatRoutes
}

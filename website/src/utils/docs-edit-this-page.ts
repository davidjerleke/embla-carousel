import path from 'path'
import { getDocsPageFileStaticPath } from '@/utils/docs-page'
import { GLOBAL_DATA } from '@/utils/global-data'
import { pathToSlug } from '@/utils/path-to-slug'

/* CONSTS */
export type DocsPagePaginationType = string

/* UTILS */
export async function getDocsPageEditThisPagePath(
  slugOrEmpty?: string[]
): Promise<DocsPagePaginationType> {
  const slug = slugOrEmpty || []
  const filePath = await getDocsPageFileStaticPath(slug)
  const baseDir = path.basename(process.cwd())
  const relativeFilePath = filePath.match(new RegExp(`${baseDir}?.*`))

  if (!relativeFilePath) return ''

  const relativePath = relativeFilePath[0]
  const relativeSlug = pathToSlug(relativePath)

  return `${GLOBAL_DATA.URLS.GITHUB_ROOT}/${relativeSlug}`
}

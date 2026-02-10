import path from 'path'
import { getDocsPageFilePath } from '@/utils/docs-page'
import { URLS } from '@/utils/urls'

/* CONSTS */
export type DocsPagePaginationType = string

/* UTILS */
export async function getDocsPageEditThisPagePath(
  slugOrEmpty?: string[]
): Promise<DocsPagePaginationType> {
  const slug = slugOrEmpty || []
  const filePath = await getDocsPageFilePath(slug)
  const baseDir = path.basename(process.cwd())
  const relativeFilePath = filePath.match(new RegExp(`${baseDir}?.*`))

  if (!relativeFilePath) return ''

  const relativePath = relativeFilePath[0]
  return path.join(URLS.GITHUB_DOCUMENTATION, relativePath)
}

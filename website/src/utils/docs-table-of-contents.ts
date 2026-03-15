import fs from 'fs'
import { getDocsPageFileStaticPath } from '@/utils/docs-page'
import {
  filePathToTableOfContents,
  TableOfContentsType
} from '@/utils/table-of-contents'

/* UTILS */
export async function getDocsTableOfContents(
  slugOrEmpty?: string[]
): Promise<TableOfContentsType> {
  const filePath = await getDocsPageFileStaticPath(slugOrEmpty)
  const doesFileExist = !!filePath && fs.existsSync(filePath)

  if (!doesFileExist) {
    return []
  }

  return filePathToTableOfContents(filePath)
}

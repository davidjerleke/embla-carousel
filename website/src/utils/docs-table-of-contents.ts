import fs from 'fs'
import { getDocsPageFilePath } from '@/utils/docs-page'
import {
  filePathToTableOfContents,
  TableOfContentsType
} from '@/utils/table-of-contents'

/* UTILS */
export async function getDocsTableOfContents(
  slugOrEmpty?: string[]
): Promise<TableOfContentsType> {
  const filePath = await getDocsPageFilePath(slugOrEmpty)
  const doesFileExist = !!filePath && fs.existsSync(filePath)

  if (!doesFileExist) {
    return []
  }

  return filePathToTableOfContents(filePath)
}

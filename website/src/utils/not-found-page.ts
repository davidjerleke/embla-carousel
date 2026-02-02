import fs from 'fs'
import path from 'path'
import { getSharedPageFolderPath } from '@/utils/content-path'
import { notFound } from 'next/navigation'
import { filePathToMdxContent, type MdxCompiledContentType } from '@/utils/mdx'

/* UTILS */
export async function getNotFoundPageFilePath(): Promise<string> {
  return path.join(getSharedPageFolderPath(), 'not-found.mdx')
}

export async function getNotFoundPageContent(): Promise<MdxCompiledContentType> {
  const filePath = await getNotFoundPageFilePath()
  const doesFileExist = !!filePath && fs.existsSync(filePath)

  if (!doesFileExist) {
    notFound()
  }

  return filePathToMdxContent(filePath)
}

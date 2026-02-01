import fs from 'fs'
import path from 'path'
import { getHomePageFolderPath } from '@/utils/content-path'
import { notFound } from 'next/navigation'
import { filePathToMdxContent, type MdxCompiledContentType } from '@/utils/mdx'

/* UTILS */
export async function getHomePageFilePath(): Promise<string> {
  return path.join(getHomePageFolderPath(), 'home.mdx')
}

export async function getHomePageContent(): Promise<MdxCompiledContentType> {
  const filePath = await getHomePageFilePath()
  const doesFileExist = !!filePath && fs.existsSync(filePath)

  if (!doesFileExist) {
    notFound()
  }

  return filePathToMdxContent(filePath)
}

import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { LATEST_VERSION, VERSION_REGEX } from '@/utils/version'
import { getVersionedPageFolderPath } from '@/utils/content-path'
import { filePathToMdxContent, type MdxCompiledContentType } from '@/utils/mdx'

/* CONSTS */
export type DocsPageParamsType = {
  params: Promise<{
    slug?: string[]
  }>
}

/* UTILS */
export async function getDocsPageFilePath(
  slugOrEmpty?: string[]
): Promise<string> {
  const slug = slugOrEmpty || []
  const slugIncludesVersion = slug[0]?.match(VERSION_REGEX)
  const slugIsLatestVersion = slug[0] === LATEST_VERSION

  if (slugIsLatestVersion) {
    return ''
  }

  const slugWithVersion = slugIncludesVersion ? slug : [LATEST_VERSION, ...slug]
  const version = slugWithVersion[0]
  const basePath = getVersionedPageFolderPath(version)

  let filePath = ''

  if (slugWithVersion.length === 1) {
    filePath = path.join(basePath, 'index.mdx')
  } else {
    const fileToFind = slugWithVersion.slice(1).join('/')
    const mdxFile = path.join(basePath, `${fileToFind}.mdx`)
    const indexFile = path.join(basePath, `${fileToFind}/index.mdx`)

    const doesMdxFileExist = fs.existsSync(mdxFile)
    const doesIndexFileExist = !doesMdxFileExist && fs.existsSync(indexFile)

    if (doesMdxFileExist) {
      filePath = mdxFile
    }
    if (doesIndexFileExist) {
      filePath = indexFile
    }
  }

  return filePath
}

export async function getDocsPageContent(
  slugOrEmpty?: string[]
): Promise<MdxCompiledContentType> {
  const filePath = await getDocsPageFilePath(slugOrEmpty)
  const doesFileExist = !!filePath && fs.existsSync(filePath)

  if (!doesFileExist) {
    notFound()
  }

  return filePathToMdxContent(filePath)
}

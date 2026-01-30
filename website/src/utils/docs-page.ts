import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import { MdxCompiledContentType } from '@/consts/mdx'
import { LATEST_VERSION, VERSION_REGEX } from '@/consts/version'
import { getVersionedPageFolderPath } from '@/utils/content-path'

export async function resolveDocsPage(
  slugOrEmpty?: string[]
): Promise<MdxCompiledContentType> {
  const slug = slugOrEmpty || []
  const slugIncludesVersion = slug[0]?.match(VERSION_REGEX)
  const slugIsLatestVersion = slug[0] === LATEST_VERSION

  if (slugIsLatestVersion) {
    notFound()
  }

  const slugWithVersion = slugIncludesVersion ? slug : [LATEST_VERSION, ...slug]
  const version = slugWithVersion[0]
  const basePath = getVersionedPageFolderPath(version)

  let filePath = ''

  if (slugWithVersion.length === 1) {
    filePath = path.join(basePath, 'index.mdx')
  } else {
    const pathToFind = slugWithVersion.slice(1).join('/')
    const mdxFile = path.join(basePath, `${pathToFind}.mdx`)
    const indexFile = path.join(basePath, `${pathToFind}/index.mdx`)

    const doesMdxFileExist = fs.existsSync(mdxFile)
    const doesIndexFileExist = !doesMdxFileExist && fs.existsSync(indexFile)

    if (doesMdxFileExist) {
      filePath = mdxFile
    }
    if (doesIndexFileExist) {
      filePath = indexFile
    }
  }

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const source = fs.readFileSync(filePath, 'utf8')
  const { content } = await compileMDX({ source })
  return content
}

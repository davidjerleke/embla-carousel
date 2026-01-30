import fs from 'fs'
import path from 'path'
import { getHomePageFolderPath } from '@/utils/content-path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { MdxCompiledContentType } from '@/consts/mdx'

export async function resolveHomePage(): Promise<MdxCompiledContentType> {
  const filePath = path.join(getHomePageFolderPath(), 'home.mdx')

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const source = fs.readFileSync(filePath, 'utf8')
  const { content } = await compileMDX({ source })
  return content
}

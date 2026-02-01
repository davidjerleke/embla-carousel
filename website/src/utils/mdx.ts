import fs from 'fs'
import matter from 'gray-matter'
import { compileMDX, type CompileMDXResult } from 'next-mdx-remote/rsc'

/* CONSTS */
export const MDX_DEFAULT_COMPILE_OPTIONS = {
  parseFrontmatter: true
}

export type MdxCompiledContentType = CompileMDXResult['content']

export type MdxFrontmatterType = Partial<MdxRouteFrontmatterType>

export type MdxRouteFrontmatterType = {
  title: string
  description: string
  order: number
}

/* UTILS */
export function filePathToMdxFrontmatter(
  filePath: string
): MdxRouteFrontmatterType {
  const { data } = matter(fs.readFileSync(filePath, 'utf8'))
  const frontmatter: MdxRouteFrontmatterType = {
    title: data.title || '',
    description: data.description || '',
    order: data.order || 0
  }

  return frontmatter
}

export async function filePathToMdxContent(
  filePath: string
): Promise<MdxCompiledContentType> {
  const source = fs.readFileSync(filePath, 'utf8')
  const { content } = await compileMDX({
    source,
    options: { ...MDX_DEFAULT_COMPILE_OPTIONS }
  })

  return content
}

import { useMDXComponents } from '@/mdx-components'
import fs from 'fs'
import matter from 'gray-matter'
import {
  compileMDX,
  MDXRemoteProps,
  type CompileMDXResult
} from 'next-mdx-remote/rsc'

/* CONSTS */
const MDX_FRONTMATTER_REGEX = /^---[\s\S]*?---/
const MDX_DEFAULT_COMPILE_OPTIONS: MDXRemoteProps['options'] = {
  parseFrontmatter: true
}

export type MdxCompiledContentType = CompileMDXResult['content'] | null

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
  if (!fs.existsSync(filePath)) {
    return {
      title: '',
      description: '',
      order: 0
    }
  }

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
  const hasBody = source.replace(MDX_FRONTMATTER_REGEX, '').trim()

  if (!hasBody) return null

  const { content } = await compileMDX({
    source,
    options: { ...MDX_DEFAULT_COMPILE_OPTIONS },
    components: useMDXComponents()
  })

  return content
}

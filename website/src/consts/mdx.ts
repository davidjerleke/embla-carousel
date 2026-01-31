import { CompileMDXResult } from 'next-mdx-remote/rsc'

export const MDX_DEFAULT_COMPILE_OPTIONS = {
  parseFrontmatter: true
}

export type MdxCompiledContentType = CompileMDXResult['content']

export type MdxFrontmatterType = Partial<{
  title: string
  description: string
}>

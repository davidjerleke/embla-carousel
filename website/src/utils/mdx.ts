import fs from 'fs'
import matter from 'gray-matter'
import { useMDXComponents } from '@/mdx-components'
import rehypeAutolinkHeadings, {
  type Options as RehypeAutolinkHeadingsOptionsType
} from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { h as hastscript } from 'hastscript'
import {
  compileMDX,
  MDXRemoteProps,
  type CompileMDXResult
} from 'next-mdx-remote/rsc'

/* CONSTS */
const MDX_FRONTMATTER_REGEX = /^---[\s\S]*?---/

const REHYPE_AUTOLINK_HEADINGS_OPTIONS: RehypeAutolinkHeadingsOptionsType = {
  behavior: 'prepend',
  properties: { className: ['anchor'] },
  test: (node) => /^h[2-6]$/.test(node.tagName),
  content: hastscript('span', {}, [
    hastscript(
      'svg',
      { width: 16, height: 16, viewBox: '0 0 16 16', ariaHidden: 'true' },
      [
        hastscript('path', {
          fill: 'currentColor',
          d: 'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z'
        })
      ]
    )
  ])
}

const MDX_DEFAULT_COMPILE_OPTIONS: MDXRemoteProps['options'] = {
  parseFrontmatter: true,
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, REHYPE_AUTOLINK_HEADINGS_OPTIONS]
    ]
  }
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

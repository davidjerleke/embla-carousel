import fs from 'fs'
import { visit } from 'unist-util-visit'
import { compile } from '@mdx-js/mdx'
import rehypeSlug from 'rehype-slug'
import type { Plugin } from 'unified'
import type { Root, Element } from 'hast'
import { MDX_FRONTMATTER_REGEX } from '@/utils/mdx'

/* CONSTS */
const HEADING_TAG_REGEX = /^h[2-6]$/

export type TableOfContentsType = TableOfContentsHeading[]

export type TableOfContentsHeading = {
  level: number
  text: string
  id?: string
}

/* UTILS */
function getNodeId(node: Element): string | undefined {
  const id = node.properties?.id
  if (typeof id === 'string') return id
  if (typeof id === 'number') return String(id)
  if (Array.isArray(id)) return id.map(String).join('-')
  return undefined
}

function getTableOfContentsPlugin(): ReturnType<Plugin<[], Root>> {
  return (tree, file) => {
    const headings: TableOfContentsHeading[] = []

    visit(tree, 'element', (node) => {
      if (!HEADING_TAG_REGEX.test(node.tagName)) return
      const id = getNodeId(node)
      if (!id) return

      const text = getNodeText(node)
      const level = Number(node.tagName[1]) - 2
      headings.push({ level, text, id })
    })

    file.data.headings = headings
  }
}

function getNodeText(node: Element): string {
  if (!node.children) return ''

  return node.children
    .map((child) => {
      if (child.type === 'text') return child.value
      if (child.type === 'element') return getNodeText(child)
      return ''
    })
    .join('')
}

export async function filePathToTableOfContents(
  filePath: string
): Promise<TableOfContentsType> {
  const source = fs.readFileSync(filePath, 'utf8')
  const body = source.replace(MDX_FRONTMATTER_REGEX, '')
  const hasBody = body.trim()

  if (!hasBody) return []

  const file = await compile(body, {
    rehypePlugins: [rehypeSlug, getTableOfContentsPlugin],
    outputFormat: 'function-body'
  })
  const headings = <TableOfContentsHeading[]>file.data.headings
  return headings
}

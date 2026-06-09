import type { MDXComponents } from 'mdx/types'
import { Link } from '@/components/Mdx/Components/Link'
import { Pre } from '@/components/Mdx/Components/Pre'
import { Code } from '@/components/Mdx/Components/Code'
import { H1 } from '@/components/Mdx/Components/H1'
import { RepositoryLink } from '@/components/Mdx/Components/RepositoryLink'
import { PageChildLinks } from '@/components/Mdx/Components/PageChildLinks'
import { ApiMetaData } from '@/components/Mdx/Components/ApiMetaData'
import { Admonition } from '@/components/Mdx/Components/Admonition'
import { Hr } from '@/components/Mdx/Components/Hr'
import { Blockquote } from '@/components/Mdx/Components/Blockquote'
import { PrismHighlight } from '@/components/Prism/PrismHighlight'
import { Tabs } from '@/components/Tabs/Tabs'
import { TabsItem } from '@/components/Tabs/TabsItem'

const components: MDXComponents = {
  a: Link,
  pre: Pre,
  code: Code,
  h1: H1,
  hr: Hr,
  blockquote: Blockquote,
  RepositoryLink,
  PageChildLinks,
  ApiMetaData,
  PrismHighlight,
  Admonition,
  Tabs,
  TabsItem
}

export function useMDXComponents(): MDXComponents {
  return components
}

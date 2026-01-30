import type { ReactNode } from 'react'
import { DocsPageParamsType } from '@/consts/docs-page'

type PropType = DocsPageParamsType & {
  children: ReactNode
}

export default async function DocsLayout(props: PropType) {
  const { children, params } = props
  console.log(await params, 'layout params')

  // TODO: Fetch sidebar routes based on version in params.slug, in docs-routes.ts

  return <div>{children}</div>
}

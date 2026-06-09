import { PrismHighlight } from '@/components/Prism/PrismHighlight'
import { ComponentPropsWithoutRef, isValidElement } from 'react'

type PropType = ComponentPropsWithoutRef<'pre'>

export function Pre(props: PropType) {
  const { children } = props
  const isValidReactElement = isValidElement<{
    className?: string
    code: string
    language: string
  }>(children)

  if (isValidReactElement && children.props.className?.includes('language')) {
    return <PrismHighlight {...children.props} />
  }
  return <pre {...props} />
}

import React, { DetailedHTMLProps, HTMLAttributes, isValidElement } from 'react'
import { PrismSyntaxHighlight } from './PrismSyntaxHighlight'

type PropType = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>

export const Pre = (props: PropType) => {
  const { children } = props
  const isValidReactElement = isValidElement(children)

  if (isValidReactElement && children.props.className.includes('language')) {
    return <PrismSyntaxHighlight {...children.props} />
  }
  return <pre {...props} />
}

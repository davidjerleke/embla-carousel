import React from 'react'
import { PrismSyntaxHighlight } from './PrismSyntaxHighlight'

type PropType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>

export const Pre = (props: PropType) => {
  const { children } = props
  const isValidReactElement = React.isValidElement(children)

  if (isValidReactElement && children.props.className.includes('language')) {
    return <PrismSyntaxHighlight {...children.props} />
  }
  return <pre {...props} />
}

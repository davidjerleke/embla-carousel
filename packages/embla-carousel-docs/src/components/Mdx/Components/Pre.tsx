import React, { DetailedHTMLProps, HTMLAttributes, isValidElement } from 'react'
import { PrismHighlight } from './PrismHighlight'

type PropType = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>

export const Pre = (props: PropType) => {
  const { children } = props
  const isValidReactElement = isValidElement(children)

  if (isValidReactElement && children.props.className.includes('language')) {
    return <PrismHighlight {...children.props} />
  }
  return <pre {...props} />
}

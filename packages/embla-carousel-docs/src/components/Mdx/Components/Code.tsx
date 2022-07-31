import React, { PropsWithChildren } from 'react'

type PropType = PropsWithChildren<{
  className: string
}>

export const Code = (props: PropType) => {
  if (props.className !== 'language-text') return <code {...props} />
  const { children, ...restProps } = props

  return (
    <code {...restProps}>
      <span>{children}</span>
    </code>
  )
}

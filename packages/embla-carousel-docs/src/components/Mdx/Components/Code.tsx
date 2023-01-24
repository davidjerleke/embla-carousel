import React from 'react'

type PropType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>

export const Code = (props: PropType) => {
  // console.log(props, 'code')
  if (props.className !== 'language-text') return <code {...props} />
  const { children, ...restProps } = props

  return (
    <code {...restProps}>
      <span>{children}</span>
    </code>
  )
}

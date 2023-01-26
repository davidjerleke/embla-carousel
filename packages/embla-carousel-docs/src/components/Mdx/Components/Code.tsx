import React from 'react'

type PropType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>

export const Code = (props: PropType) => {
  const { children, className } = props

  if (className) return <code {...props} />
  return <code className="language-text">{children}</code>
}

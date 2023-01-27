import React, { HTMLAttributes } from 'react'

type PropType = HTMLAttributes<HTMLElement>

export const Code = (props: PropType) => {
  const { children, className = '' } = props

  if (className) return <code {...props} />
  return <code className="language-text">{children}</code>
}

import React, { HTMLAttributes } from 'react'

export const CODE_HIGHLIGHT_CLASS_NAME = `code-highlight`

type PropType = HTMLAttributes<HTMLElement>

export const Code = (props: PropType) => {
  const { children, className = '' } = props

  if (className) return <code {...props} />

  return (
    <code className={CODE_HIGHLIGHT_CLASS_NAME}>
      <span>{children}</span>
    </code>
  )
}

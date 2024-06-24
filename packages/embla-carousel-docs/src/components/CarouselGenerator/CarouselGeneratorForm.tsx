import React, { ComponentPropsWithRef } from 'react'
import { URLS } from 'consts/urls'

type PropType = ComponentPropsWithRef<'form'>

export const CarouselGeneratorForm = (props: PropType) => {
  const { children, ...restProps } = props

  return (
    <form
      action={URLS.CODESANDBOX_DEFINE}
      method="POST"
      target="_blank"
      {...restProps}
    >
      {children}
    </form>
  )
}

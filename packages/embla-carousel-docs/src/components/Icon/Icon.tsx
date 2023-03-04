import React, { PropsWithChildren } from 'react'
import { ICONS, IconType } from 'assets/icons'
import { css } from 'styled-components'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'

type PropType = PropsWithChildren<{
  svg: IconType
  size?: string
}>

export const Icon = (props: PropType) => {
  const { svg, size = '100%', ...restProps } = props
  const Svg = ICONS[svg]

  return (
    <Svg
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      $css={css`
        ${createSquareSizeStyles(size)}
      `}
      {...restProps}
    />
  )
}

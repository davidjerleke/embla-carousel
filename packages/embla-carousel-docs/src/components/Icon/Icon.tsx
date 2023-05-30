import React, { PropsWithRef } from 'react'
import { ICONS, IconType } from 'assets/icons'
import { css } from 'styled-components'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'

type PropType = PropsWithRef<
  React.DetailedHTMLProps<React.SVGAttributes<SVGSVGElement>, SVGSVGElement>
> & {
  svg: IconType
  color?: string
  size?: string
}

export const Icon = (props: PropType) => {
  const { svg, size = '100%', color = 'currentColor', ...restProps } = props
  const Svg = ICONS[svg]

  return (
    <Svg
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      $css={css`
        color: ${color || 'inherit'};
        ${createSquareSizeStyles(size)};
      `}
      {...restProps}
    />
  )
}

import { ComponentPropsWithRef } from 'react'
import { ICONS, IconType } from '@/assets/icons'
import { css } from 'styled-components'
import { createSquareSizeStyles } from '@/utils/create-square-size-styles'

type PropType = ComponentPropsWithRef<'svg'> & {
  svg: IconType
  color?: string
  size?: string
}

export function Icon(props: PropType) {
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

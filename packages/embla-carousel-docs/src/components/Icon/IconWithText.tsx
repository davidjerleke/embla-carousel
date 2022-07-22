import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { IconType } from 'assets/icons'
import { Icon } from './Icon'

const Wrapper = styled.div<{ $spacing: string }>`
  display: flex;
  align-items: center;

  > :first-child {
    margin-right: ${({ $spacing }) => $spacing};
  }
`

type PropType = PropsWithChildren<{
  iconSvg: IconType
  iconSize?: string
  iconSide?: 'left' | 'right'
  spacing?: string
}>

export const IconWithText = (props: PropType) => {
  const {
    iconSvg,
    iconSize = '1.8rem',
    iconSide = 'left',
    spacing = '0.6rem',
    children,
    ...restProps
  } = props
  const svgOnLeftSide = iconSide === 'left'
  const svg = <Icon svg={iconSvg} size={iconSize} />

  return (
    <Wrapper $spacing={spacing} {...restProps}>
      {svgOnLeftSide && svg}
      <span>{children}</span>
      {!svgOnLeftSide && svg}
    </Wrapper>
  )
}

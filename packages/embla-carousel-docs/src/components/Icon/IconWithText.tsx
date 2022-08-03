import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { IconType } from 'assets/icons'
import { Icon } from './Icon'
import { SPACINGS } from 'consts/spacings'

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
    spacing = SPACINGS.ONE,
    iconSize = SPACINGS.THREE,
    iconSide = 'left',
    iconSvg,
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

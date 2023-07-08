import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { IconType } from 'assets/icons'
import { Icon } from './Icon'
import { SPACINGS } from 'consts/spacings'

const IconWithTextWrapper = styled.span<{ $spacing: string }>`
  display: flex;
  align-items: flex-start;
  text-align: left;

  > :first-child {
    margin-right: ${({ $spacing }) => $spacing};
  }
`

const IconWrapper = styled.span<{ $iconSize: string }>`
  position: relative;
  width: ${({ $iconSize }) => $iconSize};

  &:before {
    width: ${({ $iconSize }) => $iconSize};
    content: '-';
    display: inline-block;
    line-height: inherit;
    opacity: 0;
  }
`

export const IconWithTextIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const IconWithTextText = styled.span``

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
  const svg = (
    <IconWrapper $iconSize={iconSize}>
      <IconWithTextIcon svg={iconSvg} size={iconSize} />
    </IconWrapper>
  )

  return (
    <IconWithTextWrapper $spacing={spacing} {...restProps}>
      {svgOnLeftSide && svg}
      <IconWithTextText>{children}</IconWithTextText>
      {!svgOnLeftSide && svg}
    </IconWithTextWrapper>
  )
}

import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { COLORS } from 'consts/themes'

const ColoredText = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
`

type PropType = PropsWithChildren<{}>

export const BrandPrimaryText = (props: PropType) => {
  return <ColoredText $color={COLORS.BRAND_PRIMARY} {...props} />
}

export const BrandSecondaryText = (props: PropType) => {
  return <ColoredText $color={COLORS.BRAND_SECONDARY} {...props} />
}

export const BrandAlternativeText = (props: PropType) => {
  return <ColoredText $color={COLORS.BRAND_ALTERNATIVE} {...props} />
}

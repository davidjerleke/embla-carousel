import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const ColoredText = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
`

type PropType = PropsWithChildren<{}>

export const BrandPrimaryText = (props: PropType) => {
  return <ColoredText $color="var(--brand-primary)" {...props} />
}

export const BrandSecondaryText = (props: PropType) => {
  return <ColoredText $color="var(--brand-secondary)" {...props} />
}

export const BrandAlternativeText = (props: PropType) => {
  return <ColoredText $color="var(--brand-alternative)" {...props} />
}

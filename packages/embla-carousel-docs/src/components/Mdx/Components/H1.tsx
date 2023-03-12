import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { BRAND_GRADIENT_BACKGROUND_STYLES } from 'consts/gradients'
import { SPACINGS } from 'consts/spacings'
import { BORDER_SIZES } from 'consts/border'

const DECORATION_HEIGHT = BORDER_SIZES.ACCENT_HORIZONTAL
const DECORATION_WIDTH = SPACINGS.CUSTOM(({ EIGHT }) => EIGHT + 0.2)

const Text = styled.span`
  display: block;
  width: 100%;
`

const DecorationWrapper = styled.span`
  display: block;
  font-size: 0;
`

const Decoration = styled.span`
  ${BRAND_GRADIENT_BACKGROUND_STYLES};
  margin-top: ${SPACINGS.FOUR};
  height: ${DECORATION_HEIGHT};
  width: ${DECORATION_WIDTH};
  max-width: 100%;
  display: inline-flex;
`

type PropType = PropsWithChildren<{}>

export const H1 = (props: PropType) => {
  const { children } = props

  return (
    <h1>
      <Text>{children}</Text>
      <DecorationWrapper>
        <Decoration />
      </DecorationWrapper>
    </h1>
  )
}

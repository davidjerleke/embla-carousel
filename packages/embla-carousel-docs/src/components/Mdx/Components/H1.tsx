import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { gradientBackgroundStyles } from 'utils/gradientBackgroundStyles'
import { SPACINGS } from 'consts/spacings'

const DECORATION_HEIGHT = SPACINGS.CUSTOM(({ ONE }) => ONE / 2)
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
  ${gradientBackgroundStyles};
  margin-top: ${SPACINGS.FOUR};
  height: ${DECORATION_HEIGHT};
  width: ${DECORATION_WIDTH};
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

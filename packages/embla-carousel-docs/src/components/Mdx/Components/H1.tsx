import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { gradientBackgroundStyles } from 'utils'

const Text = styled.span`
  display: block;
  width: 100%;
`

const Decoration = styled.span`
  ${gradientBackgroundStyles};
  display: inline-flex;
  margin-top: 2.4rem;
  height: 0.3rem;
  width: 5rem;
`

type PropType = PropsWithChildren<{}>

export const H1 = (props: PropType) => {
  const { children } = props

  return (
    <h1>
      <Text>{children}</Text>
      <Decoration />
    </h1>
  )
}

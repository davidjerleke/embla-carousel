import React from 'react'
import styled from 'styled-components'
import { PlainLink, PropType } from './PlainLink'
import { gradientTextStyles } from 'utils'

const Wrapper = styled(PlainLink)`
  ${gradientTextStyles};
  display: inline-block;
  font-weight: 500;
`

export const ContentLink = (props: PropType) => {
  return <Wrapper {...props} />
}

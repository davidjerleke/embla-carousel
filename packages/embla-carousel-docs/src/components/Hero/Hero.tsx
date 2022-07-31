import React from 'react'
import styled from 'styled-components'
import { Brand } from './Brand'
import { Usps } from './Usps'

const Wrapper = styled.div``

export const Hero = () => {
  return (
    <Wrapper>
      <Brand />
      <Usps />
    </Wrapper>
  )
}

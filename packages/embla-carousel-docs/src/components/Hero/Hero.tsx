import React from 'react'
import styled from 'styled-components'
import { HeroBrand } from './HeroBrand'
import { HeroUsps } from './HeroUsps'

const HeroWrapper = styled.div``

export const Hero = () => {
  return (
    <HeroWrapper>
      <HeroBrand />
      <HeroUsps />
    </HeroWrapper>
  )
}

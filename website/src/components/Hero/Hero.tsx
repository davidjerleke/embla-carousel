'use client'

import styled from 'styled-components'
import { HeroBrand } from './HeroBrand'
import { HeroUsps } from './HeroUsps'

const HeroWrapper = styled.div``

export function Hero() {
  return (
    <HeroWrapper>
      <HeroBrand />
      <HeroUsps />
    </HeroWrapper>
  )
}

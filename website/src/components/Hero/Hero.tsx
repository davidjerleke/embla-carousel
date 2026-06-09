'use client'

import styled from 'styled-components'
import { HeroBrand } from '@/components/Hero/HeroBrand'
import { HeroUsps } from '@/components/Hero/HeroUsps'

const HeroWrapper = styled.div``

export function Hero() {
  return (
    <HeroWrapper>
      <HeroBrand />
      <HeroUsps />
    </HeroWrapper>
  )
}

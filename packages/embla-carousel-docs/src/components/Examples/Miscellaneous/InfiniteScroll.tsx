import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselInfiniteScroll from 'components/Sandbox/React/SandboxFilesSrc/InfiniteScroll/EmblaCarousel'
import { examplesDefaultWrapperStyles } from 'components/Examples/examplesWrapperStyles'
import { examplesCarouselInfiniteScrollStyles } from 'components/Examples/examplesCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { SandboxStaticSettingsType } from 'consts/sandbox'

const ID = 'embla-carousel-infinite-scroll'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = {
  dragFree: true,
  containScroll: 'keepSnaps',
  watchSlides: false,
  watchResize: false
}
const STYLES = examplesCarouselInfiniteScrollStyles()

const SANDBOX_CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}

const SANDBOXES = sandboxStaticSandboxes(SANDBOX_CONFIG, 'InfiniteScroll')

const Wrapper = styled.div`
  ${examplesDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const InfiniteScroll = () => {
  const [inViewRef, inView] = useInView()

  return (
    <>
      <SandboxSelection sandboxes={SANDBOXES} />
      <Wrapper className={ID} ref={inViewRef}>
        {inView ? (
          <CarouselInfiniteScroll slides={SLIDES} options={OPTIONS} />
        ) : null}
      </Wrapper>
    </>
  )
}

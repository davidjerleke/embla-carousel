import React from 'react'
import { useInView } from 'react-intersection-observer'
import { Wrapper, Viewport } from './carouselWheelStyles'
import { CarouselWheelItem } from './CarouselWheelItem'

type PropType = {
  id: string
  loop?: boolean
}

const Carousel = (props: PropType) => {
  const { id, loop } = props

  return (
    <Viewport>
      <CarouselWheelItem
        slideCount={24}
        perspective="left"
        loop={loop}
        label="hours"
        id={`${id}-hour`}
      />
      <CarouselWheelItem
        slideCount={60}
        perspective="right"
        loop={loop}
        label="min"
        id={`${id}-minute`}
      />
    </Viewport>
  )
}

export const CarouselWheel = (props: PropType) => {
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <div ref={ref}>
      <Wrapper>{inView ? <Carousel {...props} /> : null}</Wrapper>
    </div>
  )
}

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({
    align: 'center',
    breakpoints: {
      '(min-width: 768px)': { align: 'start' }
    }
  })
}

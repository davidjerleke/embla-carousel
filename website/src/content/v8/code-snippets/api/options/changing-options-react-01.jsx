import React, { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export function EmblaCarousel() {
  const [options, setOptions] = useState({ loop: true })
  const [emblaRef] = useEmblaCarousel(options)

  const toggleLoop = () => {
    setOptions((currentOptions) => ({
      ...currentOptions,
      loop: !currentOptions.loop
    }))
  }

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">Slide 1</div>
          <div className="embla__slide">Slide 2</div>
          <div className="embla__slide">Slide 3</div>
        </div>
      </div>
    </div>
  )
}

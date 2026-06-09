// @ts-nocheck
import React, { useState } from 'react'
import { EmblaPluginType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export function EmblaCarousel() {
  const [plugins, setPlugins] = useState<EmblaPluginType[]>([Autoplay()])
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins)

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

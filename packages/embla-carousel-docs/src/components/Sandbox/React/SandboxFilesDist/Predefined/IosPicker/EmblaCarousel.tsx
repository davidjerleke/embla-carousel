import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { IosPickerItem } from './EmblaCarouselIosPickerItem'

type PropType = {
  options: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { loop } = props.options

  return (
    <div className="embla">
      <IosPickerItem
        slideCount={24}
        perspective="left"
        loop={loop}
        label="hours"
      />
      <IosPickerItem
        slideCount={60}
        perspective="right"
        loop={loop}
        label="min"
      />
    </div>
  )
}

export default EmblaCarousel

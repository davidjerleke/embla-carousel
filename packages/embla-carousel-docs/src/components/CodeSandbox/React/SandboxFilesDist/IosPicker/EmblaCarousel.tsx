import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import { IosPickerItem } from './EmblaCarouselIosPickerItem'
 
type PropType = {
  loop?: EmblaOptionsType['loop']
}
 
const EmblaCarousel: React.FC<PropType> = (props) => {
  const { loop } = props
 
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

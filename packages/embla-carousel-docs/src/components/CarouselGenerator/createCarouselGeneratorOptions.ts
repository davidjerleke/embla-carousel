import { CarouselGeneratorFormDataType } from 'consts/carouselGenerator'
import { EmblaOptionsType } from 'embla-carousel-react'

export const createCarouselGeneratorOptions = (
  settings: CarouselGeneratorFormDataType
): EmblaOptionsType => {
  const { axis, align, direction, containScroll, loop, dragFree } = settings

  return {
    ...(axis !== 'x' && { axis }),
    ...(align !== 'center' && { align }),
    ...(dragFree && { dragFree }),
    ...(direction !== 'ltr' && axis === 'x' && { direction }),
    ...(!loop && containScroll && { containScroll: 'trimSnaps' }),
    ...(loop && { loop })
  }
}

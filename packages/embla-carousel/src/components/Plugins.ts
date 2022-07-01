import { CreateOptionsType, LooseOptionsType } from './Options'
import { AutoHeightType } from 'embla-carousel-auto-height'
import { AutoplayType } from 'embla-carousel-autoplay'
import { ClassNamesType } from 'embla-carousel-class-names'
import { EmblaCarouselType } from './'

export type LoosePluginType = {
  [key: string]: unknown
}

export type CreatePluginType<
  TypeA extends LoosePluginType,
  TypeB extends LooseOptionsType,
> = TypeA & {
  name: string
  options: CreateOptionsType<TypeB>
  init: (embla: EmblaCarouselType) => void
  destroy: () => void
}

export type EmblaPluginType = AutoHeightType | AutoplayType | ClassNamesType

export type EmblaPluginsType = {
  autoHeight?: AutoHeightType
  autoplay?: AutoplayType
  classNames?: ClassNamesType
}

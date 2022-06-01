import { EmblaCarouselType } from './'
import { CreateOptionsType, LooseOptionsType } from './Options'

export type LoosePluginType = {
  [key: string]: unknown
}

export type CreatePluginType<
  TypeA extends LoosePluginType,
  TypeB extends LooseOptionsType,
> = TypeA & {
  name: string
  init: (embla: EmblaCarouselType) => void
  destroy: () => void
  options: CreateOptionsType<TypeB>
}

export type EmblaPluginType<
  TypeA extends LoosePluginType = LoosePluginType,
  TypeB extends LooseOptionsType = LooseOptionsType,
> = CreatePluginType<TypeA, TypeB>

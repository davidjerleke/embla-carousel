import { AlignmentOptionType } from './Alignment'
import { AxisOptionType } from './Axis'
import { SlidesToScrollOptionType } from './SlidesToScroll'
import { DirectionOptionType } from './Direction'
import { ScrollContainOptionType } from './ScrollContain'

export type LooseOptionsType = {
  [key: string]: unknown
}

export type CreateOptionsType<Type extends LooseOptionsType> = Type & {
  active: boolean
  breakpoints: {
    [key: string]: Omit<Partial<CreateOptionsType<Type>>, 'breakpoints'>
  }
}

export type OptionsType = CreateOptionsType<{
  align: AlignmentOptionType
  axis: AxisOptionType
  containScroll: ScrollContainOptionType
  direction: DirectionOptionType
  slidesToScroll: SlidesToScrollOptionType
  dragFree: boolean
  draggable: boolean
  inViewThreshold: number
  loop: boolean
  skipSnaps: boolean
  speed: number
  startIndex: number
}>

export const defaultOptions: OptionsType = {
  align: 'center',
  axis: 'x',
  containScroll: '',
  direction: 'ltr',
  slidesToScroll: 1,
  breakpoints: {},
  dragFree: false,
  draggable: true,
  inViewThreshold: 0,
  loop: false,
  skipSnaps: false,
  speed: 10,
  startIndex: 0,
  active: true,
}

export type EmblaOptionsType = Partial<OptionsType>

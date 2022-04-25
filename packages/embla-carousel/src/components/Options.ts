import { AlignmentOptionType } from './Alignment'
import { AxisOptionType } from './Axis'
import { SlidesToScrollOptionType } from './SlidesToScroll'
import { DirectionOptionType } from './Direction'
import { ScrollContainOptionType } from './ScrollContain'

export type OptionsType = {
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
}

export const defaultOptions: OptionsType = {
  align: 'center',
  axis: 'x',
  containScroll: '',
  direction: 'ltr',
  slidesToScroll: 1,
  dragFree: false,
  draggable: true,
  inViewThreshold: 0,
  loop: false,
  skipSnaps: false,
  speed: 10,
  startIndex: 0,
}

export type EmblaOptionsType = Partial<OptionsType>

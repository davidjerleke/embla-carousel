import { AlignmentOptionType } from './Alignment'
import { AxisOptionType } from './Axis'
import { DirectionOptionType } from './Direction'
import { ScrollContainOptionType } from './ScrollContain'

export type OptionsType = {
  align: AlignmentOptionType
  axis: AxisOptionType
  containScroll: ScrollContainOptionType
  direction: DirectionOptionType
  dragFree: boolean
  draggable: boolean
  inViewThreshold: number
  loop: boolean
  skipSnaps: boolean
  slidesToScroll: number
  speed: number
  startIndex: number
}

export const defaultOptions: OptionsType = {
  align: 'center',
  axis: 'x',
  containScroll: '',
  direction: 'ltr',
  dragFree: false,
  draggable: true,
  inViewThreshold: 0,
  loop: false,
  skipSnaps: false,
  slidesToScroll: 1,
  speed: 10,
  startIndex: 0,
}

export type EmblaOptionsType = Partial<OptionsType>

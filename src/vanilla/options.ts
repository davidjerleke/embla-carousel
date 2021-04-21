import { AlignmentOptionType } from './alignment'
import { AxisOptionType } from './axis'
import { DirectionOptionType } from './direction'
import { ScrollContainOptionType } from './scrollContain'

export type OptionsType = {
  align: AlignmentOptionType
  axis: AxisOptionType
  containScroll: ScrollContainOptionType
  direction: DirectionOptionType
  dragFree: boolean
  draggable: boolean
  draggableClass: string
  draggingClass: string
  inViewThreshold: number
  loop: boolean
  skipSnaps: boolean
  selectedClass: string
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
  draggableClass: 'is-draggable',
  draggingClass: 'is-dragging',
  inViewThreshold: 0,
  loop: false,
  skipSnaps: true,
  selectedClass: 'is-selected',
  slidesToScroll: 1,
  speed: 10,
  startIndex: 0,
}

export type EmblaOptionsType = Partial<OptionsType>

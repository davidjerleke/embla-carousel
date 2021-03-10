import { AlignmentOption } from './alignment'
import { AxisOption } from './axis'
import { DirectionOption } from './direction'
import { ScrollContainOption } from './scrollContain'

export type Options = {
  align: AlignmentOption
  axis: AxisOption
  containScroll: ScrollContainOption
  direction: DirectionOption
  dragFree: boolean
  draggable: boolean
  draggableClass: string
  draggingClass: string
  inViewThreshold: number
  loop: boolean
  selectedClass: string
  slidesToScroll: number
  speed: number
  startIndex: number
}

export const defaultOptions: Options = {
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
  selectedClass: 'is-selected',
  slidesToScroll: 1,
  speed: 10,
  startIndex: 0,
}

export type EmblaOptions = Partial<Options>

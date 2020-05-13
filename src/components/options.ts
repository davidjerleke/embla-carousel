import { AlignmentOption } from './alignment'
import { AxisOption } from './axis'
import { ScrollContainOption } from './scrollContain'

export type Options = {
  align: AlignmentOption
  axis: AxisOption
  containScroll: ScrollContainOption
  containerSelector: string
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

export const defaultOptions = Object.freeze<Options>({
  align: 'center',
  axis: 'x',
  containScroll: '',
  containerSelector: '*',
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
})

export type UserOptions = Partial<Options>

import { Alignments } from './alignment'

export type Options = {
  align: Alignments
  containScroll: boolean
  containerSelector: string
  dragFree: boolean
  draggable: boolean
  draggableClass: string
  draggingClass: string
  loop: boolean
  selectedClass: string
  slidesToScroll: number
  speed: number
  startIndex: number
}

export const defaultOptions = Object.freeze({
  align: 'center',
  containScroll: false,
  containerSelector: '*',
  dragFree: false,
  draggable: true,
  draggableClass: 'is-draggable',
  draggingClass: 'is-dragging',
  loop: false,
  selectedClass: 'is-selected',
  slidesToScroll: 1,
  speed: 10,
  startIndex: 0,
})

export type UserOptions = Partial<Options>

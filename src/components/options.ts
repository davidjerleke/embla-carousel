import { Alignments } from './alignSize'

export type Options = {
  align: Alignments
  containerSelector: string
  dragFree: boolean
  draggable: boolean
  draggableClass: string
  draggingClass: string
  groupSlides: number
  loop: boolean
  selectedClass: string
  speed: number
  startIndex: number
}

export const defaultOptions = Object.freeze({
  align: 'center',
  containerSelector: '*',
  dragFree: false,
  draggable: true,
  draggableClass: 'is-draggable',
  draggingClass: 'is-dragging',
  groupSlides: 1,
  loop: false,
  selectedClass: 'is-selected',
  speed: 10,
  startIndex: 0,
})

export type UserOptions = Partial<Options>

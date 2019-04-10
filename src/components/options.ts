export type Alignments = 'start' | 'center' | 'end'

export type Options = {
  align: Alignments
  containerSelector: string
  draggable: boolean
  draggableClass: string
  draggingClass: string
  loop: boolean
  selectedClass: string
  speed: number
  startIndex: number
}

export type UserOptions = {
  align?: Alignments
  containerSelector?: string
  draggable?: boolean
  draggableClass?: string
  draggingClass?: string
  loop?: boolean
  selectedClass?: string
  speed?: number
  startIndex?: number
}

export const defaultOptions = Object.freeze({
  align: 'center',
  containerSelector: '*',
  draggable: true,
  draggableClass: 'is-draggable',
  draggingClass: 'is-dragging',
  loop: false,
  selectedClass: 'is-selected',
  speed: 10,
  startIndex: 0,
})

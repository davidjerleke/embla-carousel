export type Alignments = 'start' | 'center' | 'end'

export interface Options {
  align: Alignments
  container: string
  draggable: boolean
  loop: boolean
  mass: number
  onInit(index: number): void
  onSelect(index: number): void
  speed: number
  startIndex: number
}

export interface UserOptions {
  align?: Alignments
  container?: string
  draggable?: boolean
  loop?: boolean
  mass?: number
  onInit?(index: number): void
  onSelect?(index: number): void
  speed?: number
  startIndex?: number
}

export const defaultOptions = Object.freeze({
  align: 'center',
  container: '*',
  draggable: true,
  loop: false,
  mass: 1.5,
  onInit: () => false,
  onSelect: () => false,
  speed: 10,
  startIndex: 0,
})

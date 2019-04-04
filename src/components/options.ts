export type Alignments = 'start' | 'center' | 'end'

export interface Options {
  align: Alignments
  container: string
  draggable: boolean
  loop: boolean
  speed: number
  startIndex: number
}

export interface UserOptions {
  align?: Alignments
  container?: string
  draggable?: boolean
  loop?: boolean
  speed?: number
  startIndex?: number
}

export const defaultOptions = Object.freeze({
  align: 'center',
  container: '*',
  draggable: true,
  loop: false,
  speed: 10,
  startIndex: 0,
})

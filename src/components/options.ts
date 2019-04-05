export type Alignments = 'start' | 'center' | 'end'

export type Options = {
  align: Alignments
  container: string
  draggable: boolean
  loop: boolean
  speed: number
  startIndex: number
}

export type UserOptions = {
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

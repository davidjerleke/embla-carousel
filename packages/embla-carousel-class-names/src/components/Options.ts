import { CreateOptionsType } from 'embla-carousel'

export type ClassNameOptionType = string | string[]

export type ClassNamesListType = {
  snapped: string[]
  inView: string[]
  draggable: string[]
  dragging: string[]
  loop: string[]
}

export type OptionsType = CreateOptionsType<{
  [Key in keyof ClassNamesListType]: ClassNameOptionType
}>

export const defaultOptions: OptionsType = {
  active: true,
  breakpoints: {},
  snapped: 'is-snapped',
  inView: 'is-in-view',
  draggable: 'is-draggable',
  dragging: 'is-dragging',
  loop: 'is-loop'
}

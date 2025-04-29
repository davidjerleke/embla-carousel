import { CreateOptionsType } from 'embla-carousel'

export type RootNodeType =
  | null
  | ((emblaRoot: HTMLElement) => HTMLElement | null)

export type OptionsType = CreateOptionsType<{
  direction: 'forward' | 'backward'
  speed: number
  startDelay: number
  defaultInteraction: boolean
  rootNode: RootNodeType
}>

export const defaultOptions: OptionsType = {
  direction: 'forward',
  speed: 2,
  startDelay: 1000,
  active: true,
  breakpoints: {},
  defaultInteraction: true,
  rootNode: null
}

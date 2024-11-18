import { CreateOptionsType } from 'embla-carousel'

export type RootNodeType =
  | null
  | ((emblaRoot: HTMLElement) => HTMLElement | null)

export type OptionsType = CreateOptionsType<{
  direction: 'forward' | 'backward'
  speed: number
  startDelay: number
  playOnInit: boolean
  stopOnFocusIn: boolean
  stopOnInteraction: boolean
  stopOnMouseEnter: boolean
  rootNode: RootNodeType
}>

export const defaultOptions: OptionsType = {
  direction: 'forward',
  speed: 2,
  startDelay: 1000,
  active: true,
  breakpoints: {},
  playOnInit: true,
  stopOnFocusIn: true,
  stopOnInteraction: true,
  stopOnMouseEnter: false,
  rootNode: null
}

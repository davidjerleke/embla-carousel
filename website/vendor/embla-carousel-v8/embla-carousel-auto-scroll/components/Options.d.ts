import { CreateOptionsType } from '@vendor/embla-carousel-v8/embla-carousel'
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
export declare const defaultOptions: OptionsType

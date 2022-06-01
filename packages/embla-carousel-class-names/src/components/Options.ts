import { CreateOptionsType } from 'embla-carousel/components/Options'

export type OptionsType = CreateOptionsType<{
  selected: string
  draggable: string
  dragging: string
}>

export const defaultOptions: OptionsType = {
  active: true,
  breakpoints: {},
  selected: 'is-selected',
  draggable: 'is-draggable',
  dragging: 'is-dragging',
}

export type ClassNamesOptionsType = Partial<OptionsType>

import { CreateOptionsType } from 'embla-carousel/components/Options'

export type OptionsType = CreateOptionsType<{
  snapped: string
  inView: string
  draggable: string
  dragging: string
}>

export const defaultOptions: OptionsType = {
  active: true,
  breakpoints: {},
  snapped: 'is-snapped',
  inView: 'is-in-view',
  draggable: 'is-draggable',
  dragging: 'is-dragging'
}

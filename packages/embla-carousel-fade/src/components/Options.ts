import { CreateOptionsType } from 'embla-carousel'

export type OptionsType = CreateOptionsType<{}>

export const defaultOptions: OptionsType = {
  active: true,
  breakpoints: {}
}

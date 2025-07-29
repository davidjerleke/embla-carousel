import { CreateOptionsType } from 'embla-carousel'

export type OptionsType = CreateOptionsType<{
  heightEvent: 'select' | 'slidesinview'
}>

export const defaultOptions: OptionsType = {
  active: true,
  breakpoints: {},
  heightEvent: 'select'
}

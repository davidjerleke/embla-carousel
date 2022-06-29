import { CreateOptionsType } from 'embla-carousel/components/Options'

export type OptionsType = CreateOptionsType<{
  destroyHeight: CSSStyleDeclaration['height']
}>

export const defaultOptions: OptionsType = {
  active: true,
  breakpoints: {},
  destroyHeight: 'auto',
}

export type AutoHeightOptionsType = Partial<OptionsType>

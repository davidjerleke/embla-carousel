export type OptionsType = {
  destroyHeight: CSSStyleDeclaration['height']
}

export const defaultOptions: OptionsType = {
  destroyHeight: 'auto',
}

export type AutoHeightOptionsType = Partial<OptionsType>

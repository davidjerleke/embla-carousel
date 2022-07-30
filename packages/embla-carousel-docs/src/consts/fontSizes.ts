import { sizeWithUnit } from './unit'

type FontSizeCustomType = (fontSizes: typeof FONT_SIZE_VALUES) => number

const FONT_SIZE_VALUES = {}

export const FONT_SIZES = {
  //   H1: sizeWithUnit(FONT_SIZE_VALUES.H1),
  CUSTOM: (callback: FontSizeCustomType): string =>
    sizeWithUnit(callback(FONT_SIZE_VALUES)),
}

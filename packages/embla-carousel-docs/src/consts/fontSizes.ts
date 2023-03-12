import { sizeWithUnit } from './unit'

type FontSizeCustomType = (fontSizes: typeof FONT_SIZE_VALUES) => number

const FONT_SIZE_VALUES = {
  H1: 3.2,
  H2: 2.5,
  H3: 2.15,
  H4: 1.8,
  BODY: 1.6,
  COMPLEMENTARY: 1.4,
  DETAIL: 1.2,
}

export const FONT_SIZES = {
  H1: sizeWithUnit(FONT_SIZE_VALUES.H1),
  H2: sizeWithUnit(FONT_SIZE_VALUES.H2),
  H3: sizeWithUnit(FONT_SIZE_VALUES.H3),
  H4: sizeWithUnit(FONT_SIZE_VALUES.H4),
  BODY: sizeWithUnit(FONT_SIZE_VALUES.BODY),
  COMPLEMENTARY: sizeWithUnit(FONT_SIZE_VALUES.COMPLEMENTARY),
  DETAIL: sizeWithUnit(FONT_SIZE_VALUES.DETAIL),
  CUSTOM: (callback: FontSizeCustomType): string =>
    sizeWithUnit(callback(FONT_SIZE_VALUES)),
}

// https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#common_weight_name_mapping
export const FONT_WEIGHTS = {
  NORMAL: '400',
  MEDIUM: '500',
  SEMI_BOLD: '600',
  BOLD: '700',
  EXTRA_BOLD: '800',
  BLACK: '900',
}

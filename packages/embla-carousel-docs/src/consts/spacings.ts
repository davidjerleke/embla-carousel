import { sizeWithUnit } from 'consts/unit'

type SpacingCustomType = (spacings: typeof SPACING_VALUES) => number

const SPACING_VALUES = {
  ONE: 0.6,
  TWO: 1.2,
  THREE: 1.8,
  FOUR: 2.4,
  FIVE: 3,
  SIX: 3.6,
  SEVEN: 4.2,
  EIGHT: 4.8,
  NINE: 5.4,
  TEN: 6,
  ELEVEN: 6.6,
  TWELVE: 7.2,
  THIRTEEN: 7.8,
  FOURTEEN: 8.4,
  FIFTEEN: 9,
  SIXTEEN: 9.6
}

export const SPACINGS = {
  ONE: sizeWithUnit(SPACING_VALUES.ONE),
  TWO: sizeWithUnit(SPACING_VALUES.TWO),
  THREE: sizeWithUnit(SPACING_VALUES.THREE),
  FOUR: sizeWithUnit(SPACING_VALUES.FOUR),
  FIVE: sizeWithUnit(SPACING_VALUES.FIVE),
  SIX: sizeWithUnit(SPACING_VALUES.SIX),
  SEVEN: sizeWithUnit(SPACING_VALUES.SEVEN),
  EIGHT: sizeWithUnit(SPACING_VALUES.EIGHT),
  NINE: sizeWithUnit(SPACING_VALUES.NINE),
  TEN: sizeWithUnit(SPACING_VALUES.TEN),
  ELEVEN: sizeWithUnit(SPACING_VALUES.ELEVEN),
  TWELVE: sizeWithUnit(SPACING_VALUES.TWELVE),
  THIRTEEN: sizeWithUnit(SPACING_VALUES.THIRTEEN),
  FOURTEEN: sizeWithUnit(SPACING_VALUES.FOURTEEN),
  FIFTEEN: sizeWithUnit(SPACING_VALUES.FIFTEEN),
  SIXTEEN: sizeWithUnit(SPACING_VALUES.SIXTEEN),
  CUSTOM: (callback: SpacingCustomType): string =>
    sizeWithUnit(callback(SPACING_VALUES))
}

type SpacingCustomType = (spacings: typeof SPACING_VALUES) => number

const spacingWithUnit = (spacing: number): string => spacing + 'rem'

const spacingRounded = (spacing: number): number =>
  Math.round((spacing + Number.EPSILON) * 10000) / 10000

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
  SIXTEEN: 9.6,
}

export const SPACINGS = {
  ONE: spacingWithUnit(SPACING_VALUES.ONE),
  TWO: spacingWithUnit(SPACING_VALUES.TWO),
  THREE: spacingWithUnit(SPACING_VALUES.THREE),
  FOUR: spacingWithUnit(SPACING_VALUES.FOUR),
  FIVE: spacingWithUnit(SPACING_VALUES.FIVE),
  SIX: spacingWithUnit(SPACING_VALUES.SIX),
  SEVEN: spacingWithUnit(SPACING_VALUES.SEVEN),
  EIGHT: spacingWithUnit(SPACING_VALUES.EIGHT),
  NINE: spacingWithUnit(SPACING_VALUES.NINE),
  TEN: spacingWithUnit(SPACING_VALUES.TEN),
  ELEVEN: spacingWithUnit(SPACING_VALUES.ELEVEN),
  TWELVE: spacingWithUnit(SPACING_VALUES.TWELVE),
  THIRTEEN: spacingWithUnit(SPACING_VALUES.THIRTEEN),
  FOURTEEN: spacingWithUnit(SPACING_VALUES.FOURTEEN),
  FIFTEEN: spacingWithUnit(SPACING_VALUES.FIFTEEN),
  SIXTEEN: spacingWithUnit(SPACING_VALUES.SIXTEEN),
  CUSTOM: (callback: SpacingCustomType): string =>
    spacingWithUnit(spacingRounded(callback(SPACING_VALUES))),
}

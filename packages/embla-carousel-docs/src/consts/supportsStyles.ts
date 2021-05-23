const createSupportsCondition = (...features: string[]): string =>
  `@supports ${features.map((feature) => `(${feature})`).join(' and ')}`

const objectFitCover = createSupportsCondition('object-fit: cover')
const gradientText = createSupportsCondition(
  '-webkit-background-clip: text',
  '-webkit-text-fill-color: transparent',
)

export const supportsStyles = {
  objectFitCover,
  gradientText,
}

export const snakeCaseToKebabCase = (string: string = ''): string =>
  string.replace(/_/g, '-').toLowerCase()

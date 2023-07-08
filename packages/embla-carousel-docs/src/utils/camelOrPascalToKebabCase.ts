export const camelOrPascalToKebabCase = (
  string: string = '',
  separator: string = ''
): string => {
  return string
    .split('')
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter
    })
    .join(separator)
}

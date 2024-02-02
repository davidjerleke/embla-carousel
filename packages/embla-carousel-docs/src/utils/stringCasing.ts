export const snakeCaseToKebabCase = (string: string = ''): string =>
  string.replace(/_/g, '-').toLowerCase()

export const kebabCaseToPascalCase = (
  string: string = '',
  separator: string = ''
): string => {
  return string.replace(/(^\w|-\w)/g, (replaceString) =>
    replaceString.replace(/-/, separator).toUpperCase()
  )
}

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

export const capitalizeFirstLetter = (string: string): string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`

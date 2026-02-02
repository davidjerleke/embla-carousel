/* UTILS */
export function snakeCaseToKebabCase(string: string = ''): string {
  return string.replace(/_/g, '-').toLowerCase()
}

export function kebabCaseToPascalCase(
  string: string = '',
  separator: string = ''
): string {
  return string.replace(/(^\w|-\w)/g, (replaceString) =>
    replaceString.replace(/-/, separator).toUpperCase()
  )
}

export function camelOrPascalToKebabCase(
  string: string = '',
  separator: string = ''
): string {
  return string
    .split('')
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter
    })
    .join(separator)
}

export function capitalizeFirstLetter(string: string): string {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
}

export const kebabCaseToPascalCase = (
  string: string = '',
  separator: string = '',
): string => {
  return string.replace(/(^\w|-\w)/g, (replaceString) =>
    replaceString.replace(/-/, separator).toUpperCase(),
  )
}

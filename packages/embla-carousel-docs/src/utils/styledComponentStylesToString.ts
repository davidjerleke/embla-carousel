import { FlattenSimpleInterpolation } from 'styled-components'

export const styledComponentsStylesToString = (
  ...stylesList: FlattenSimpleInterpolation[]
): string => {
  return stylesList.reduce(
    (allStyles, styles) => allStyles + styles.join(''),
    '',
  )
}

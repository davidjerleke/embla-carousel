import { FlattenSimpleInterpolation } from 'styled-components'

export const styledComponentsStylesToString = (
  ...stylesList: FlattenSimpleInterpolation[]
) => {
  return stylesList.reduce(
    (allStyles, styles) => allStyles + styles.join(''),
    '',
  )
}

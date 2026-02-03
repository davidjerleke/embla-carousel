import { RuleSet } from 'styled-components'

export function styledComponentsStylesToString(
  ...stylesList: RuleSet<object>[]
): string {
  return stylesList.reduce(
    (allStyles, styles) => allStyles + styles.join(''),
    ''
  )
}

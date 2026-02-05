import { RuleSet } from 'styled-components'

/* UTILS */
export function styledComponentsStylesToString(
  ...stylesList: RuleSet[]
): string {
  return stylesList.reduce(
    (allStyles, styles) => allStyles + styles.join(''),
    ''
  )
}

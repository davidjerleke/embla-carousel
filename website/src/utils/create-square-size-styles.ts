import { css, RuleSet } from 'styled-components'

/* UTILS */
export function createSquareSizeStyles(size: string): RuleSet<object> {
  return css`
    width: ${size};
    height: ${size};
  `
}

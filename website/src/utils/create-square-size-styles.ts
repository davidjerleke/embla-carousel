import { css, RuleSet } from 'styled-components'

/* UTILS */
export function createSquareSizeStyles(size: string): RuleSet {
  return css`
    width: ${size};
    height: ${size};
  `
}

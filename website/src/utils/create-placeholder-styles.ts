import { css, RuleSet } from 'styled-components'

/* UTILS */
export function createPlaceholderStyles(color: string): RuleSet {
  return css`
    ::-webkit-input-placeholder {
      color: ${color};
    }
    :-moz-placeholder {
      color: ${color};
      opacity: 1;
    }
    ::-moz-placeholder {
      color: ${color};
      opacity: 1;
    }
    :-ms-input-placeholder {
      color: ${color};
    }
    ::-ms-input-placeholder {
      color: ${color};
    }
    ::placeholder {
      color: ${color};
    }
  `
}

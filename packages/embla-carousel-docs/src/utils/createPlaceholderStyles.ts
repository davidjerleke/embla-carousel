import { css, FlattenSimpleInterpolation } from 'styled-components'

export const createPlaceholderStyles = (
  color: string
): FlattenSimpleInterpolation => css`
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

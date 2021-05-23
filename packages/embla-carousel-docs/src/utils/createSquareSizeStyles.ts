import { css, FlattenSimpleInterpolation } from 'styled-components'

export const createSquareSizeStyles = (
  size: string,
): FlattenSimpleInterpolation => css`
  width: ${size};
  height: ${size};
`

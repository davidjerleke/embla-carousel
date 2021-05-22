import { css, FlattenSimpleInterpolation } from 'styled-components'

export const createTruncateStyles = (
  maxWidth: string = '100%',
): FlattenSimpleInterpolation => css`
  max-width: ${maxWidth};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

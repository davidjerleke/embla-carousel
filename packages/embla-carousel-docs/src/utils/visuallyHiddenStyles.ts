import { css } from 'styled-components'

export const visuallyHiddenStyles = css`
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute;
`

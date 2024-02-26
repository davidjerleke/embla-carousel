import { FlattenSimpleInterpolation, css } from 'styled-components'

type ButtonSizesType = {
  [key: string]: FlattenSimpleInterpolation
}

export const BUTTON_SIZES: ButtonSizesType = {
  MD: css`
    padding-left: 2.6rem;
    padding-right: 2.6rem;
    min-height: 4.26rem;
    border-radius: 3rem;
  `
}

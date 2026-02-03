import { RuleSet, css } from 'styled-components'

/* CONSTS */
type ButtonSizesType = {
  [key: string]: RuleSet<object>
}

export const BUTTON_SIZES: ButtonSizesType = {
  MD: css`
    padding-left: 2.6rem;
    padding-right: 2.6rem;
    min-height: 4.26rem;
    border-radius: 3rem;
  `
}

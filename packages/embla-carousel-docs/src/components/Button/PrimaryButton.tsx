import styled, { css } from 'styled-components'
import { PlainButton } from './PlainButton'
import { supportsStyles } from 'consts'
import { gradientBackgroundStyles } from 'utils'

export const primaryButtonStyles = css`
  line-height: 1.15;
  border-radius: 3rem;
  padding: 1.4rem 2.8rem;
  font-weight: bold;
  display: inline-flex;
  color: var(--background-site);
  background-color: var(--brand-primary);
  ${supportsStyles.gradientText} {
    ${gradientBackgroundStyles};
  }
`

export const PrimaryButton = styled(PlainButton)`
  ${primaryButtonStyles};
`

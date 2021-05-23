import styled, { css } from 'styled-components'
import { PlainButton } from './PlainButton'
import { supportsStyles } from 'consts'

export const ctaButtonStyles = css`
  line-height: 1.15;
  border-radius: 3rem;
  padding: 1.7rem 3.5rem;
  font-weight: bold;
  display: inline-flex;
  color: var(--background-site);
  background-color: var(--brand-primary);
  ${supportsStyles.gradientText} {
    background-image: linear-gradient(
      45deg,
      var(--brand-primary),
      var(--brand-secondary)
    );
  }
`

export const CtaButton = styled(PlainButton)`
  ${ctaButtonStyles};
`

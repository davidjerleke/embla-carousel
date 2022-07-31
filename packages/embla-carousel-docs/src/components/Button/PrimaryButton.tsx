import styled, { css } from 'styled-components'
import { PlainButton } from './PlainButton'
import { COLORS, SPACINGS, supportsStyles } from 'consts'
import { gradientBackgroundStyles } from 'utils'

export const primaryButtonStyles = css`
  line-height: 1.15;
  border-radius: 3rem;
  padding: ${SPACINGS.CUSTOM(({ TWO }) => TWO + 0.2)}
    ${SPACINGS.CUSTOM(({ FOUR }) => FOUR + 0.2)};
  font-weight: bold;
  display: inline-flex;
  color: ${COLORS.BACKGROUND_SITE};
  background-color: ${COLORS.BRAND_PRIMARY};
  ${supportsStyles.gradientText} {
    ${gradientBackgroundStyles};
  }
`

export const PrimaryButton = styled(PlainButton)`
  ${primaryButtonStyles};
`

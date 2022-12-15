import React from 'react'
import styled, { css } from 'styled-components'
import { BareButton } from './BareButton'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { gradientBackgroundStyles } from 'utils/gradientBackgroundStyles'
import { PropType } from './BareButton'

export const primaryButtonFilledStyles = css`
  ${gradientBackgroundStyles};
  color: ${COLORS.BACKGROUND_SITE};
  padding: ${SPACINGS.CUSTOM(({ TWO }) => TWO + 0.2)}
    ${SPACINGS.CUSTOM(({ FOUR }) => FOUR + 0.2)};
  line-height: 1.15;
  border-radius: 3rem;
  font-weight: bold;
  display: inline-flex;
`

const Wrapper = styled(BareButton)`
  ${primaryButtonFilledStyles};

  &:disabled {
    background-image: none;
    background-color: ${COLORS.DETAIL_HIGH_CONTRAST};
  }
`

export const PrimaryButtonFilled = (props: PropType) => {
  const { children, ...restProps } = props

  return (
    <Wrapper {...restProps}>
      <span>{children}</span>
    </Wrapper>
  )
}

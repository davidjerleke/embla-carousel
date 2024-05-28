import styled, { css } from 'styled-components'
import { ButtonBare, buttonBareStyles } from 'components/Button/ButtonBare'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { Icon } from 'components/Icon/Icon'
import { SPACINGS } from 'consts/spacings'
import { COLORS } from 'consts/themes'

export const searchButtonStyles = css`
  ${createSquareSizeStyles('4rem')};
  ${buttonBareStyles};
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.15)};
  margin-left: -${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.15)};
`

export const SearchButton = styled(ButtonBare)`
  ${searchButtonStyles};
`

export const searchButtonIconStyles = css`
  ${createSquareSizeStyles('2.35rem')};
  color: ${COLORS.TEXT_HIGH_CONTRAST};
  stroke-width: 0.2rem;
  display: flex;
`

export const SearchButtonIcon = styled(Icon)`
  ${searchButtonIconStyles};
`

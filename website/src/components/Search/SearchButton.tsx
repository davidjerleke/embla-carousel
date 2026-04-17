import styled, { css } from 'styled-components'
import { type KeyNavigatingPropType } from '@/utils/key-events'
import { ButtonBare, buttonBareStyles } from '@/components/Button/ButtonBare'
import { createSquareSizeStyles } from '@/utils/create-square-size-styles'
import { Icon } from '@/components/Icon/Icon'
import { SPACINGS } from '@/utils/spacings'
import { COLORS } from '@/utils/theme'
import { MEDIA } from '@/utils/breakpoints'

export const searchButtonStyles = css<KeyNavigatingPropType>`
  ${createSquareSizeStyles('4rem')};
  ${buttonBareStyles};
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.15)};
  margin-left: -${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.15)};

  ${MEDIA.DESKTOP} {
    ${createSquareSizeStyles('3rem')};
  }
`

export const SearchButton = styled(ButtonBare)<KeyNavigatingPropType>`
  ${searchButtonStyles};
`

export const searchButtonIconStyles = css`
  ${createSquareSizeStyles('2.35rem')};
  color: ${COLORS.TEXT_HIGH_CONTRAST};
  stroke-width: 0.2rem;
  display: flex;

  ${MEDIA.DESKTOP} {
    ${createSquareSizeStyles('1.8rem')};
  }
`

export const SearchButtonIcon = styled(Icon)`
  ${searchButtonIconStyles};
`

import React from 'react'
import styled from 'styled-components'
import { ctaButtonStyles, PlainButton } from 'components/Button'
import { CrossIcon } from 'assets/icons'
import { createSquareSizeStyles } from 'utils'
import { useNavigation } from 'hooks'

const BUTTON_SIZE = '4rem'
const BACKGROUND_SIZE = '3rem'

const Wrapper = styled(PlainButton)`
  ${createSquareSizeStyles(BUTTON_SIZE)};
  color: var(--text-high-contrast);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: calc((${BUTTON_SIZE} - ${BACKGROUND_SIZE}) / 2 * -1);
  margin-right: calc((${BUTTON_SIZE} - ${BACKGROUND_SIZE}) / 2 * -1);
`

const Background = styled.div`
  ${createSquareSizeStyles(BACKGROUND_SIZE)};
  ${ctaButtonStyles};
  padding: 0;
`

export const CrossSvg = styled(CrossIcon)`
  ${createSquareSizeStyles('2rem')};
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`

export const NavigationClose = () => {
  const { closeNavigation } = useNavigation()

  return (
    <Wrapper
      type="button"
      onClick={closeNavigation}
      aria-label="Close Main Navigation Menu"
    >
      <Background>
        <CrossSvg aria-hidden="true" focusable="false" />
      </Background>
    </Wrapper>
  )
}

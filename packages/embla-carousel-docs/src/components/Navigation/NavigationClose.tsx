import React from 'react'
import styled from 'styled-components'
import { primaryButtonStyles, PlainButton } from 'components/Button'
import { createSquareSizeStyles } from 'utils'
import { useNavigation } from 'hooks'
import { Icon } from 'components/Icon'

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
  ${primaryButtonStyles};
  padding: 0;
`

const CloseSvg = styled(Icon)`
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
        <CloseSvg svg="cross" size="2rem" />
      </Background>
    </Wrapper>
  )
}

import React from 'react'
import styled, { css } from 'styled-components'
import { PlainButton } from 'components/Button'
import { createSquareSizeStyles } from 'utils'
import { LAYERS, THEME_KEYS } from 'consts'
import { Icon } from 'components/Icon'
import { useTheme } from 'hooks'

const BUTTON_SIZE = '4rem'
const ICON_SIZE = '2.5rem'

const Wrapper = styled(PlainButton)`
  ${createSquareSizeStyles(BUTTON_SIZE)};
  z-index: ${LAYERS.STEP};
  color: var(--text-high-contrast);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: calc((${BUTTON_SIZE} - ${ICON_SIZE}) / 2 * -1);
  margin-left: calc((${BUTTON_SIZE} - ${ICON_SIZE}) / 2 * -1);
`

const svgStyles = css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`

export const LightThemeSvg = styled(Icon)`
  ${svgStyles};
`

export const DarkThemeSvg = styled(Icon)`
  ${svgStyles};
`

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isLightTheme = theme === THEME_KEYS.LIGHT
  const oppositeTheme = isLightTheme ? THEME_KEYS.DARK : THEME_KEYS.LIGHT

  return (
    <Wrapper
      type="button"
      onClick={toggleTheme}
      aria-label={`Activate ${oppositeTheme} theme`}
    >
      <DarkThemeSvg svg="moon" size={ICON_SIZE} />
      <LightThemeSvg svg="sun" size={ICON_SIZE} />
    </Wrapper>
  )
}

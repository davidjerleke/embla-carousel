import React, { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'
import { ButtonBare } from 'components/Button/ButtonBare'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { COLORS } from 'consts/themes'
import { LAYERS } from 'consts/layers'
import { THEME_KEYS } from 'consts/themes'
import { Icon } from 'components/Icon/Icon'
import { useTheme } from 'hooks/useTheme'

const BUTTON_SIZE = '4rem'
const ICON_SIZE = '2.5rem'

const ThemeToggleWrapper = styled(ButtonBare)`
  ${createSquareSizeStyles(BUTTON_SIZE)};
  z-index: ${LAYERS.STEP};
  color: ${COLORS.TEXT_HIGH_CONTRAST};
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

type PropType = PropsWithChildren<{}>

export const ThemeToggle = (props: PropType) => {
  const { children, ...restProps } = props
  const { theme, toggleTheme } = useTheme()
  const isLightTheme = theme === THEME_KEYS.LIGHT
  const oppositeTheme = isLightTheme ? THEME_KEYS.DARK : THEME_KEYS.LIGHT

  return (
    <ThemeToggleWrapper
      type="button"
      onClick={toggleTheme}
      aria-label={`Activate ${oppositeTheme} theme`}
      {...restProps}
    >
      {children}
      <DarkThemeSvg svg="moon" size={ICON_SIZE} />
      <LightThemeSvg svg="sun" size={ICON_SIZE} />
    </ThemeToggleWrapper>
  )
}

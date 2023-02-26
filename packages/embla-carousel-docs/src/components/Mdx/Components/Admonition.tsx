import React, { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'
import { COLORS, THEME_KEYS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { Icon } from 'components/Icon/Icon'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { IconType } from 'assets/icons'
import { useTheme } from 'hooks/useTheme'

type AdmonitionType = 'note' | 'warning' | 'danger'

type AdmonitionSettingType = {
  [key in AdmonitionType]: {
    color: string
    colorRgbValue: string
    icon: IconType
  }
}

const admonitions: AdmonitionSettingType = {
  note: {
    color: COLORS.ADMONITION_NOTE,
    colorRgbValue: COLORS.ADMONITION_NOTE_RGB_VALUE,
    icon: 'info',
  },
  warning: {
    color: COLORS.ADMONITION_WARNING,
    colorRgbValue: COLORS.ADMONITION_WARNING_RGB_VALUE,
    icon: 'warning',
  },
  danger: {
    color: COLORS.ADMONITION_DANGER,
    colorRgbValue: COLORS.ADMONITION_DANGER_RGB_VALUE,
    icon: 'danger',
  },
}

export const AdmonitionWrapper = styled.div<{
  $admonition: AdmonitionSettingType['note']
  $opacity: number
}>`
  display: flex;
  padding: ${SPACINGS.TWO};
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  position: relative;

  ${({ $admonition, $opacity }) => css`
    border-left: 0.4rem solid ${$admonition.color};
    background-color: rgba(${$admonition.colorRgbValue}, ${$opacity});
  `};
`

const Svg = styled(Icon)`
  ${createSquareSizeStyles(SPACINGS.THREE)};
  margin-top: ${SPACINGS.CUSTOM(() => 0.35)};
  flex: 0 0 auto;
`

export const AdmonitionContent = styled.div`
  padding-left: ${SPACINGS.TWO};
  flex: 1;
  min-width: 0;
`

type PropType = PropsWithChildren<{
  type?: AdmonitionType
}>

export const Admonition = (props: PropType) => {
  const { children, type = 'note' } = props
  const admonition = admonitions[type]
  const opacity = useTheme().theme === THEME_KEYS.LIGHT ? 0.07 : 0.1

  return (
    <AdmonitionWrapper $admonition={admonition} $opacity={opacity}>
      <Svg svg={admonition.icon} color={admonition.color} />
      <AdmonitionContent>{children}</AdmonitionContent>
    </AdmonitionWrapper>
  )
}

'use client'

import { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'
import { useAppSelector } from '@/hooks/redux'
import { selectTheme } from '@/components/Theme/theme-reducer'
import { COLORS, THEME_KEYS } from '@/utils/theme'
import { SPACINGS } from '@/utils/spacings'
import { BORDER_RADIUSES, BORDER_SIZES } from '@/utils/border'
import { IconType } from '@/assets/icons'
import { IconWithText, IconWithTextIcon } from '@/components/Icon/IconWithText'

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
    icon: 'info'
  },
  warning: {
    color: COLORS.ADMONITION_WARNING,
    colorRgbValue: COLORS.ADMONITION_WARNING_RGB_VALUE,
    icon: 'warning'
  },
  danger: {
    color: COLORS.ADMONITION_DANGER,
    colorRgbValue: COLORS.ADMONITION_DANGER_RGB_VALUE,
    icon: 'danger'
  }
}

export const AdmonitionWrapper = styled.div<{
  $admonition: AdmonitionSettingType['note']
  $opacity: number
  $color: string
}>`
  display: flex;
  padding: ${SPACINGS.THREE};
  border-radius: ${BORDER_RADIUSES.CARD};
  position: relative;

  ${({ $admonition, $opacity }) => css`
    border: ${BORDER_SIZES.DETAIL} solid ${$admonition.color};
    background-color: rgba(${$admonition.colorRgbValue}, ${$opacity});
  `};

  ${IconWithTextIcon} {
    color: ${({ $color }) => $color};
  }
`

export const AdmonitionContent = styled.div`
  flex: 1;
  min-width: 0;
`

type PropType = PropsWithChildren<{
  type?: AdmonitionType
}>

export function Admonition(props: PropType) {
  const { children, type = 'note' } = props
  const admonition = admonitions[type]
  const theme = useAppSelector(selectTheme)
  const opacity = theme === THEME_KEYS.LIGHT ? 0.05 : 0.07

  return (
    <AdmonitionWrapper
      $admonition={admonition}
      $opacity={opacity}
      $color={admonition.color}
    >
      <AdmonitionContent>
        <IconWithText
          iconSvg={admonition.icon}
          iconSize={SPACINGS.THREE}
          spacing={SPACINGS.TWO}
        >
          {children}
        </IconWithText>
      </AdmonitionContent>
    </AdmonitionWrapper>
  )
}

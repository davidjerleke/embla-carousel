import React from 'react'
import styled from 'styled-components'
import { Icon } from 'components/Icon/Icon'
import { InputRadioCard } from 'components/Input/InputRadio'
import { FONT_SIZES, FONT_WEIGHTS } from 'consts/fontSizes'
import { SPACINGS } from 'consts/spacings'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { PropType as RadioOrCheckboxPropType } from 'components/Input/createRadioOrCheckboxDefault'
import { SandboxLabelKeyType } from 'consts/sandbox'
import { IconType } from 'assets/icons'

const ICONS_BY_LABEL: {
  [key in SandboxLabelKeyType]: Extract<
    IconType,
    'javascript' | 'typescript' | 'react'
  >
} = {
  VANILLA_JS: 'javascript',
  VANILLA_TS: 'typescript',
  REACT_JS: 'react',
  REACT_TS: 'react'
}

const RadioLabelContent = styled.span`
  display: flex;
  flex-direction: column;
  padding: ${SPACINGS.TWO};
  line-height: 1;
  text-align: center;
  align-items: center;
  font-size: ${FONT_SIZES.DETAIL};
  font-weight: ${FONT_WEIGHTS.MEDIUM};
`

const RadioLabelSvg = styled(Icon)`
  ${createSquareSizeStyles('3rem')};
  margin-bottom: ${SPACINGS.TWO};
`

type PropType = RadioOrCheckboxPropType & {
  framework: SandboxLabelKeyType
}

export const SandboxSelectionInput = (props: PropType) => {
  const { children, framework, ...restProps } = props

  return (
    <InputRadioCard {...restProps}>
      <RadioLabelContent>
        <RadioLabelSvg svg={ICONS_BY_LABEL[framework]} />
        {children}
      </RadioLabelContent>
    </InputRadioCard>
  )
}

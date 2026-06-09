import styled from 'styled-components'
import { Icon } from '@/components/Icon/Icon'
import { InputRadioCard } from '@/components/Input/InputRadio'
import { FONT_SIZES, FONT_WEIGHTS } from '@/utils/font-sizes'
import { SPACINGS } from '@/utils/spacings'
import { createSquareSizeStyles } from '@/utils/create-square-size-styles'
import { PropType as RadioOrCheckboxPropType } from '@/components/Input/CreateRadioOrCheckboxDefault'
import { SandboxLabelKeyType } from '@/content/v9/sandboxes/sandbox-utils'
import { IconType } from '@/assets/icons'

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

export function SandboxSelectionInput(props: PropType) {
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

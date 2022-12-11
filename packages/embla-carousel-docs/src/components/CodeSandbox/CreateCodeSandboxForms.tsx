import React from 'react'
import styled from 'styled-components'
import { IconWithText } from 'components/Icon/IconWithText'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { FONT_SIZES } from 'consts/fontSizes'
import {
  CreateCodeSandboxForm,
  FORM_HEIGHT,
  PropType as CreateCodeSandboxFormPropType,
} from './CreateCodeSandboxForm'

const Wrapper = styled.div`
  display: flex;
  margin-top: -${SPACINGS.THREE};
  font-size: ${FONT_SIZES.DETAIL};
  margin-bottom: ${SPACINGS.TWO};
`

const Label = styled.div`
  color: ${COLORS.TEXT_LOW_CONTRAST};
  height: ${FORM_HEIGHT};
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`

const FormsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 0 0;
`

const FormWrapper = styled.div`
  padding-left: ${SPACINGS.TWO};
`

export type PropType = {
  sandboxes: CreateCodeSandboxFormPropType[]
}

export const CreateCodeSandboxForms = (props: PropType) => {
  const { sandboxes = [] } = props

  return (
    <Wrapper>
      <Label>
        <IconWithText iconSvg="pen" iconSize="1.2rem">
          Edit code:
        </IconWithText>
      </Label>
      <FormsWrapper>
        {sandboxes.map((sandboxes, index) => (
          <FormWrapper key={index}>
            <CreateCodeSandboxForm
              createSandbox={sandboxes.createSandbox}
              label={sandboxes.label}
            />
          </FormWrapper>
        ))}
      </FormsWrapper>
    </Wrapper>
  )
}

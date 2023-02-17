import React, { useCallback, useState } from 'react'
import styled, { css } from 'styled-components'
import { SPACINGS } from 'consts/spacings'
import { URLS } from 'consts/urls'
import { useEffect } from 'react'
import { LoadSpinner } from 'components/LoadSpinner/LoadSpinner'
import { SelectCodeSandboxType } from './sandboxTypes'
import { PrimaryButtonFilled } from 'components/Button/PrimaryButtonFilled'
import { COLORS } from 'consts/themes'
import { SANDBOX_CREATE_LABELS } from './createSandboxFunctionsWithLabels'
import { OUTLINE_SIZE } from 'components/KeyNavigating/keyNavigatingStyles'
import { FONT_SIZES } from 'consts/fontSizes'
import { IconType } from 'assets/icons'
import { Icon } from 'components/Icon/Icon'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { visuallyHiddenStyles } from 'utils/visuallyHiddenStyles'

const OPTION_SPACING = SPACINGS.ONE

const ICONS_BY_LABEL: { [key: string]: IconType } = {
  [SANDBOX_CREATE_LABELS.VANILLA_JS]: 'javascript',
  [SANDBOX_CREATE_LABELS.VANILLA_TS]: 'typescript',
  [SANDBOX_CREATE_LABELS.REACT_JS]: 'react',
  [SANDBOX_CREATE_LABELS.REACT_TS]: 'react',
}

const SelectCodeSandboxFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`

const Fieldset = styled.div`
  margin-left: -${OPTION_SPACING};
  margin-bottom: -${OPTION_SPACING};
  padding-bottom: ${SPACINGS.FIVE};
  border: 0;
  displat: inline-block;
`

const Legend = styled.legend`
  margin-bottom: ${SPACINGS.FOUR};
  font-size: ${FONT_SIZES.H3};
  padding-left: ${OPTION_SPACING};
  width: 100%;
  font-weight: 700;
  line-height: 1.5;
`

const RadioWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const RadioLabel = styled.label`
  padding-left: ${OPTION_SPACING};
  padding-bottom: ${OPTION_SPACING};
`

const RadioLabelContent = styled.span<{ $checked?: boolean }>`
  display: flex;
  width: 100%;
  border-radius: 1rem;
  flex-direction: column;
  padding: 1.2rem;
  line-height: 1;
  text-align: center;
  align-items: center;
  font-size: ${FONT_SIZES.DETAIL};
  font-weight: 500;
  cursor: pointer;
  background-color: ${COLORS.BACKGROUND_CODE};
  ${({ $checked }) =>
    $checked &&
    css`
      outline: ${COLORS.BRAND_PRIMARY} solid ${OUTLINE_SIZE};
    `}
`

const RadioLabelSvg = styled(Icon)`
  ${createSquareSizeStyles('3rem')};
  margin-bottom: ${SPACINGS.TWO};
`

const RadioInput = styled.input`
  ${visuallyHiddenStyles};
  -webkit-appearance: none;
  appearance: none;

  &:focus + label > ${RadioLabelContent} {
    outline: ${COLORS.BRAND_PRIMARY} solid ${OUTLINE_SIZE};
  }
`

const SubmitButton = styled(PrimaryButtonFilled)<{ $isLoading: boolean }>`
  position: relative;
  width: 100%;
  text-align: center;
  justify-content: center;

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      & > span:first-child {
        opacity: 0;
      }
    `}
`

const SubmitButtonLoadSpinner = styled(LoadSpinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export type PropType = {
  sandboxes: SelectCodeSandboxType[]
}

export const SelectCodeSandboxForm = (props: PropType) => {
  const { sandboxes = [] } = props
  const [chosenSandboxLabel, setChosenSandboxLabel] = useState('')
  const [sandbox, setSandbox] = useState('')
  const isLoading = !!(chosenSandboxLabel && !sandbox)

  const loadSandbox = useCallback(
    async (label: string) => {
      const sandbox = sandboxes.find((sandbox) => sandbox.label === label)
      if (sandbox) setSandbox(await sandbox.createSandbox())
    },
    [sandboxes],
  )

  const onChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setSandbox('')
    setChosenSandboxLabel(event.currentTarget.value)
  }, [])

  useEffect(() => {
    if (chosenSandboxLabel) loadSandbox(chosenSandboxLabel)
  }, [chosenSandboxLabel])

  return (
    <SelectCodeSandboxFormWrapper
      action={URLS.CODESANDBOX_DEFINE}
      method="POST"
      target="_blank"
    >
      <Fieldset>
        <Legend>Select CodeSandbox</Legend>

        <RadioWrapper>
          {sandboxes.map((sandboxes) => (
            <React.Fragment key={sandboxes.label}>
              <RadioLabel htmlFor={sandboxes.label}>
                <RadioInput
                  type="radio"
                  name="choose-sandbox"
                  id={sandboxes.label}
                  value={sandboxes.label}
                  onChange={onChange}
                  checked={chosenSandboxLabel === sandboxes.label}
                />
                <RadioLabelContent
                  $checked={chosenSandboxLabel === sandboxes.label}
                >
                  <RadioLabelSvg svg={ICONS_BY_LABEL[sandboxes.label]} />
                  {sandboxes.label}
                </RadioLabelContent>
              </RadioLabel>
            </React.Fragment>
          ))}
        </RadioWrapper>
      </Fieldset>

      <input type="hidden" name="parameters" value={sandbox} />

      <SubmitButton $isLoading={isLoading} type="submit" disabled={!sandbox}>
        <span>Create CodeSandbox</span>
        {isLoading && (
          <SubmitButtonLoadSpinner
            size={SPACINGS.FOUR}
            color={COLORS.TEXT_BODY}
          />
        )}
      </SubmitButton>
    </SelectCodeSandboxFormWrapper>
  )
}

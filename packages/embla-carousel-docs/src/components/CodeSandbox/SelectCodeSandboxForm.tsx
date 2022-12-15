import React, { FormEvent, useCallback, useState } from 'react'
import styled, { css } from 'styled-components'
import { SPACINGS } from 'consts/spacings'
import { FONT_SIZES } from 'consts/fontSizes'
import { URLS } from 'consts/urls'
import { useEffect } from 'react'
// import { LoadSpinner } from 'components/LoadSpinner/LoadSpinner'
import { SelectCodeSandboxType } from './sandboxTypes'
import { IconWithText } from 'components/Icon/IconWithText'
import { BareButton } from 'components/Button/BareButton'
import { COLORS } from 'consts/themes'
import { gradientTextStyles } from 'utils/gradientTextStyles'
// import { PrimaryButtonFilled } from 'components/Button/PrimaryButtonFilled'

const Wrapper = styled.form`
  display: flex;
  flex-direction: row;
`

const InputsWrapper = styled.fieldset`
  border: 0;
`

const ChooseSandboxButton = styled(BareButton)`
  color: ${COLORS.TEXT_LOW_CONTRAST};
  align-items: center;
  padding: 1.2rem 0 1.2rem 0;
  border-radius: 0.4rem;
  font-weight: 500;

  span {
    ${gradientTextStyles};
  }
`

// const SubmitButton = styled(PrimaryButtonFilled)<{ $isLoading: boolean }>`
//   position: relative;
//   margin-left: ${SPACINGS.TWO};

//   ${({ $isLoading }) =>
//     $isLoading &&
//     css`
//       > span {
//         opacity: 0;
//       }
//     `}
// `

// const SubmitButtonLoadSpinner = styled(LoadSpinner)`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `

export type PropType = {
  sandboxes: SelectCodeSandboxType[]
}

export const CreateCodeSandboxForm = (props: PropType) => {
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

  const onChange = useCallback((event: React.FormEvent<HTMLSelectElement>) => {
    setSandbox('')
    setChosenSandboxLabel(event.currentTarget.value)
  }, [])

  useEffect(() => {
    if (chosenSandboxLabel) loadSandbox(chosenSandboxLabel)
  }, [chosenSandboxLabel])

  return (
    <Wrapper action={URLS.CODESANDBOX_DEFINE} method="POST" target="_blank">
      {/* <ChooseSandboxButton>
        <IconWithText iconSvg="pen" iconSize="1.4rem">
          Edit Code
        </IconWithText> */}

      <InputsWrapper>
        {sandboxes.map((sandboxes) => (
          <div key={sandboxes.label}>
            <input
              id={sandboxes.label}
              type="radio"
              value={sandboxes.label}
              name="choose-sandbox"
            />
            <label htmlFor={sandboxes.label}>{sandboxes.label}</label>
          </div>
        ))}
      </InputsWrapper>

      {/* 
      <input type="hidden" name="parameters" value={sandbox} />
      <SubmitButton $isLoading={isLoading} type="submit" disabled={!sandbox}>
        Go
        {isLoading && <SubmitButtonLoadSpinner size="2rem" />}
      </SubmitButton> */}
    </Wrapper>
  )
}

export {}

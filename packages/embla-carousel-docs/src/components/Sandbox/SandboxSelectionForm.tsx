import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { SPACINGS } from 'consts/spacings'
import { URLS } from 'consts/urls'
import { FONT_SIZES, FONT_WEIGHTS } from 'consts/fontSizes'
import { useEffect } from 'react'
import { ButtonPrimaryFilledWithLoading } from 'components/Button/ButtonPrimaryFilled'
import { createGapStyles } from 'utils/createGapStyles'
import { PropType } from 'components/Sandbox/SandboxSelection'
import { SandboxLabelKeyType, SANDBOX_SELECTION_SPACING } from 'consts/sandbox'
import { snakeCaseToKebabCase } from 'utils/stringCasing'
import { SandboxSelectionInput } from './SandboxSelectionInput'

const INPUT_RADIO_GROUP_NAME = 'choose-sandbox'

const SandboxSelectionFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`

const Fieldset = styled.div`
  padding-bottom: ${SPACINGS.FIVE};
`

const Legend = styled.h3`
  margin-bottom: ${SPACINGS.FOUR};
  font-size: ${FONT_SIZES.H3};

  width: 100%;
  font-weight: ${FONT_WEIGHTS.BOLD};
  line-height: 1.5;
`

const SandboxSelectionList = styled.ul`
  ${createGapStyles(
    SANDBOX_SELECTION_SPACING,
    SANDBOX_SELECTION_SPACING,
    'li'
  )};
  display: flex;
  flex-wrap: wrap;
`

const SandboxSelection = styled.li`
  position: relative;
  flex: 0 0 50%;
  min-width: 0;
`

export const SandboxSelectionForm = (props: PropType) => {
  const { sandboxes = [] } = props
  const [sandboxKey, setSandboxKey] = useState<SandboxLabelKeyType | ''>('')
  const [sandbox, setSandbox] = useState('')
  const isLoading = !!(sandboxKey && !sandbox)

  const loadSandbox = useCallback(
    async (key: SandboxLabelKeyType) => {
      const sandbox = sandboxes.find((sandbox) => sandbox.key === key)
      if (sandbox) setSandbox(await sandbox.createSandbox())
    },
    [sandboxes]
  )

  const onChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const key = event.currentTarget.value as SandboxLabelKeyType
    setSandbox('')
    setSandboxKey(key)
  }, [])

  useEffect(() => {
    if (sandboxKey) loadSandbox(sandboxKey)
  }, [sandboxKey])

  return (
    <SandboxSelectionFormWrapper
      action={URLS.CODESANDBOX_DEFINE}
      method="POST"
      target="_blank"
    >
      <Fieldset role="radiogroup" aria-label={INPUT_RADIO_GROUP_NAME}>
        <Legend>Select CodeSandbox</Legend>

        <SandboxSelectionList>
          {sandboxes.map((sandbox) => (
            <SandboxSelection key={sandbox.key}>
              <SandboxSelectionInput
                framework={sandbox.key}
                name={INPUT_RADIO_GROUP_NAME}
                id={`${INPUT_RADIO_GROUP_NAME}-${snakeCaseToKebabCase(
                  sandbox.key
                )}`}
                value={sandbox.key}
                onChange={onChange}
                checked={sandboxKey === sandbox.key}
              >
                {sandbox.label}
              </SandboxSelectionInput>
            </SandboxSelection>
          ))}
        </SandboxSelectionList>
      </Fieldset>

      <input type="hidden" name="parameters" value={sandbox} />

      <ButtonPrimaryFilledWithLoading
        isLoading={isLoading}
        disabled={!sandbox}
        type="submit"
      >
        Create Sandbox
      </ButtonPrimaryFilledWithLoading>
    </SandboxSelectionFormWrapper>
  )
}

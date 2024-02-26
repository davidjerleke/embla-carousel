import React, { useCallback, useEffect, useState } from 'react'
import { ButtonPrimaryFilledWithLoading } from 'components/Button/ButtonPrimaryFilled'
import { useCarouselGenerator } from 'hooks/useCarouselGenerator'
import { SandboxLabelKeyType } from 'consts/sandbox'
import { SandboxGeneratorSettingsType } from 'consts/sandbox'
import { dynamicGeneratorSandboxes } from 'components/Sandbox/sandboxGenerator'

export const CarouselGeneratorSubmit = () => {
  const { formData } = useCarouselGenerator()
  const [sandbox, setSandbox] = useState('')
  const sandboxKey = formData.framework
  const isLoading = !!(sandboxKey && !sandbox)

  const loadSandbox = useCallback(
    async (
      key: SandboxLabelKeyType,
      settings: SandboxGeneratorSettingsType
    ) => {
      const sandbox = dynamicGeneratorSandboxes.find(
        (sandbox) => sandbox.key === key
      )
      if (sandbox) setSandbox(await sandbox.createSandbox(settings))
    },
    []
  )

  useEffect(() => {
    if (sandboxKey) {
      setSandbox('')
      loadSandbox(sandboxKey, formData)
    }
  }, [sandboxKey, formData])

  return (
    <>
      <input type="hidden" name="parameters" value={sandbox} />

      <ButtonPrimaryFilledWithLoading
        isLoading={isLoading}
        disabled={!sandbox}
        type="submit"
      >
        Create Sandbox
      </ButtonPrimaryFilledWithLoading>
    </>
  )
}

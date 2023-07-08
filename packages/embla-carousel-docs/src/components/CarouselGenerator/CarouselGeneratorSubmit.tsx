import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { SPACINGS } from 'consts/spacings'
import { createGapStyles } from 'utils/createGapStyles'
import { ButtonPrimaryFilledWithLoading } from 'components/Button/ButtonPrimaryFilled'
import { useCarouselGenerator } from 'hooks/useCarouselGenerator'
import { SandboxLabelKeyType } from 'consts/sandbox'
import { CarouselGeneratorFormDataType } from 'consts/carouselGenerator'
import { SANDBOXES } from 'components/Examples/CarouselGenerator/CarouselGeneratorSandboxes'
import {
  FORM_ITEM_MAX_WIDTH_STYLES,
  FORM_ITEM_SPACING_X
} from './CarouselGeneratorFormItems'

const CarouselGeneratorSubmitWrapper = styled.div`
  ${createGapStyles(FORM_ITEM_SPACING_X, SPACINGS.EIGHT)}
  margin-top: ${SPACINGS.EIGHT};
`

const CarouselGeneratorButtonWrapper = styled.div`
  ${FORM_ITEM_MAX_WIDTH_STYLES};
`

export const CarouselGeneratorSubmit = () => {
  const { formData } = useCarouselGenerator()
  const [sandbox, setSandbox] = useState('')
  const sandboxKey = formData.framework
  const isLoading = !!(sandboxKey && !sandbox)

  const loadSandbox = useCallback(
    async (
      key: SandboxLabelKeyType,
      settings: CarouselGeneratorFormDataType
    ) => {
      const sandbox = SANDBOXES.find((sandbox) => sandbox.key === key)
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
    <div>
      <input type="hidden" name="parameters" value={sandbox} />

      <CarouselGeneratorSubmitWrapper>
        <CarouselGeneratorButtonWrapper>
          <ButtonPrimaryFilledWithLoading
            isLoading={isLoading}
            disabled={!sandbox}
            type="submit"
          >
            Create CodeSandbox
          </ButtonPrimaryFilledWithLoading>
        </CarouselGeneratorButtonWrapper>
      </CarouselGeneratorSubmitWrapper>
    </div>
  )
}

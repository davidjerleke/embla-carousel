import React from 'react'
import styled from 'styled-components'
import { LoadSpinner } from './LoadSpinner'
import { CAROUSEL_DEFAULT_HEIGHT } from 'components/Examples/examplesCarouselStyles'

const LoadSpinnerExamplesIcon = styled(LoadSpinner)`
  position: absolute;
  top: calc(${CAROUSEL_DEFAULT_HEIGHT} / 2);
  left: 50%;
  transform: translate(-50%, -50%);
`

export const LoadSpinnerExamples = () => {
  return <LoadSpinnerExamplesIcon size="4rem" />
}

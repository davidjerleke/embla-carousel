import styled from 'styled-components'
import { LoadSpinner } from '@/components/LoadSpinner/LoadSpinner'
import { CAROUSEL_DEFAULT_HEIGHT } from '@/content/v9/examples/examples-carousel-styles'

const LoadSpinnerExamplesIcon = styled(LoadSpinner)`
  position: absolute;
  top: calc(${CAROUSEL_DEFAULT_HEIGHT} / 2);
  left: 50%;
  transform: translate(-50%, -50%);
`

export function LoadSpinnerExamples() {
  return <LoadSpinnerExamplesIcon size="4rem" />
}

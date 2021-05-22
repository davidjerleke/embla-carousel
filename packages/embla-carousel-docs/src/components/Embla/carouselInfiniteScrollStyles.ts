import styled from 'styled-components'
import { createSquareSizeStyles } from 'utils'
import { Slide } from './carouselBasicStyles'

const SPINNER_SIZE = '5rem'
const SPINNER_WIDTH = '0.4rem'

export const SlideLoading = styled(Slide)`
  position: relative;
  flex: 0 0 15rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SlideLoadingSpinner = styled.div`
  border: ${SPINNER_WIDTH} solid rgba(var(--text-high-contrast-rgb-value), 0.2);
  border-left: ${SPINNER_WIDTH} solid var(--text-high-contrast);
  font-size: 1rem;
  position: relative;
  text-indent: -9999em;
  animation: loading 1.1s infinite linear;
  border-radius: 50%;
  ${createSquareSizeStyles(SPINNER_SIZE)};
  &:after {
    border-radius: inherit;
    ${createSquareSizeStyles(SPINNER_SIZE)};
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

import styled from 'styled-components'
import { SlideImg } from './carouselBasicStyles'

export const LazyloadSlideImg = styled(SlideImg)<{ $loaded: boolean }>`
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.2s;
`

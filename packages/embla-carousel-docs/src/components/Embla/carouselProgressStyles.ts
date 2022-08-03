import styled from 'styled-components'
import { COLORS } from 'consts/themes'
import { LAYERS } from 'consts/layers'
import { supportsStyles } from 'consts/supportsStyles'
import { gradientBackgroundStyles } from 'utils/gradientBackgroundStyles'

export const ProgressWrapper = styled.div`
  z-index: ${LAYERS.STEP};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: 2.8rem;
  left: 0;
  right: 0;
  margin: auto;
  pointer-events: none;
`

export const ProgressBar = styled.div`
  background-color: ${COLORS.BACKGROUND_SITE};
  max-width: 210px;
  width: 100%;
  position: relative;
  height: 0.3rem;
  overflow: hidden;
  border-radius: 0.2rem;
`

export const ProgressHighlight = styled.div`
  background-color: ${COLORS.BRAND_PRIMARY};
  ${supportsStyles.gradientText} {
    ${gradientBackgroundStyles};
  }
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: -100%;
`

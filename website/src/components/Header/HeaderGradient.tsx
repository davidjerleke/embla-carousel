import styled from 'styled-components'
import { COLORS } from '@/utils/theme'
import { LAYERS } from '@/utils/layers'
import { BORDER_SIZES } from '@/utils/border'

const GradientWrapper = styled.div`
  position: relative;
  z-index: ${LAYERS.HEADER - LAYERS.STEP};
`

const GradientLine = styled.span`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${BORDER_SIZES.OUTLINE};
  background: linear-gradient(
    to right,
    transparent,
    ${COLORS.BRAND_SECONDARY} 39.5%,
    transparent
  );
`

export const GradientDropShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  background: linear-gradient(to bottom, ${COLORS.BRAND_PRIMARY}, transparent);
  pointer-events: none;
  z-index: ${LAYERS.NAVIGATION + LAYERS.STEP};
`

export function HeaderGradient() {
  return (
    <GradientWrapper aria-hidden>
      <GradientLine />
      <GradientDropShadow />
    </GradientWrapper>
  )
}

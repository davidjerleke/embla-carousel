import styled from 'styled-components'
import { COLORS } from '@/utils/theme'
import { BORDER_SIZES } from '@/utils/border'

const GradientWrapper = styled.div`
  position: relative;
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
  height: 5.5rem;
  background: linear-gradient(to bottom, ${COLORS.BRAND_PRIMARY}, transparent);
  pointer-events: none;
`

export function HeaderGradient() {
  return (
    <GradientWrapper aria-hidden>
      <GradientLine />
      <GradientDropShadow />
    </GradientWrapper>
  )
}

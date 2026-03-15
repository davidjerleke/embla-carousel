import { styled } from 'styled-components'
import { BORDER_SIZES } from '@/utils/border'
import { FONT_WEIGHTS } from '@/utils/font-sizes'
import { COLORS } from '@/utils/theme'
import { SPACINGS } from '@/utils/spacings'
import { LAYERS } from '@/utils/layers'

const NoScriptMessage = styled.div`
  border: ${BORDER_SIZES.OUTLINE} solid ${COLORS.ADMONITION_DANGER};
  padding: ${SPACINGS.ONE} ${SPACINGS.TWO};
  color: ${COLORS.ADMONITION_DANGER};
  position: fixed;
  background-color: ${COLORS.BACKGROUND_SITE};
  text-align: center;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  font-weight: ${FONT_WEIGHTS.BOLD};
  z-index: ${LAYERS.HEADER};
`

export function NoScript() {
  return (
    <noscript key="noscript">
      <NoScriptMessage>
        This app only works with JavaScript enabled.
      </NoScriptMessage>
    </noscript>
  )
}

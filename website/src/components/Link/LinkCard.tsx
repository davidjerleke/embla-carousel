import styled from 'styled-components'
import { SPACINGS } from '@/utils/spacings'
import { COLORS } from '@/utils/theme'
import { FONT_SIZES, FONT_WEIGHTS } from '@/utils/font-sizes'
import { IconWithText } from '@/components/Icon/IconWithText'
import { LinkBare, PropType } from './LinkBare'
import { BRAND_GRADIENT_TEXT_STYLES } from '@/utils/gradients'
import { CARD_STYLES } from '@/utils/card'

const LinkCardWrapper = styled(LinkBare)`
  ${CARD_STYLES};
  padding: ${SPACINGS.FOUR};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ReadMoreText = styled.div`
  span {
    ${BRAND_GRADIENT_TEXT_STYLES};
    font-size: ${FONT_SIZES.COMPLEMENTARY};
    font-weight: ${FONT_WEIGHTS.MEDIUM};
  }

  svg {
    color: ${COLORS.BRAND_SECONDARY};
  }
`

export function LinkCard(props: PropType) {
  const { children, ...restProps } = props

  return (
    <LinkCardWrapper {...restProps}>
      {children}

      <ReadMoreText>
        <IconWithText iconSvg="arrowRight" iconSide="right">
          Read more
        </IconWithText>
      </ReadMoreText>
    </LinkCardWrapper>
  )
}

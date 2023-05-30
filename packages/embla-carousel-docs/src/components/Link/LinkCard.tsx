import React from 'react'
import styled from 'styled-components'
import { SPACINGS } from 'consts/spacings'
import { COLORS } from 'consts/themes'
import { FONT_SIZES, FONT_WEIGHTS } from 'consts/fontSizes'
import { IconWithText } from 'components/Icon/IconWithText'
import { LinkBare, PropType } from './LinkBare'
import { BRAND_GRADIENT_TEXT_STYLES } from 'consts/gradients'
import { CARD_STYLES } from 'consts/card'

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

export const LinkCard = (props: PropType) => {
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

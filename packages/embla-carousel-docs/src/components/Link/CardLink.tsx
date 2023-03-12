import React from 'react'
import styled from 'styled-components'
import { SPACINGS } from 'consts/spacings'
import { COLORS } from 'consts/themes'
import { FONT_SIZES } from 'consts/fontSizes'
import { BORDER_RADIUSES, BORDER_SIZES } from 'consts/border'
import { IconWithText } from 'components/Icon/IconWithText'
import { BareLink, PropType } from './BareLink'
import { BRAND_GRADIENT_TEXT_STYLES } from 'consts/gradients'

const CardLinkWrapper = styled(BareLink)`
  padding: ${SPACINGS.FOUR};
  border: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
  background-color: ${COLORS.BACKGROUND_CODE};
  border-radius: ${BORDER_RADIUSES.CARD};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ReadMoreText = styled.div`
  span {
    ${BRAND_GRADIENT_TEXT_STYLES};
    font-size: ${FONT_SIZES.COMPLEMENTARY};
    font-weight: 500;
  }

  svg {
    color: ${COLORS.BRAND_SECONDARY};
  }
`

export const CardLink = (props: PropType) => {
  const { children, ...restProps } = props

  return (
    <CardLinkWrapper {...restProps}>
      {children}

      <ReadMoreText>
        <IconWithText iconSvg="arrowRight" iconSide="right">
          Read more
        </IconWithText>
      </ReadMoreText>
    </CardLinkWrapper>
  )
}

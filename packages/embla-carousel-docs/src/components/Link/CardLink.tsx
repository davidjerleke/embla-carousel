import React from 'react'
import styled from 'styled-components'
import { SPACINGS } from 'consts/spacings'
import { IconWithText } from 'components/Icon/IconWithText'
import { BareLink, PropType } from './BareLink'
import { COLORS } from 'consts/themes'
import { FONT_SIZES } from 'consts/fontSizes'
import { gradientTextStyles } from 'utils/gradientTextStyles'

const CardLinkWrapper = styled(BareLink)`
  padding: ${SPACINGS.FOUR};
  border: 0.1rem solid ${COLORS.DETAIL_LOW_CONTRAST};
  background-color: ${COLORS.BACKGROUND_CODE};
  border-radius: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ReadMoreText = styled.div`
  span {
    ${gradientTextStyles};
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

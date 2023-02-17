import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { IconWithText } from 'components/Icon/IconWithText'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { FONT_SIZES } from 'consts/fontSizes'

const Heading = styled(IconWithText)`
  font-weight: bold;
`

const AdmonitionWrapper = styled.div`
  color: ${COLORS.TEXT_ADMONITION_NOTE};
  background-color: rgba(${COLORS.TEXT_ADMONITION_NOTE_RGB_VALUE}, 0.05);
  border: 0.1rem solid rgba(${COLORS.TEXT_ADMONITION_NOTE_RGB_VALUE}, 0.1);
  margin-bottom: ${SPACINGS.FOUR};
  padding: ${SPACINGS.THREE} ${SPACINGS.FOUR};
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  border-radius: 0.4rem;
  overflow: hidden;

  p,
  ${Heading} {
    margin-bottom: ${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)};
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`

type PropType = PropsWithChildren<{}>

export const Admonition = (props: PropType) => {
  const { children } = props

  return (
    <AdmonitionWrapper>
      <Heading iconSvg="info">Note</Heading>
      {children}
    </AdmonitionWrapper>
  )
}

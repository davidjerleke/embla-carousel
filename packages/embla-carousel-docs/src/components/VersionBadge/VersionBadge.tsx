import React from 'react'
import styled from 'styled-components'
import { CARD_STYLES } from 'consts/card'
import { SPACINGS } from 'consts/spacings'
import { BORDER_RADIUSES } from 'consts/border'
import { FONT_SIZES, FONT_WEIGHTS } from 'consts/fontSizes'
import { COLORS } from 'consts/themes'
import packageJson from '../../../package.json'

const VersionBadgeWrapper = styled.div`
  ${CARD_STYLES};
  display: inline-flex;
  padding: 0.2rem ${SPACINGS.THREE};
  border-radius: ${BORDER_RADIUSES.SOFT};
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  color: ${COLORS.TEXT_LOW_CONTRAST};
`

const VersionBadgeKey = styled.span`
  font-weight: ${FONT_WEIGHTS.SEMI_BOLD};
  margin-right: 0.4rem;
`

type PropType = {}

export const VersionBadge = (props: PropType) => {
  const { ...restProps } = props

  return (
    <VersionBadgeWrapper {...restProps}>
      <VersionBadgeKey>Version:</VersionBadgeKey> {packageJson.version}
    </VersionBadgeWrapper>
  )
}

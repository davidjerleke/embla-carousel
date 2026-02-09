'use client'

import styled from 'styled-components'
import { CARD_STYLES } from '@/utils/card'
import { SPACINGS } from '@/utils/spacings'
import { BORDER_RADIUSES } from '@/utils/border'
import { FONT_SIZES, FONT_WEIGHTS } from '@/utils/font-sizes'
import { COLORS } from '@/utils/theme'
import { useGlobalDataContext } from '@/components/Global/GlobalDataContext'

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

export function VersionBadge(props: PropType) {
  const { ...restProps } = props
  const { latestVersion } = useGlobalDataContext()

  return (
    <VersionBadgeWrapper {...restProps}>
      <VersionBadgeKey>Version:</VersionBadgeKey> {latestVersion}
    </VersionBadgeWrapper>
  )
}

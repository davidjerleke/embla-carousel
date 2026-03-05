'use client'

import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { LinkBare } from '@/components/Link/LinkBare'
import { IconWithText } from '@/components/Icon/IconWithText'
import { COLORS } from '@/utils/theme'
import { SPACINGS } from '@/utils/spacings'
import { FONT_SIZES } from '@/utils/font-sizes'
import { joinSlugs } from '@/utils/slug'
import { isExternalLink } from '@/utils/link'
import { GLOBAL_DATA } from '@/utils/global-data'

const RepositoryLinkWrapper = styled(LinkBare)`
  color: ${COLORS.TEXT_LOW_CONTRAST};
  padding-top: ${SPACINGS.ONE};
  padding-bottom: ${SPACINGS.ONE};
  margin-bottom: ${SPACINGS.THREE};
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  display: inline-flex;
`

type PropType = PropsWithChildren<{
  href: string
}>

export function RepositoryLink(props: PropType) {
  const { href, children, ...restProps } = props
  const linkHref = isExternalLink(href)
    ? href
    : joinSlugs(GLOBAL_DATA.URLS.GITHUB_PACKAGES, href)

  return (
    <RepositoryLinkWrapper href={linkHref} {...restProps}>
      <IconWithText iconSvg="github" iconSize="1.5rem">
        View plugin on GitHub
      </IconWithText>
    </RepositoryLinkWrapper>
  )
}

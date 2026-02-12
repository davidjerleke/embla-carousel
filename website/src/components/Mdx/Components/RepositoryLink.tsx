import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { LinkBare, PropType as LinkPropType } from '@/components/Link/LinkBare'
import { IconWithText } from '@/components/Icon/IconWithText'
import { COLORS } from '@/utils/theme'
import { SPACINGS } from '@/utils/spacings'
import { FONT_SIZES } from '@/utils/font-sizes'

const RepositoryLinkWrapper = styled(LinkBare)`
  color: ${COLORS.TEXT_LOW_CONTRAST};
  padding-top: ${SPACINGS.ONE};
  padding-bottom: ${SPACINGS.ONE};
  margin-bottom: ${SPACINGS.THREE};
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  display: inline-flex;
`

type PropType = PropsWithChildren<{
  href: LinkPropType['href']
}>

export function RepositoryLink(props: PropType) {
  const { href, children, ...restProps } = props

  return (
    <RepositoryLinkWrapper href={href} {...restProps}>
      <IconWithText iconSvg="github" iconSize="1.5rem">
        {children}
      </IconWithText>
    </RepositoryLinkWrapper>
  )
}

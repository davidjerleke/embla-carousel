import styled from 'styled-components'
import { LinkBare } from '@/components/Link/LinkBare'
import { COLORS } from '@/utils/theme'
import { FONT_SIZES } from '@/utils/font-sizes'
import { SPACINGS } from '@/utils/spacings'
import { URLS } from '@/utils/urls'
import { IconWithText } from '@/components/Icon/IconWithText'

const PageEditThisPageWrapper = styled(LinkBare)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  padding-top: ${SPACINGS.ONE};
  padding-bottom: ${SPACINGS.ONE};
  margin-top: ${SPACINGS.EIGHT};
  color: ${COLORS.TEXT_LOW_CONTRAST};
`

type PropType = {
  pageUrl: string
}

export function PageEditThisPage(props: PropType) {
  const { pageUrl } = props
  const url = `${URLS.GITHUB_DOCUMENTATION}/${pageUrl}`

  return (
    <PageEditThisPageWrapper href={url}>
      <IconWithText iconSvg="pen" iconSize="1.5rem">
        Edit this page on GitHub
      </IconWithText>
    </PageEditThisPageWrapper>
  )
}

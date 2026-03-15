import styled from 'styled-components'
import { LinkBare } from '@/components/Link/LinkBare'
import { COLORS } from '@/utils/theme'
import { SPACINGS } from '@/utils/spacings'
import { IconWithText } from '@/components/Icon/IconWithText'
import { BORDER_SIZES } from '@/utils/border'
import { createGapStyles } from '@/utils/create-gap-styles'
import { GLOBAL_DATA } from '@/utils/global-data'
import { FONT_SIZES } from '@/utils/font-sizes'

const LINK_SPACING = SPACINGS.FIVE
const ICON_SPACING = SPACINGS.ONE
const ICON_SIZE = '1.4rem'

const FooterLinksWrapper = styled.ul`
  ${createGapStyles(LINK_SPACING, '', 'li')};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Link = styled(LinkBare)`
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  margin-right: -${BORDER_SIZES.OUTLINE};
  padding: ${SPACINGS.ONE} ${BORDER_SIZES.OUTLINE};
  outline-offset: -${BORDER_SIZES.OUTLINE};
  color: ${COLORS.TEXT_LOW_CONTRAST};
  display: inline-flex;
  align-items: center;
`

type PropType = {
  children?: React.ReactNode
}

export function FooterLinks(props: PropType) {
  const { ...restProps } = props
  const { URLS } = GLOBAL_DATA

  return (
    <FooterLinksWrapper {...restProps}>
      <li>
        <Link href={URLS.NPM_PACKAGE}>
          <IconWithText
            iconSvg="npm"
            spacing={ICON_SPACING}
            iconSize={ICON_SIZE}
          >
            Npm
          </IconWithText>
        </Link>
      </li>
      <li>
        <Link href={URLS.GITHUB_ROOT}>
          <IconWithText
            iconSvg="github"
            spacing={ICON_SPACING}
            iconSize={ICON_SIZE}
          >
            GitHub
          </IconWithText>
        </Link>
      </li>
      <li>
        <Link href={URLS.GITHUB_SPONSORS_PAGE}>
          <IconWithText
            iconSvg="heartOutlined"
            spacing={ICON_SPACING}
            iconSize={ICON_SIZE}
          >
            Sponsor
          </IconWithText>
        </Link>
      </li>
    </FooterLinksWrapper>
  )
}

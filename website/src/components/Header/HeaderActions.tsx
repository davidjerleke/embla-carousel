import styled, { css } from 'styled-components'
import { ThemeToggle } from '@/components/Theme/ThemeToggle'
import { LinkNavigation } from '@/components/Link/LinkNavigation'
import { VersionBadge } from '@/components/VersionBadge/VersionBadge'
import { COLORS } from '@/utils/theme'
import { MEDIA } from '@/utils/breakpoints'
import { SPACINGS } from '@/utils/spacings'
import { FONT_SIZES } from '@/utils/font-sizes'
import { Search } from '@/components/Search/Search'
import { createGapStyles } from '@/utils/create-gap-styles'
import { useSiteNavigationContext } from '../SiteNavigation/SiteNavigationContext'
import { Icon } from '@/components/Icon/Icon'
import { isInternalLink } from '@/utils/link'

const ITEM_SPACING_DESKTOP = SPACINGS.CUSTOM(() => 2.8)

const HeaderActionsWrapper = styled.ul`
  display: flex;
  align-items: center;
  line-height: 1.65;
  font-size: ${FONT_SIZES.COMPLEMENTARY};

  ${MEDIA.DESKTOP} {
    ${createGapStyles(ITEM_SPACING_DESKTOP, '', 'li')}
  }
`

const Item = styled.li<{ $hiddenAtCompact?: boolean }>`
  display: flex;
  align-items: center;

  ${({ $hiddenAtCompact }) =>
    $hiddenAtCompact &&
    css`
      ${MEDIA.COMPACT} {
        display: none;
      }
    `};
`

const Link = styled(LinkNavigation)`
  color: ${COLORS.TEXT_MEDIUM_CONTRAST};
  display: inline-flex;
  text-align: center;
  padding: ${SPACINGS.ONE} 0;
`

const ExternalLinkIcon = styled(Icon)`
  position: absolute;
  top: 0.2rem;
  left: calc(100% + 0.2rem);
`

export function HeaderActions() {
  const { flatRoutes } = useSiteNavigationContext()

  return (
    <HeaderActionsWrapper>
      <Item $hiddenAtCompact>
        <nav aria-label="Quick Navigation Menu">
          <HeaderActionsWrapper>
            {flatRoutes.map((route) => {
              return (
                <Item key={route.slug}>
                  <Link slug={route.slug}>
                    {route.title}

                    {!isInternalLink(route.slug) && (
                      <ExternalLinkIcon
                        svg="externalLink"
                        size="0.8rem"
                        color={COLORS.DETAIL_HIGH_CONTRAST}
                      />
                    )}
                  </Link>
                </Item>
              )
            })}
          </HeaderActionsWrapper>
        </nav>
      </Item>

      <Item $hiddenAtCompact>
        <VersionBadge />
      </Item>

      <Item>
        <Search />
      </Item>

      <Item $hiddenAtCompact>
        <ThemeToggle />
      </Item>
    </HeaderActionsWrapper>
  )
}

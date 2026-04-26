import styled, { css } from 'styled-components'
import { ThemeToggle } from '@/components/Theme/ThemeToggle'
import { LinkNavigation } from '@/components/Link/LinkNavigation'
import { VersionSelector } from '@/components/VersionSelector/VersionSelector'
import { COLORS } from '@/utils/theme'
import { MEDIA } from '@/utils/breakpoints'
import { SPACINGS } from '@/utils/spacings'
import { FONT_SIZES } from '@/utils/font-sizes'
import { Search } from '@/components/Search/Search'
import { createGapStyles } from '@/utils/create-gap-styles'
import { useHeaderNavigationContext } from '@/components/Header/HeaderNavigationContext'

const ITEM_SPACING_DESKTOP = SPACINGS.CUSTOM(() => 2.8)
const ITEM_SPACING_COMPACT = SPACINGS.TWO

const HeaderActionsWrapper = styled.ul`
  display: flex;
  align-items: center;
  line-height: 1.65;
  font-size: ${FONT_SIZES.COMPLEMENTARY};

  ${MEDIA.DESKTOP} {
    ${createGapStyles(ITEM_SPACING_DESKTOP, '', 'li')};
  }
  ${MEDIA.COMPACT} {
    ${createGapStyles(ITEM_SPACING_COMPACT, '', 'li')};
  }
`

const Item = styled.li<{
  $hiddenAtCompact?: boolean
}>`
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

export function HeaderActions() {
  const { flatRoutes } = useHeaderNavigationContext()

  return (
    <HeaderActionsWrapper>
      <Item $hiddenAtCompact>
        <nav aria-label="Quick Navigation Menu">
          <HeaderActionsWrapper>
            {flatRoutes.map((route) => (
              <Item key={route.slug}>
                <Link slug={route.slug}>{route.title}</Link>
              </Item>
            ))}
          </HeaderActionsWrapper>
        </nav>
      </Item>

      <Item $hiddenAtCompact>
        <VersionSelector />
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

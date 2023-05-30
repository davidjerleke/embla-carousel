import React, { PropsWithChildren } from 'react'
import { RoutesProvider } from 'components/Routes/RoutesContext'
import { ThemeProvider } from 'components/Theme/ThemeContext'
import { SiteNavigationProvider } from 'components/SiteNavigation/SiteNavigationContext'
import { KeyNavigatingProvider } from 'components/KeyNavigating/KeyNavigatingContext'
import { TabsProvider } from 'components/Tabs/TabsContext'
import { TableOfContentsProvider } from 'components/TableOfContents/TableOfContentsContext'
import { KeyNavigatingSkipToContent } from 'components/KeyNavigating/KeyNavigatingSkipToContent'
import { GlobalStyles } from 'components/Layout/GlobalStyles/GlobalStyles'
import { PagePropType, PAGE_LAYOUTS } from 'consts/page'
import { PageGrid } from 'components/Page/PageGrid'
import { RoutesLoading } from 'components/Routes/RoutesLoading'
import { Header } from 'components/Header/Header'
import { Footer } from 'components/Footer/Footer'

type PropType = PropsWithChildren<PagePropType>

export const Layout = (props: PropType) => {
  const {
    children,
    pageContext,
    data: { mdx }
  } = props
  const { layout, id } = pageContext
  const isNotFoundPage = layout === PAGE_LAYOUTS.NOT_FOUND
  const tableOfContents = mdx?.tableOfContents

  return (
    <RoutesProvider>
      <ThemeProvider>
        <KeyNavigatingProvider>
          <SiteNavigationProvider>
            <GlobalStyles />
            {isNotFoundPage ? (
              <>{children}</>
            ) : (
              <>
                <KeyNavigatingSkipToContent />
                <Header />
                <RoutesLoading pageId={id} />
                <TabsProvider>
                  <TableOfContentsProvider tableOfContents={tableOfContents}>
                    <PageGrid layout={layout}>{children}</PageGrid>
                  </TableOfContentsProvider>
                </TabsProvider>
                <Footer />
              </>
            )}
          </SiteNavigationProvider>
        </KeyNavigatingProvider>
      </ThemeProvider>
    </RoutesProvider>
  )
}

import React, { PropsWithChildren } from 'react'
import { RoutesProvider } from 'components/Routes/RoutesContext'
import { ThemeProvider } from 'components/Theme/ThemeContext'
import { SiteNavigationProvider } from 'components/SiteNavigation/SiteNavigationContext'
import { KeyNavigatingProvider } from 'components/KeyNavigating/KeyNavigatingContext'
import { TabsProvider } from 'components/Tabs/TabsContext'
import { TableOfContentsProvider } from 'components/TableOfContents/TableOfContentsContext'
import { KeyNavigatingSkipToContent } from 'components/KeyNavigating/KeyNavigatingSkipToContent'
import { GlobalStyles } from 'components/Layout/GlobalStyles/GlobalStyles'
import { PageTemplatePropType, PAGE_TEMPLATES } from 'consts/pageTemplates'
import { Grid } from 'components/SiteLayout/Grid'
import { RoutesLoading } from 'components/Routes/RoutesLoading'
import { Header } from 'components/Header/Header'
import { Footer } from 'components/Footer/Footer'

type PropType = PropsWithChildren<
  Pick<PageTemplatePropType, 'pageContext' | 'data'>
>

export const Layout = (props: PropType) => {
  const {
    children,
    pageContext,
    data: { mdx },
  } = props
  const { layout, id } = pageContext
  const isNotFoundPage = layout === PAGE_TEMPLATES.NOT_FOUND
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
                    <Grid layout={layout}>{children}</Grid>
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

import React, { PropsWithChildren } from 'react'
import { RoutesProvider } from 'components/Routes/Context'
import { ThemeProvider } from 'components/Theme/Context'
import { NavigationProvider } from 'components/SiteNavigation/Context'
import { KeyNavigatingProvider } from 'components/KeyNavigating/Context'
import { TabsProvider } from 'components/Tabs/Context'
import { TableOfContentsProvider } from 'components/TableOfContents/Context'
import { SkipToContent } from 'components/KeyNavigating/SkipToContent'
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
    data: {
      mdx: { tableOfContents },
    },
  } = props
  const { layout, id } = pageContext
  const isNotFoundPage = layout === PAGE_TEMPLATES.NOT_FOUND

  return (
    <RoutesProvider>
      <ThemeProvider>
        <KeyNavigatingProvider>
          <NavigationProvider>
            <GlobalStyles />
            {isNotFoundPage ? (
              <>{children}</>
            ) : (
              <>
                <SkipToContent />
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
          </NavigationProvider>
        </KeyNavigatingProvider>
      </ThemeProvider>
    </RoutesProvider>
  )
}

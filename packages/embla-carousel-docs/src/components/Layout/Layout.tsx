import React, { PropsWithChildren } from 'react'
import { RoutesProvider } from 'components/Routes/Context'
import { ThemeProvider } from 'components/Theme/Context'
import { NavigationProvider } from 'components/SiteNavigation/Context'
import { TabAccessProvider } from 'components/TabAccess/Context'
import { SkipToContent } from 'components/TabAccess/SkipToContent'
import { GlobalStyles } from 'components/Layout/GlobalStyles/GlobalStyles'
import { PageTemplatePropType, PAGE_TEMPLATES } from 'consts/pageTemplates'
import { Grid } from 'components/SiteLayout/Grid'
import { RoutesLoading } from 'components/Routes/RoutesLoading'
import { Header } from 'components/Header/Header'
import { Footer } from 'components/Footer/Footer'
import { TableOfContentsProvider } from 'components/TableOfContents/Context'

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
        <TabAccessProvider>
          <NavigationProvider>
            <GlobalStyles />
            {isNotFoundPage ? (
              <>{children}</>
            ) : (
              <>
                <SkipToContent />
                <Header />
                <RoutesLoading pageId={id} />
                <TableOfContentsProvider tableOfContents={tableOfContents}>
                  <Grid layout={layout}>{children}</Grid>
                </TableOfContentsProvider>
                <Footer />
              </>
            )}
          </NavigationProvider>
        </TabAccessProvider>
      </ThemeProvider>
    </RoutesProvider>
  )
}

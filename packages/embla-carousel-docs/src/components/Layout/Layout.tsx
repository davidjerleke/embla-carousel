import React, { PropsWithChildren } from 'react'
import { RoutesProvider } from 'components/Routes'
import { ThemeProvider } from 'components/Theme'
import { NavigationProvider } from 'components/Navigation'
import { SkipToContent, TabAccessProvider } from 'components/TabAccess'
import { Search, SearchProvider } from 'components/Search'
import { GlobalStyles } from 'components/Layout/GlobalStyles'
import { PageTemplateType, PAGE_TEMPLATES } from 'consts'
import { Grid } from 'components/SiteLayout'
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

type PropType = PropsWithChildren<{
  pageContext: { layout: PageTemplateType }
}>

export const Layout = (props: PropType) => {
  const { children, pageContext } = props
  const { layout } = pageContext
  const isNotFoundPage = layout === PAGE_TEMPLATES.NOT_FOUND

  return (
    <RoutesProvider>
      <ThemeProvider>
        <TabAccessProvider>
          <NavigationProvider>
            <SearchProvider>
              <GlobalStyles />
              {isNotFoundPage ? (
                <>{children}</>
              ) : (
                <>
                  <SkipToContent />
                  <Header />
                  <Grid layout={layout}>{children}</Grid>
                  <Footer />
                  <Search />
                </>
              )}
            </SearchProvider>
          </NavigationProvider>
        </TabAccessProvider>
      </ThemeProvider>
    </RoutesProvider>
  )
}

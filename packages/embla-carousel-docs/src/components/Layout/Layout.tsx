import React, { PropsWithChildren } from 'react'
import { RoutesProvider } from 'components/Routes'
import { ThemeProvider } from 'components/Theme'
import { NavigationProvider } from 'components/Navigation'
import { SkipToContent, TabAccessProvider } from 'components/TabAccess'
import { GlobalStyles } from 'components/Layout/GlobalStyles'
import { PageTemplateType, PAGE_TEMPLATES } from 'consts'
import { Grid, Loading } from 'components/SiteLayout'
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

type PropType = PropsWithChildren<{
  pageContext: { layout: PageTemplateType; id: string }
}>

export const Layout = (props: PropType) => {
  const { children, pageContext } = props
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
                <Loading pageId={id} />
                <Grid layout={layout}>{children}</Grid>
                <Footer />
              </>
            )}
          </NavigationProvider>
        </TabAccessProvider>
      </ThemeProvider>
    </RoutesProvider>
  )
}

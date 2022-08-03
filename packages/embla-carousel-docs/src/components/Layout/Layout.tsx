import React, { PropsWithChildren } from 'react'
import { RoutesProvider } from 'components/Routes/Context'
import { ThemeProvider } from 'components/Theme/Context'
import { NavigationProvider } from 'components/Navigation/Context'
import { TabAccessProvider } from 'components/TabAccess/Context'
import { SkipToContent } from 'components/TabAccess/SkipToContent'
import { GlobalStyles } from 'components/Layout/GlobalStyles/GlobalStyles'
import { PageTemplateType, PAGE_TEMPLATES } from 'consts/pageTemplates'
import { Grid } from 'components/SiteLayout/Grid'
import { RoutesLoading } from 'components/Routes/RoutesLoading'
import { Header } from 'components/Header/Header'
import { Footer } from 'components/Footer/Footer'

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
                <RoutesLoading pageId={id} />
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

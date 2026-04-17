import localFont from 'next/font/local'
import StyledComponentsRegistry from '@/components/StyledComponents/StyledComponentsRegistry'
import { ReduxProvider } from '@/components/Redux/ReduxProvider'
import { ThemeInit } from '@/components/Theme/ThemeInit'
import { Head } from '@/components/Head/Head'
import { NoScript } from '@/components/NoScript/NoScript'
import { GlobalStyles } from '@/components/Global/GlobalStyles'
import { KeyEventsInit } from '@/components/KeyEvents/KeyEventsInit'
import { KeyEventsSkipToContent } from '@/components/KeyEvents/KeyEventsSkipToContent'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { THEME_CLASSNAME_LIGHT } from '@/utils/theme'
import { getRootRoutes } from '@/utils/root-routes'
import { ScrollToHashInit } from '@/components/ScrollToHash/ScrollToHashInit'
import { getDocsRoutes } from '@/utils/docs-routes'
import { SidebarNavigationProvider } from '@/components/SidebarNavigation/SidebarNavigationContext'
import { HeaderNavigationProvider } from '@/components/Header/HeaderNavigationContext'

const interRoman = localFont({
  src: '../assets/fonts/Inter-roman.var.woff2',
  weight: '400 900',
  style: 'normal',
  preload: true
})

type PropType = {
  children: React.ReactNode
}

export default async function RootLayout(props: PropType) {
  const { children } = props
  const htmlClassNames = [interRoman.className, THEME_CLASSNAME_LIGHT].join(' ')
  const headerRoutes = await getRootRoutes()
  const docsRoutes = await getDocsRoutes([])

  return (
    <StyledComponentsRegistry>
      <HeaderNavigationProvider routes={headerRoutes}>
        <SidebarNavigationProvider routes={docsRoutes}>
          <ReduxProvider>
            <GlobalStyles />

            <html lang="en" className={htmlClassNames}>
              <head>
                <Head />
              </head>

              <body>
                <ThemeInit />
                <KeyEventsInit />
                <ScrollToHashInit />
                <KeyEventsSkipToContent />
                <NoScript />
                <Header />

                {children}

                <Footer />
              </body>
            </html>
          </ReduxProvider>
        </SidebarNavigationProvider>
      </HeaderNavigationProvider>
    </StyledComponentsRegistry>
  )
}

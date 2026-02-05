import localFont from 'next/font/local'
import StyledComponentsRegistry from '@/components/StyledComponents/StyledComponentsRegistry'
import { ReduxProvider } from '@/components/Redux/ReduxProvider'
import { ThemeInit } from '@/components/Theme/ThemeInit'
import { Head } from '@/components/Head/Head'
import { NoScript } from '@/components/NoScript/NoScript'
import { GlobalStyles } from '@/components/GlobalStyles/GlobalStyles'
import { KeyEventsInit } from '@/components/KeyEvents/KeyEventsInit'
import { KeyEventsSkipToContent } from '@/components/KeyEvents/KeyEventsSkipToContent'
import { Header } from '@/components/Header/Header'

const interRoman = localFont({
  src: '../assets/fonts/Inter-roman.var.woff2',
  weight: '400 900',
  style: 'normal',
  preload: true
})

type PropType = {
  children: React.ReactNode
}

export default function RootLayout(props: PropType) {
  const { children } = props

  return (
    <StyledComponentsRegistry>
      <ReduxProvider>
        <GlobalStyles />
        <ThemeInit />
        <KeyEventsInit />

        <head>
          <Head />
        </head>

        <html lang="en" className={interRoman.className}>
          <body>
            <NoScript />
            <KeyEventsSkipToContent />
            <Header />

            {children}
          </body>
        </html>
      </ReduxProvider>
    </StyledComponentsRegistry>
  )
}

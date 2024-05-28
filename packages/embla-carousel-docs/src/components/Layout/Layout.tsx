import React, { PropsWithChildren } from 'react'
import { KeyEventsSkipToContent } from 'components/KeyEvents/KeyEventsSkipToContent'
import { GlobalStyles } from 'components/Layout/GlobalStyles/GlobalStyles'
import { PagePropType, PAGE_LAYOUTS } from 'consts/page'
import { PageGrid } from 'components/Page/PageGrid'
import { RoutesLoading } from 'components/Routes/RoutesLoading'
import { Header } from 'components/Header/Header'
import { Footer } from 'components/Footer/Footer'
import { RoutesInit } from 'components/Routes/RoutesInit'
import { ThemeInit } from 'components/Theme/ThemeInit'
import { KeyEventsInit } from 'components/KeyEvents/KeyEventsInit'
import { TableOfContentsInit } from 'components/TableOfContents/TableOfContentsInit'
import { ModalLoading } from 'components/Modal/ModalLoading'

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
    <>
      <GlobalStyles />
      <RoutesInit />
      <ThemeInit />
      <TableOfContentsInit tableOfContents={tableOfContents} />
      <KeyEventsInit />

      {isNotFoundPage ? (
        <>{children}</>
      ) : (
        <>
          <KeyEventsSkipToContent />
          <Header />
          <RoutesLoading pageId={id} />
          <ModalLoading />
          <PageGrid layout={layout}>{children}</PageGrid>
          <Footer />
        </>
      )}
    </>
  )
}

import React, { PropsWithChildren, useMemo } from 'react'
import { graphql } from 'gatsby'
import { Seo } from 'components/Seo/Seo'
import maskable from 'assets/images/maskable.png'
import { useSiteMetadata } from 'hooks/useSiteMetadata'
import { PageEditThisPage } from 'components/Page/PageEditThisPage'
import { PagePagination } from 'components/Page/PagePagination'
import { PageBreadcrumbs } from 'components/Page/PageBreadcrumbs'
import { MAIN_CONTENT_ID } from 'components/KeyNavigating/KeyNavigatingSkipToContent'
import { removeProtocol } from 'utils/removeProtocol'
import { Mdx } from 'components/Mdx/Mdx'
import {
  PagePropType,
  PageHeadPropType,
  PageDefaultLayoutType,
  PagePaginationType
} from 'consts/page'

export const query = graphql`
  query PageDefaultQuery($id: String) {
    mdx(id: { eq: $id }) {
      tableOfContents
      frontmatter {
        title
        description
        date(formatString: "DD MMMM YYYY")
      }
    }
  }
`

export const Head = (props: PageHeadPropType) => {
  const { data, pageContext } = props
  const { siteUrl, author } = useSiteMetadata()
  const { title = '', description, date } = data.mdx.frontmatter
  const dateToISOString = useMemo(
    () => new Date(`${date} UTC`).toISOString(),
    [date]
  )

  return (
    <Seo
      title={title}
      description={description}
      url={`${siteUrl}${pageContext.slug}`}
    >
      <script type="application/ld+json">
        {`
      {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "name": "${removeProtocol(siteUrl)}",
        "description": "${description}",
        "url": "${siteUrl}${pageContext.slug}",
        "headline": "${title}",
        "image": "${siteUrl}/share-image.png",
        "datePublished": "${dateToISOString}",
        "dateModified": "${dateToISOString}",
        "author": {
          "@type": "Person",
          "name": "${author}"
        },
        "publisher": {
          "@type": "Organization",
          "name": "${author}",
          "logo": {
            "@type": "ImageObject",
            "width": "512",
            "height": "512",
            "url": "${siteUrl}${maskable}"
          }
        }
      }
    `}
      </script>
    </Seo>
  )
}

export type PropType = PropsWithChildren<
  PagePropType<PageDefaultLayoutType, PagePaginationType>
>

const PageDefault = (props: PropType) => {
  const { pageContext, children } = props
  const { next, previous, filePath, id } = pageContext

  return (
    <>
      <PageBreadcrumbs id={id} />
      <article id={MAIN_CONTENT_ID}>
        <Mdx>{children}</Mdx>
      </article>
      <PageEditThisPage pageUrl={filePath} />
      <PagePagination previous={previous} next={next} />
    </>
  )
}

export default PageDefault

import React, { PropsWithChildren, useMemo } from 'react'
import { graphql } from 'gatsby'
import { Seo } from 'components/Seo/Seo'
import maskable from 'assets/images/maskable.png'
import { useSiteMetadata } from 'hooks/useSiteMetadata'
import { EditPage } from 'components/Page/EditPage'
import { Pagination } from 'components/Page/Pagination'
import { Breadcrumbs } from 'components/Page/Breadcrumbs'
import { SKIP_TO_CONTENT_ID } from 'components/TabAccess/SkipToContent'
import { RouteType } from 'components/Routes/Context'
import { removeProtocol } from 'utils/removeProtocol'
import { Mdx } from 'components/Mdx/Mdx'

export const query = graphql`
  query PageQuery($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        date(formatString: "DD MMMM YYYY")
      }
    }
  }
`

export type PropType = PropsWithChildren<{
  data: {
    mdx: {
      frontmatter: {
        title: string
        date: string
        description: string
      }
    }
  }
  pageContext: {
    id: string
    filePath: string
    next?: RouteType
    previous?: RouteType
    slug: string
  }
}>

const Page = (props: PropType) => {
  const { siteUrl, author } = useSiteMetadata()
  const { data, pageContext, children } = props
  const { next, previous, filePath, id } = pageContext
  const { frontmatter } = data.mdx
  const { title, description, date } = frontmatter
  const dateToISOString = useMemo(
    () => new Date(`${date} UTC`).toISOString(),
    [date],
  )

  return (
    <>
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
      <Breadcrumbs id={id} />
      <article id={SKIP_TO_CONTENT_ID}>
        <Mdx>{children}</Mdx>
      </article>
      <EditPage pageUrl={filePath} />
      <Pagination previous={previous} next={next} />
    </>
  )
}

export default Page

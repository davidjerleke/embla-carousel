import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { Seo } from 'components/Seo'
import maskable from 'assets/images/maskable.png'
import { useSiteMetadata } from 'hooks'
import { Mdx, EditPage, Pagination, Breadcrumbs } from 'components/Page'
import { RouteType } from 'components/Routes'
import { removeProtocol } from 'utils'

export const query = graphql`
  query PageQuery($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        description
        date(formatString: "DD MMMM YYYY")
      }
    }
  }
`

export type PropType = {
  data: {
    mdx: {
      body: string
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
}

const Page = (props: PropType) => {
  const { siteUrl, author } = useSiteMetadata()
  const { data, pageContext } = props
  const { next, previous, filePath, id } = pageContext
  const { frontmatter, body } = data.mdx
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
              "image": "${siteUrl}/share-image.jpg",
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
      <article>
        <Mdx body={body} />
      </article>
      <EditPage pageUrl={filePath} />
      <Pagination previous={previous} next={next} />
    </>
  )
}

export default Page

import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import maskable from 'assets/images/maskable.png'
import { graphql } from 'gatsby'
import { useSiteMetadata } from 'hooks/useSiteMetadata'
import { PageTemplatePropType } from 'consts/pageTemplates'
import { removeProtocol } from 'utils/removeProtocol'
import { Hero } from 'components/Hero/Hero'
import { Seo } from 'components/Seo/Seo'
import { Mdx } from 'components/Mdx/Mdx'

const MAX_WIDTH = '68.2rem'

const MdxWrapper = styled.div`
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
`

export const query = graphql`
  query HomeQuery($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        date(formatString: "DD MMMM YYYY")
      }
    }
  }
`

export const Head = () => {
  const { siteUrl, description } = useSiteMetadata()

  return (
    <Seo title={description} description={description} url={siteUrl}>
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "${removeProtocol(siteUrl)}",
          "description": "${description}",
          "url": "${siteUrl}/",
          "image": "${siteUrl}/share-image.png",
          "logo": "${siteUrl}${maskable}"
        }
      `}
      </script>
    </Seo>
  )
}

type PropType = PropsWithChildren<PageTemplatePropType>

const Home = (props: PropType) => {
  const { children } = props

  return (
    <>
      <Hero />
      <MdxWrapper>
        <Mdx>{children}</Mdx>
      </MdxWrapper>
    </>
  )
}

export default Home

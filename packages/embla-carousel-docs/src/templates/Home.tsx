import React from 'react'
import styled from 'styled-components'
import maskable from 'assets/images/maskable.png'
import { graphql } from 'gatsby'
import { useSiteMetadata } from 'hooks'
import { Hero } from 'components/Hero'
import { Seo } from 'components/Seo'
import { Mdx } from 'components/Page'
import { removeProtocol } from 'utils'

const MAX_WIDTH = '68.2rem'

const MdxWrapper = styled.div`
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
`

export const query = graphql`
  query HomeQuery($id: String) {
    mdx(id: { eq: $id }) {
      body
    }
  }
`

type PropType = {
  data: {
    mdx: {
      body: string
    }
  }
  pageContext: {
    id: string
  }
}

const Home = (props: PropType) => {
  const { body } = props.data.mdx
  const { siteUrl, description } = useSiteMetadata()

  return (
    <>
      <Seo title={description} description={description} url={siteUrl}>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "${removeProtocol(siteUrl)}",
              "description": "${description}",
              "url": "${siteUrl}/",
              "image": "${siteUrl}/share-image.jpg",
              "logo": "${siteUrl}${maskable}"
            }
          `}
        </script>
      </Seo>
      <Hero />
      <MdxWrapper>
        <Mdx body={body} />
      </MdxWrapper>
    </>
  )
}

export default Home

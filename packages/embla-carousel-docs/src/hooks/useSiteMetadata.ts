import { useStaticQuery, graphql } from 'gatsby'

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
  }
`

type SiteMetadataType = {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: string
      siteUrl: string
    }
  }
}

type UseSiteMetadataType = SiteMetadataType['site']['siteMetadata']

export const useSiteMetadata = (): UseSiteMetadataType => {
  const { site } = useStaticQuery<SiteMetadataType>(query)
  return site.siteMetadata
}

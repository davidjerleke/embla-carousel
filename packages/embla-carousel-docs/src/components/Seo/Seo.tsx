import React, { PropsWithChildren } from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from 'hooks'
import { removeProtocol } from 'utils'

type PropType = PropsWithChildren<{
  title: string
  description?: string
  lang?: string
  url: string
  meta?: {
    name?: string
    content: string
    property?: string
  }[]
}>

export const Seo = (props: PropType) => {
  const { title, description, lang = 'en', meta = [], url, children } = props
  const siteMetadata = useSiteMetadata()
  const metaDescription = description || siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      link={[
        {
          rel: 'canonical',
          href: url,
        },
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `article`,
        },
        {
          property: 'og:site_name',
          content: removeProtocol(siteMetadata.siteUrl),
        },
        {
          property: 'og:locale',
          content: 'en_EN',
        },
        {
          property: 'og:url',
          content: url,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        ...meta,
      ]}
    >
      {children}
    </Helmet>
  )
}

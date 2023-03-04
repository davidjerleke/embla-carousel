import React, { PropsWithChildren } from 'react'
import { useSiteMetadata } from 'hooks/useSiteMetadata'
import { removeProtocol } from 'utils/removeProtocol'
import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'

type PropType = PropsWithChildren<{
  title: string
  description?: string
  lang?: string
  url: string
}>

export const Seo = (props: PropType) => {
  const { title, description, lang = 'en', url, children } = props
  const siteMetadata = useSiteMetadata()
  const pageTitle = `${title} | ${kebabCaseToPascalCase(siteMetadata.title)}`
  const metaDescription = description || siteMetadata.description

  return (
    <>
      <html lang={lang} />
      <title>{pageTitle}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:type" content="article" />
      <meta name="og:locale" content="en_EN" />
      <meta name="og:url" content={url} />
      <meta
        name="og:site_name"
        content={removeProtocol(siteMetadata.siteUrl)}
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />

      {children}
    </>
  )
}

type PropType = {
  jsonLd: string
}

export function PageJsonLd(props: PropType) {
  const { jsonLd } = props

  return (
    <script
      type="application/ld+json"
      id="json-ld"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  )
}

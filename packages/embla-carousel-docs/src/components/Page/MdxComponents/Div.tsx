import React from 'react'

type PropType = {
  ['data-language']: string
}

export const Div = (props: PropType) => {
  const { ['data-language']: dataLanguage } = props
  const newProps = { ...props }
  if (dataLanguage) {
    newProps['data-language'] = dataLanguage.replace('-with-json', '')
  }

  return <div {...newProps} />
}

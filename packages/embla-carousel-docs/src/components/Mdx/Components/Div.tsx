import React from 'react'

// type PropType = {
//   ['data-language']: string
// }

type PropType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const Div = (props: PropType) => {
  const {
    /*['data-language']: dataLanguage, className */
  } = props

  console.log(props)

  // const newProps = { ...props }
  // if (dataLanguage) {
  //   newProps['data-language'] = dataLanguage.replace('-with-json', '')
  // }

  return <div {...props} />
}

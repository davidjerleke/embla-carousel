import React, { PropsWithChildren } from 'react'

export const isTabItemProps = (props: any): props is PropType => {
  return 'value' in props && 'label' in props
}

export type PropType = PropsWithChildren<{
  value: string
  label: string
  default?: boolean
  disabled?: boolean
}>

export const TabItem = (props: PropType) => {
  return <React.Fragment {...props} />
}

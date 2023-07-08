import React, { PropsWithChildren } from 'react'

export const isTabsItemProps = (
  props: PropType | PropsWithChildren<{}>
): props is PropType => {
  return 'value' in props && 'label' in props
}

export type PropType = PropsWithChildren<{
  value: string
  label: string
  default?: boolean
  disabled?: boolean
}>

export const TabsItem = (props: PropType) => {
  return <React.Fragment {...props} />
}

import { TabsGroupItemType } from 'consts/tabs'
import React, { PropsWithChildren } from 'react'

export type PropType = PropsWithChildren<{
  tab: TabsGroupItemType
  default?: boolean
  disabled?: boolean
}>

export const TabsItem = (props: PropType) => {
  return <React.Fragment {...props} />
}

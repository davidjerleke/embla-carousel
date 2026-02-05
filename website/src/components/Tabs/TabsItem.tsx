import { TabsGroupItemType } from '@/utils/tabs'
import React, { PropsWithChildren } from 'react'

export type PropType = PropsWithChildren<{
  tab: TabsGroupItemType
  default?: boolean
  disabled?: boolean
}>

export function TabsItem(props: PropType) {
  return <React.Fragment {...props} />
}

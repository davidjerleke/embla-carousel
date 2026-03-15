'use client'

import { Provider } from 'react-redux'
import { store } from '@/utils/redux'

type PropType = {
  children: React.ReactNode
}

export function ReduxProvider(props: PropType) {
  const { children } = props

  return <Provider store={store}>{children}</Provider>
}

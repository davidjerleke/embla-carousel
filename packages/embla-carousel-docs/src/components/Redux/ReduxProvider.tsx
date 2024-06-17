import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'consts/redux'

type PropType = {
  element: React.ReactNode
}

export const ReduxProvider = (props: PropType) => {
  const { element } = props
  const store = createStore()

  return <Provider store={store}>{element}</Provider>
}

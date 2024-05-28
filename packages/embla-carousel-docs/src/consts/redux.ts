import { configureStore } from '@reduxjs/toolkit'
import { themeName, themeReducer } from 'components/Theme/themeReducer'
import { routesName, routesReducer } from 'components/Routes/routesReducer'
import { tabsName, tabsReducer } from 'components/Tabs/tabsReducer'
import { modalName, modalReducer } from 'components/Modal/modalReducer'
import {
  tableOfContentsName,
  tableOfContentsReducer
} from 'components/TableOfContents/tableOfContentsReducer'
import {
  keyEventsName,
  keyEventsReducer
} from 'components/KeyEvents/keyEventsReducer'

export const createStore = () => {
  return configureStore({
    reducer: {
      [themeName]: themeReducer,
      [routesName]: routesReducer,
      [tableOfContentsName]: tableOfContentsReducer,
      [modalName]: modalReducer,
      [keyEventsName]: keyEventsReducer,
      [tabsName]: tabsReducer
    }
  })
}

export type AppStoreType = ReturnType<typeof createStore>
export type AppStoreGetStateType = AppStoreType['getState']
export type AppStateType = ReturnType<AppStoreGetStateType>
export type AppDispatchType = AppStoreType['dispatch']

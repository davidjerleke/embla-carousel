import { configureStore } from '@reduxjs/toolkit'
import { themeName, themeReducer } from '@/components/Theme/theme-reducer'
import { modalName, modalReducer } from '@/components/Modal/modal-reducer'
import {
  keyEventsName,
  keyEventsReducer
} from '@/components/KeyEvents/key-events-reducer'

/* CONSTS */
export type AppStoreType = typeof store
export type AppDispatchType = typeof store.dispatch
export type AppStoreGetStateType = typeof store.getState
export type AppStateType = ReturnType<AppStoreGetStateType>

/* UTILS */
export const store = configureStore({
  reducer: {
    [themeName]: themeReducer,
    [keyEventsName]: keyEventsReducer,
    [modalName]: modalReducer
  }
})

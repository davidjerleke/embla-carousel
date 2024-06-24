import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalsType } from 'consts/modal'
import { AppStateType } from 'consts/redux'

export type ModalsStateType = {
  loadingModals: ModalsType[]
  openModals: ModalsType[]
}

const initialState: ModalsStateType = {
  loadingModals: [],
  openModals: []
}

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalIsLoading: (state, action: PayloadAction<ModalsType>): void => {
      const modal = action.payload
      if (state.loadingModals.includes(modal)) return
      state.loadingModals = state.loadingModals.concat(action.payload)
    },
    removeModalIsLoading: (state, action: PayloadAction<ModalsType>): void => {
      const modal = action.payload
      if (!state.loadingModals.includes(modal)) return
      state.loadingModals = state.loadingModals.filter((key) => key !== modal)
    },
    setModalOpen: (state, action: PayloadAction<ModalsType>): void => {
      const modal = action.payload
      if (state.openModals.includes(modal)) return
      state.openModals = state.openModals.concat(action.payload)
    },
    setModalClosed: (state, action: PayloadAction<ModalsType>): void => {
      const modal = action.payload
      if (!state.openModals.includes(modal)) return
      state.openModals = state.openModals.filter((key) => key !== modal)
    }
  }
})

const { name, reducer } = modalsSlice
export { name as modalName, reducer as modalReducer }

export const {
  setModalIsLoading,
  removeModalIsLoading,
  setModalOpen,
  setModalClosed
} = modalsSlice.actions

export const selectModalLoading = (state: AppStateType): boolean =>
  state.modal.loadingModals.length > 0

export const selectIsModalOpen =
  (key: ModalsType) =>
  (state: AppStateType): boolean =>
    state.modal.openModals.includes(key)

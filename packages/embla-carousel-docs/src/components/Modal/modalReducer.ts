import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalsType } from 'consts/modal'
import { AppStateType } from 'consts/redux'

export type ModalsStateType = {
  isLoading: boolean
  openModals: ModalsType[]
}

const initialState: ModalsStateType = {
  isLoading: false,
  openModals: []
}

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalIsLoading: (
      state,
      action: PayloadAction<ModalsStateType['isLoading']>
    ): void => {
      state.isLoading = action.payload
    },
    setModalOpen: (state, action: PayloadAction<ModalsType>): void => {
      const modalToOpen = action.payload
      if (state.openModals.includes(modalToOpen)) return
      state.openModals = state.openModals.concat(action.payload)
    },
    setModalClosed: (state, action: PayloadAction<ModalsType>): void => {
      const modalToClose = action.payload
      if (!state.openModals.includes(modalToClose)) return
      state.openModals = state.openModals.filter((key) => key !== modalToClose)
    },
    setAllModalsClosed: (state): void => {
      state.openModals = []
    }
  }
})

const { name, reducer } = modalsSlice
export { name as modalName, reducer as modalReducer }

export const {
  setModalIsLoading,
  setModalOpen,
  setModalClosed,
  setAllModalsClosed
} = modalsSlice.actions

export const selectModalLoading = (state: AppStateType): boolean =>
  state.modal.isLoading

export const selectIsModalOpen =
  (key: ModalsType) =>
  (state: AppStateType): boolean =>
    state.modal.openModals.includes(key)

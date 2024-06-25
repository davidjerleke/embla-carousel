import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalsType } from 'consts/modal'
import { AppStateType } from 'consts/redux'

export type ModalsStateType = {
  loadingModals: ModalsType[]
  openModal: ModalsType | null
}

const initialState: ModalsStateType = {
  loadingModals: [],
  openModal: null
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
      state.openModal = modal
    },
    setModalClosed: (state, action: PayloadAction<ModalsType>): void => {
      const modal = action.payload
      if (state.openModal !== modal) return
      state.openModal = null
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
  (modal: ModalsType) =>
  (state: AppStateType): boolean =>
    state.modal.openModal === modal

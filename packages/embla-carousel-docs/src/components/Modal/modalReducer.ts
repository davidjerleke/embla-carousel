import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalsType } from 'consts/modal'
import { AppStateType } from 'consts/redux'

export type ModalsStateType = {
  openModal: ModalsType | null
}

const initialState: ModalsStateType = {
  openModal: null
}

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
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

export const { setModalOpen, setModalClosed } = modalsSlice.actions

export const selectIsModalOpen =
  (modal: ModalsType) =>
  (state: AppStateType): boolean =>
    state.modal.openModal === modal

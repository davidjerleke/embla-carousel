import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalsType } from '@/utils/modal'
import { AppStateType } from '@/utils/redux'

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
    setModalClosed: (state): void => {
      state.openModal = null
    }
  }
})

const { name, reducer } = modalsSlice
export { name as modalName, reducer as modalReducer }

export const { setModalOpen, setModalClosed } = modalsSlice.actions

export function selectIsModalOpen(modal: ModalsType) {
  return (state: AppStateType): boolean => state.modal.openModal === modal
}

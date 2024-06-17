import { useEffect } from 'react'
import { useAppDispatch } from 'hooks/useRedux'
import { setModalIsLoading } from 'components/Modal/modalReducer'

export const ModalLoadingTrigger = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setModalIsLoading(true))

    return () => {
      dispatch(setModalIsLoading(false))
    }
  }, [dispatch])

  return null
}

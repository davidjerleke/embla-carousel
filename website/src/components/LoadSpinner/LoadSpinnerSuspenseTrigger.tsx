import { useEffect } from 'react'

type PropType = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function LoadSpinnerSuspenseTrigger(props: PropType) {
  const { setIsLoading } = props

  useEffect(() => {
    setIsLoading(true)

    return () => {
      setIsLoading(false)
    }
  }, [setIsLoading])

  return null
}

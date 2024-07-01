import React, { Suspense, useState } from 'react'
import { LoadSpinnerSuspense } from 'components/LoadSpinner/LoadSpinnerSuspense'
import { LoadSpinnerSuspenseTrigger } from 'components/LoadSpinner/LoadSpinnerSuspenseTrigger'

type PropType = {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const LoadSpinnerWithSuspense = (props: PropType) => {
  const [isLoading, setIsLoading] = useState(false)
  const { children, fallback } = props

  return (
    <>
      <LoadSpinnerSuspense isVisible={isLoading} />
      <Suspense
        fallback={
          <>
            <LoadSpinnerSuspenseTrigger setIsLoading={setIsLoading} />
            {fallback && fallback}
          </>
        }
      >
        {children}
      </Suspense>
    </>
  )
}

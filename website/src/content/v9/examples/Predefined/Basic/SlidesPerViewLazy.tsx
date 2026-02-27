'use client'

import { ExamplesLazy } from '@/content/v9/examples/ExamplesLazy'

export function ExampleSlidesPerView() {
  return (
    <ExamplesLazy
      loader={() => {
        return import('@/content/v9/examples/Predefined/Basic/SlidesPerView')
      }}
    />
  )
}

'use client'

import { ExamplesLazy } from '@/content/v9/examples/ExamplesLazy'

export function ExampleFade() {
  return (
    <ExamplesLazy
      loader={() => {
        return import('@/content/v9/examples/Predefined/Plugins/Fade')
      }}
    />
  )
}

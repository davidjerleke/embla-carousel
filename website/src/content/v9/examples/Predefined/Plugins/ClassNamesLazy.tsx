'use client'

import { ExamplesLazy } from '@/content/v9/examples/ExamplesLazy'

export function ExampleClassNames() {
  return (
    <ExamplesLazy
      loader={() => {
        return import('@/content/v9/examples/Predefined/Plugins/ClassNames')
      }}
    />
  )
}

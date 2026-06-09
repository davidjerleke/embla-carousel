'use client'

import { EXAMPLES_WRAPPERS } from '@/content/v9/examples/examples-utils'
import { ExamplesLazy } from '@/content/v9/examples/ExamplesLazy'

export function ExampleDotButtons() {
  return (
    <ExamplesLazy
      wrapper={EXAMPLES_WRAPPERS.ONE_FORM_ROW}
      loader={() => {
        return import('@/content/v9/examples/Guides/DotButtons/DotButtons')
      }}
    />
  )
}

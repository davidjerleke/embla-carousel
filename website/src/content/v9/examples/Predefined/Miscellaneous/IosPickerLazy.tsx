'use client'

import { ExamplesLazy } from '@/content/v9/examples/ExamplesLazy'
import { EXAMPLES_WRAPPERS } from '@/content/v9/examples/examples-utils'

export function ExampleIosPicker() {
  return (
    <ExamplesLazy
      wrapper={EXAMPLES_WRAPPERS.IOS_PICKER}
      loader={() => {
        return import(
          '@/content/v9/examples/Predefined/Miscellaneous/IosPicker'
        )
      }}
    />
  )
}

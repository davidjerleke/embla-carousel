'use client'

import { ExamplesLazy } from '@/content/v8/examples/ExamplesLazy'
import { EXAMPLES_WRAPPERS } from '@/content/v8/examples/examples-utils'

export function ExampleIosPickerLoop() {
  return (
    <ExamplesLazy
      wrapper={EXAMPLES_WRAPPERS.IOS_PICKER}
      loader={() => {
        return import(
          '@/content/v8/examples/Predefined/Miscellaneous/IosPickerLoop'
        )
      }}
    />
  )
}

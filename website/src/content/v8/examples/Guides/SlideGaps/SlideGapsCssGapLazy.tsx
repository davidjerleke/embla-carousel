'use client'

import { EXAMPLES_WRAPPERS } from '@/content/v8/examples/examples-utils'
import { ExamplesLazy } from '@/content/v8/examples/ExamplesLazy'

export function ExampleSlideGapsCssGap() {
  return (
    <ExamplesLazy
      wrapper={EXAMPLES_WRAPPERS.TWO_FORM_ROWS}
      loader={() => {
        return import('@/content/v8/examples/Guides/SlideGaps/SlideGapsCssGap')
      }}
    />
  )
}

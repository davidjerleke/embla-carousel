'use client'

import { ExamplesLazy } from '@/content/v8/examples/ExamplesLazy'

export function ExampleDragFree() {
  return (
    <ExamplesLazy
      loader={() => {
        return import('@/content/v8/examples/Predefined/Basic/DragFree')
      }}
    />
  )
}

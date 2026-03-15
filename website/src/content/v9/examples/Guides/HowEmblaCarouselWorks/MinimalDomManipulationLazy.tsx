'use client'

import { ExamplesLazy } from '@/content/v9/examples/ExamplesLazy'

export function ExampleMinimalDomManipulation() {
  return (
    <ExamplesLazy
      loader={() => {
        return import(
          '@/content/v9/examples/Guides/HowEmblaCarouselWorks/MinimalDomManipulation'
        )
      }}
    />
  )
}

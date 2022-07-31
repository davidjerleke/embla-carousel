---
title: TypeScript
description: Learn how to setup Embla Carousel using TypeScript.
order: 3
date: 2021-02-21
---

# TypeScript

Before continuing with this guide, make sure to setup a working carousel following one of these setup guides:

- [module](/get-started/module/)
- [react](/get-started/react/)
- [vue](/get-started/vue/)

Embla Carousel and all its related packages are fully typed and has built-in type definitions, because they're written in TypeScript.

## Module usage

The `embla-carousel` package exports a set of useful types that you can import like so:

```ts
import EmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
  EmblaEventType,
} from 'embla-carousel'
```

You can use these types to create utilitiy functions. In this example the `EmblaCarouselType` is used to create a function that is responsible for setting up carousel buttons:

```ts
import EmblaCarousel, { EmblaCarouselType } from 'embla-carousel'

function setupEmblaButtons(embla: EmblaCarouselType): void {
  // Setup buttons code here
}

const emblaNodes: HTMLElement[] = Array.from(
  document.querySelectorAll('.embla'),
)

emblaNodes.forEach((emblaNode) => {
  const embla = EmblaCarousel(emblaNode)
  setupEmblaButtons(embla)
})
```

## React usage

The `embla-carousel-react` package exports the following set of useful types:

```ts
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
  EmblaEventType,
  UseEmblaCarouselType,
} from 'embla-carousel-react'
```

For example, you can use it to create type safe and re-usable Embla components. In the following example `EmblaOptionsType` is used to properly type the **options** prop:

```tsx
import React, { ReactNode } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'

type PropType = {
  options?: EmblaOptionsType
  slides: ReactNode[]
}

export const EmblaCarousel = (props: PropType) => {
  const { options, slides } = props
  const [emblaRef] = useEmblaCarousel(options)

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide, index) => (
          <div className="embla__slide" key={index}>
            {slide}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Plugin usage

Plugins also export type definitions. Their type definitions are **prefixed** with the **plugin name**:

```ts
import Autoplay, {
  AutoplayType,
  AutoplayOptionsType,
} from 'embla-carousel-autoplay'
```

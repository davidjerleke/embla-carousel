---
title: React
description: Learn how to setup Embla Carousel using React.
order: 1
date: 2021-02-21
---

# React

Start by installing the Embla Carousel **npm package** and add it to your dependencies.

```shell
npm install embla-carousel-react --save
```

### The component structure

Embla Carousel provides the handy `useEmblaCarousel` hook for seamless integration with React. A minimal setup requires an **overflow wrapper** and a **scroll container**. Start by adding the following structure to your carousel:

```jsx
import React from 'react'
import { useEmblaCarousel } from 'embla-carousel-react'

export const EmblaCarousel = () => {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">Slide 1</div>
        <div className="embla__slide">Slide 2</div>
        <div className="embla__slide">Slide 3</div>
      </div>
    </div>
  )
}
```

### Styling the carousel

The hook gives us a **ref** to attach to our wrapping element with the classname `embla`, which is needed to cover the scroll overflow. The element with the `container` classname is the scroll body that scrolls the slides. Continue by adding the following **CSS** to these elements:

```css
.embla {
  overflow: hidden;
}
.embla__container {
  display: flex;
}
.embla__slide {
  position: relative;
  flex: 0 0 100%;
}
```

### Accessing the carousel API

The `useEmblaCarousel` hook takes the Embla Carousel [options](/api/options/) object as an argument. Additionaly, you can access the [API](/api/) with a `useEffect` like demonstrated below:

```jsx{5, 7-11}
import React, { useEffect } from 'react'
import { useEmblaCarousel } from 'embla-carousel-react'

export const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  useEffect(() => {
    if (emblaApi) {
      // Embla API is ready
    }
  }, [emblaApi])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">Slide 1</div>
        <div className="embla__slide">Slide 2</div>
        <div className="embla__slide">Slide 3</div>
      </div>
    </div>
  )
}
```

Congratulations! You just created your first Embla Carousel component.

---
title: Add & Remove Slides
description: This guide demonstrates how to add or remove slides after Embla Carousel has been initialized.
order: 5
date: 2021-03-27
---

# Add & Remove Slides

This guide will show you **how** to **pick up slide changes** whether you're **adding** or **removing** slides. Embla Carousel has no internal mechanism for picking up any changes in slides. This **has to be done manually**, and we're going use the following methods to achieve this:

- [containerNode](/api/methods/#containernode)
- [reInit](/api/methods/#reinit)

### Add and remove slides with vanilla JavaScript

If you intend to add new slides to your carousel, you'll have to **reset** Embla Carousel **after** you've injected the slides into the carousel container. The following example is a simple function demonstrating this:

```js{3}
const addSlides = (embla, slidesToAdd) => {
  slidesToAdd.forEach((s) => embla.containerNode().appendChild(s))
  embla.reInit()
}
```

In the example above, the [reInit](/api/methods/#reinit) method will do a hard reset and pick up the new slides. Similarly, if you're removing slides, you should also reinitialize Embla Carousel afterwards:

```js{3}
const removeSlides = (embla, slidesToRemove) => {
  slidesToRemove.forEach((s) => embla.containerNode().removeChild(s))
  embla.reInit()
}
```

### Add and remove slides with React

React users can make use of the `useEffect` hook to pick up changes in slides. A common setup would be to pass your slides to your carousel component using its **props**. The following setup will **reset** the carousel after **slides** have been **added** or **removed**:

```jsx{9}
import React, { useEffect } from 'react'
import { useEmblaCarousel } from 'embla-carousel/react'

export const EmblaCarousel = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  useEffect(() => {
    if (emblaApi && emblaApi.slideNodes().length !== slides.length) {
      emblaApi.reInit()
    }
  }, [emblaApi, slides])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide, index) => (
          <div className="embla__slide" key={index}>{slide}</div>
        ))}
      </div>
    </div>
  )
}
```

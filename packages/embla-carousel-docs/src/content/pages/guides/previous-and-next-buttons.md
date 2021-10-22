---
title: Prev & Next Buttons
description: This guide demonstrates how to setup previous and next buttons using the Embla Carousel API.
order: 4
date: 2021-03-15
---

# Previous & Next Buttons

This guide will show you **how** to **add previous and next buttons** using the Embla Carousel [API](/api/). We're going to make use of the following methods to achieve this:

- [scrollPrev](/api/methods/#scrollprev)
- [scrollNext](/api/methods/#scrollnext)

### Button placement

Assuming your carousel is [draggable](/api/options/#draggable), it's important to note that the **root node** will **respond to pointer events**. The root node is the one that is passed to the `EmblaCarousel` initializer. In the following example, it has the class name `embla`:

```html
<div class="embla">
  <div class="embla__container">
    <div class="embla__slide">Slide 1</div>
    <div class="embla__slide">Slide 2</div>
    <div class="embla__slide">Slide 3</div>
  </div>
</div>
```

```js
const emblaNode = document.querySelector('.embla') // Root node
const embla = EmblaCarousel(emblaNode) // Passed to the initializer here
```

Therefore, it's **not a good idea** to place the previous and next buttons inside the root element, because a click on any of the buttons may trigger **unintended drag interactions** on the carousel.

To solve this, we're going to modify the minimal [HTML setup](/get-started/module/#the-html-structure) from the installation guide by creating a **viewport wrapper** around our container like so:

```html{2, 8}
<div class="embla">
  <div class="embla__viewport">
    <div class="embla__container">
      <div class="embla__slide">Slide 1</div>
      <div class="embla__slide">Slide 2</div>
      <div class="embla__slide">Slide 3</div>
    </div>
  </div>
</div>
```

Our new wrapper with the class name `embla__viewport` will act as our **new root element**, which will encapsulate the scroll container and respond to pointer events. Now, we're ready to place our buttons **outside** that wrapper:

```html{9-10}
<div class="embla">
  <div class="embla__viewport">
    <div class="embla__container">
      <div class="embla__slide">Slide 1</div>
      <div class="embla__slide">Slide 2</div>
      <div class="embla__slide">Slide 3</div>
    </div>
  </div>
  <button class="embla__prev">Prev</button>
  <button class="embla__next">Next</button>
</div>
```

### Adding click events with vanilla JavaScript

Adding event listeners to our buttons is easy. It just requires som basic JavaScript to get this done. First, we need to **grab our wrappers and buttons**:

```js
import EmblaCarousel from 'embla-carousel'

// Grab wrapper nodes
const rootNode = document.querySelector('.embla')
const viewportNode = rootNode.querySelector('.embla__viewport')

// Grab button nodes
const prevButtonNode = rootNode.querySelector('.embla__prev')
const nextButtonNode = rootNode.querySelector('.embla__next')
```

Now that we have our nodes, let's initialize our carousel and make our previous and next **buttons respond to clicks**. We'll use [scrollPrev](/api/methods/#scrollprev) and [scrollNext](/api/methods/#scrollnext) for this:

```js{5-6}
// Initialize the carousel
const embla = EmblaCarousel(viewportNode)

// Add click listeners
prevButtonNode.addEventListener('click', embla.scrollPrev, false)
nextButtonNode.addEventListener('click', embla.scrollNext, false)
```

### Adding click events with React

Modifying the minimal [component setup](/get-started/react/#the-component-structure) from the installation guide, we're going to use the `emblaApi` to create our `scrollPrev` and `scrollNext` functions:

```jsx{7-9,11-13,24,27}
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">Slide 1</div>
          <div className="embla__slide">Slide 2</div>
          <div className="embla__slide">Slide 3</div>
        </div>
      </div>
      <button className="embla__prev" onClick={scrollPrev}>
        Prev
      </button>
      <button className="embla__next" onClick={scrollNext}>
        Next
      </button>
    </div>
  )
}
```

---
title: Click Events
description: This guide demonstrates how to differentiate between click and drag events using the Embla Carousel API.
order: 6
date: 2021-04-22
---

# Click Events

This guide demonstrates how to **setup click events** on your **slides**, which will run when the user's pointer is pressed and unpressed and hasn't moved enough to start dragging. We're going to make use of the following methods to achieve this:

- [slideNodes](/api/methods/#slidenodes)
- [clickAllowed](/api/methods/#clickallowed)

### Adding click events with vanilla JavaScript

Our click handler is going to log the clicked slide index when the user clicks on a slide. Our handler **will only act** if the pointer interaction is a `click` event and will ignore `drag` events.

```js{2}
const onSlideClick = (index) => {
  if (embla.clickAllowed()) console.log(index)
}
```

The [clickAllowed](/api/methods/#clickallowed) method in our handler above will only return `true` when the user's pointer hasn't dragged the carousel. We can simply attach that handler to our slides like so:

```js
embla.slideNodes().forEach((slideNode, index) => {
  slideNode.addEventListener('click', () => onSlideClick(index), false)
})
```

### Adding click events with React

Adding click events to your slides with React is straightforward. We'll create a `onSlideClick` function wrapped in a `useCallback` and add that click handler to our slides. The important part here is to only run your desired code when the [clickAllowed](/api/methods/#clickallowed) method returns `true`.

```jsx{9, 21}
import React, { useCallback } from 'react'
import { useEmblaCarousel } from 'embla-carousel/react'

export const EmblaCarousel = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  const onSlideClick = useCallback(
    (index) => {
      if (emblaApi && emblaApi.clickAllowed()) console.log(index)
    },
    [emblaApi],
  )

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="embla__slide"
            onClick={() => onSlideClick(index)}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  )
}
```

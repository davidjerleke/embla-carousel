---
title: Breakpoints
description: This guide demonstrates how to customize Embla Carousel based on different breakpoints.
order: 3
date: 2021-03-22
---

# Breakpoints

This guide demonstrates how to customize your carousels for different breakpoints using the [flexbox](/guides/slide-container/#using-flexbox) setup. Embla Carousel offers a convenient way to customize your carousels based on different breakpoints including changing [options](/api/options/), using plain CSS.

### Changing slide sizes

Embla Carousel will **automatically pick up** any **changes in slide sizes** when the **window is resized**. It's a walk in the park to change slide sizes based on your breakpoints:

```css
.embla__slide {
  flex: 0 0 100%; /* Default slide covers 100% of the viewport */
}
@media (min-width: 768px) {
  .embla__slide {
    flex: 0 0 50%; /* Breakpoint SM slide covers 50% of the viewport */
  }
}
```

### Changing slide gaps

Embla Carousel will **automatically pick up** any **changes in gap sizes** when the **window is resized**. It's very simple to change gap sizes based on your breakpoints:

```css
.embla__slide {
  margin-right: 10px; /* Default slide gap */
}
@media (min-width: 768px) {
  .embla__slide {
    margin-right: 20px; /* Breakpoint SM gap */
  }
}
```

### Changing options

You can change your [options](/api/options/) based on your breakpoints right in your CSS. Embla Carousel will watch the **content** property of the pseudo element `:before` on your **root node**. The root node is the same element you pass to the Embla Carousel initializer:

```js{2}
const emblaNode = document.querySelector('.embla')
const embla = EmblaCarousel(emblaNode) // <-- This is the root node
```

For React users, the root node is the one that you attach the `emblaRef` to:

```jsx{4}
  const [emblaRef] = useEmblaCarousel()

  return (
    <div className="embla" ref={emblaRef}>
      ...
    </div>
  )
```

The **content** property has to contain a valid JSON object with the [options](/api/options/) you want to apply. Also make sure that the content isn't diplayed by adding `display: none` to the pseudo element. This is achieved like so:

```css-with-json
.embla:before {
  display: none;
  content: '{
    "draggable": true /* Draggable as default */
  }';
}
@media (min-width: 768px) {
  .embla:before {
    content: '{
      "draggable": false /* Not draggable SM up */
    }';
  }
}
```

### Option priority

The **pseudo options** object is always given the **highest priority**. It will be merged with the options passed to the `EmblaCarousel` initializer, and if any options are in conflict, the pseudo options will have precedence. In the following example:

```js
const options = { draggable: false } // <-- These options
const embla = EmblaCarousel(emblaNode, options)
```

```css-with-json
.embla:before {
  display: none;
  content: '{
    "draggable": true /* <-- Will be overridden by these */
  }';
}
```

The carousel in the example above will end up being draggable, because the pseudo options will override the initializer options.

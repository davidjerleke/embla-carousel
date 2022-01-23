---
title: Breakpoints
description: This guide demonstrates how to customize Embla Carousel based on different breakpoints.
order: 3
date: 2021-03-22
---

# Breakpoints

This guide demonstrates how to customize your carousels for different breakpoints using the [flexbox](/guides/slide-container/#using-flexbox) setup. Embla Carousel offers a convenient way to customize your carousels based on different breakpoints including changing [options](/api/options/), using plain CSS.

## Changing slide sizes

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

## Changing slide gaps

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

## Changing options

You can change your [options](/api/options/) based on your breakpoints right in your CSS. Here's an example of a carousel that's only draggable when the screen width is less than 768px:

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

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

You can provide [options](/api/options/) that will be applied for specific breakpoints using the [breakpoint](/api/options/#breakpoints) option.

Here's an example of a carousel that's only active when the screen width is less than 768px:

```js
const options = {
  active: true,
  breakpoints: {
    '(min-width: 768px)': { active: false },
  },
}
```

Because the default [active](/api/options/#active) value is `true`, we can omit it from the root level and achieve the same result as above like this:

```js
const options = {
  breakpoints: {
    '(min-width: 768px)': { active: false },
  },
}
```

When breakpoint options **are in conflict**, the last option in the breakpoints options will be applied:

```js
const options = {
  loop: false,
  breakpoints: {
    '(min-width: 768px)': { loop: true },
    '(min-width: 420px)': { loop: false }, // This will override the (min-width: 768px) breakpoint loop option
  },
}
```

If multiple queries match, they will be **merged**:

```js
const options = {
  loop: false, // --> 419px screens and down will apply { loop: false }
  breakpoints: {
    '(min-width: 420px)': { align: 'start' }, // --> 420px screens and up will apply { align: 'start', loop: false }
    '(min-width: 768px)': { loop: true }, // --> 768px screens and up will apply { align: 'start', loop: true }
  },
}
```

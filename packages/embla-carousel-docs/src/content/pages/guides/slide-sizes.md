---
title: Slide Sizes
description: This guide demonstrates how Embla Carousel handles slide sizes and how to customize them.
order: 3
date: 2021-03-13
---

# Slide Sizes

This guide will show you how to customize **slide sizes** for your carousels using the [flexbox](/guides/slide-container/#using-flexbox) setup. Embla Carousel supports horizontal and vertical carousels with the [axis](/api/options/#axis) option and that's why this guide will use the term **slide sizes** instead of **widths** or **heights**.

<Admonition type="note">

If you haven't read about how to setup your slide [container](/guides/slide-container/), please visit that guide before continuing with this.

</Admonition>

---

## Declaring sizes

Slide sizes should in most cases be **declared with CSS**. Embla Carousel **supports any slide size out of the box**, and will pick up whatever size you've declared in your CSS. A very simple setup could look like this:

```css
.embla__slide {
  flex: 0 0 50%; /* Slide covers 50% of the viewport */
  min-width: 0;
}
```

You can also declare your slide sizes using any other CSS unit like so:

```css
.embla__slide {
  flex: 0 0 200px; /* Slide covers 200px of the viewport */
  min-width: 0;
}
```

## Variable sizes

Variable slide sizes is also **supported out of the box**. Declare your slide sizes in your CSS or let the content of your slides determine their sizes.

```css
.embla__slide:nth-child(1) {
  flex: 0 0 30%; /* Slide covers 30% of the viewport */
  min-width: 0;
}
.embla__slide:nth-child(2) {
  flex: 0 0 60%; /* Slide covers 60% of the viewport */
  min-width: 0;
}
```

If you're letting your slide sizes adapt to their content, make sure that the **slide sizes don't exceed** the size of the **viewport**.

```css
.embla__slide {
  flex: 0 0 auto; /* Adapt slide size to its content */
  min-width: 0;
  max-width: 100%; /* Prevent from growing larger than viewport */
}
```

## Responding to breakpoints

Embla Carousel will **automatically pick up** any **changes in slide sizes** when the **window is resized**. It's very simple to set different sizes based on your breakpoints:

```css
.embla__slide {
  flex: 0 0 100%; /* Default slide covers 100% of the viewport */
  min-width: 0;
}
@media (min-width: 768px) {
  .embla__slide {
    flex: 0 0 50%; /* Breakpoint SM slide covers 50% of the viewport */
  }
}
```

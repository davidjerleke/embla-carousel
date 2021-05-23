---
title: Module
description: Learn how to setup Embla Carousel using vanilla JavaScript.
order: 0
date: 2021-02-21
---

# Module

First you need to install the **npm package** and save it to your dependencies:

```shell
npm install embla-carousel --save
```

### The HTML structure

A minimal setup requires an **overflow wrapper** and a **scroll container**. Start by adding the following **HTML** structure to your carousel:

```html
<div class="embla">
  <div class="embla__container">
    <div class="embla__slide">Slide 1</div>
    <div class="embla__slide">Slide 2</div>
    <div class="embla__slide">Slide 3</div>
  </div>
</div>
```

### Styling the carousel

The wrapping element with the classname `embla` is needed to cover the scroll overflow. The element with the `container` classname is the scroll body that scrolls the slides. Continue by adding the following **CSS** to these elements:

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

### Adding JavaScript

Now you're ready to add some **JavaScript** magic to give life to your first Embla Carousel. Grab the element with the classname `embla` and pass it as the first argument to the `EmblaCarousel` function:

```js
import EmblaCarousel from 'embla-carousel'

const emblaNode = document.querySelector('.embla')
const options = { loop: false }

const embla = EmblaCarousel(emblaNode, options)
```

Congratulations! You just created your first Embla Carousel.

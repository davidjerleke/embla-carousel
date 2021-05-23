---
title: CDN
description: Learn how to setup Embla Carousel using a CDN.
order: 2
date: 2021-02-21
---

# CDN

Start by including the Embla Carousel script from a CDN with a `script` tag:

```html
<script src="https://unpkg.com/embla-carousel/embla-carousel.umd.js"></script>
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

Now you're ready to add some **JavaScript** magic to give life to your first Embla Carousel. Make sure to place your script **after** the CDN `script` tag. Grab the element with the classname `embla` and pass it as the first argument to the `EmblaCarousel` function.

```html
<script type="text/javascript">
  var emblaNode = document.querySelector('.embla')
  var options = { loop: false }

  var embla = EmblaCarousel(emblaNode, options)
</script>
```

Congratulations! You just created your first Embla Carousel.

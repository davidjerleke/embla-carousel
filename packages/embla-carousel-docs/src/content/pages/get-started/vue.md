---
title: Vue
description: Learn how to setup Embla Carousel using Vue.
order: 2
date: 2021-02-21
---

# Vue

Start by installing the Embla Carousel **npm package** and add it to your dependencies.

```shell
npm install embla-carousel-vue --save
```

## The component structure

Embla Carousel provides the handy `emblaCarouselVue` function for seamless integration with Vue. A minimal setup requires an **overflow wrapper** and a **scroll container**. Start by adding the following structure to your carousel:

```html
<template>
  <div class="embla" ref="emblaNode">
    <div class="embla__container">
      <div class="embla__slide">Slide 1</div>
      <div class="embla__slide">Slide 2</div>
      <div class="embla__slide">Slide 3</div>
    </div>
  </div>
</template>

<script>
  import emblaCarouselVue from 'embla-carousel-vue'

  export default {
    setup() {
      const [emblaNode] = emblaCarouselVue()
      return { emblaNode }
    },
  }
</script>
```

## Styling the carousel

The `emblaCarouselVue` function gives us an **emblaNode** to attach to our wrapping element with the classname `embla`, which is needed to cover the scroll overflow. The element with the `container` classname is the scroll body that scrolls the slides. Continue by adding the following **CSS** to these elements:

```html
<style scoped>
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }
</style>
```

## Accessing the carousel API

The `emblaCarouselVue` function takes the Embla Carousel [options](/api/options/) as the first argument. Additionally, you can access the [API](/api/) with an `onMounted` like demonstrated below:

```html{17,19-23}
<template>
  <div class="embla" ref="emblaNode">
    <div class="embla__container">
      <div class="embla__slide">Slide 1</div>
      <div class="embla__slide">Slide 2</div>
      <div class="embla__slide">Slide 3</div>
    </div>
  </div>
</template>

<script>
  import { onMounted } from 'vue'
  import emblaCarouselVue from 'embla-carousel-vue'

  export default {
    setup() {
      const [emblaNode, emblaApi] = emblaCarouselVue({ loop: false })

      onMounted(() => {
        if (emblaApi.value) {
          // Embla API is ready
        }
      })

      return { emblaNode, emblaApi }
    },
  }
</script>
```

## Adding plugins

The `emblaCarouselVue` function also accepts [plugins](/plugins/) as the second argument. Note that plugins need to be passed in an array like so:

```html{13,17}
<template>
  <div class="embla" ref="emblaNode">
    <div class="embla__container">
      <div class="embla__slide">Slide 1</div>
      <div class="embla__slide">Slide 2</div>
      <div class="embla__slide">Slide 3</div>
    </div>
  </div>
</template>

<script>
  import emblaCarouselVue from 'embla-carousel-vue'
  import Autoplay from 'embla-carousel-autoplay'

  export default {
    setup() {
      const [emblaNode] = emblaCarouselVue({ loop: false }, [Autoplay()])
      return { emblaNode }
    },
  }
</script>
```

Congratulations! You just created your first Embla Carousel component.

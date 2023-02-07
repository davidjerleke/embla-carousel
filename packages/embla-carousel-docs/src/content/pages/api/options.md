---
title: Options
description: Discover how to customize Embla Carousel with its available options.
order: 0
date: 2021-02-21
---

# Options

Embla Carousel takes various **options** in order to customize how the carousel works. You can provide options in different ways.

## active

Type: <BrandPrimaryText>`boolean`</BrandPrimaryText>  
Default: <BrandSecondaryText>`true`</BrandSecondaryText>

Setting this to `false` will not activate or deactivate the carousel. Useful when used together with the [breakpoints](/api/options/#breakpoints) option to toggle the carousel active/inactive depending on media queries.

## axis

Type: <BrandPrimaryText>`string`</BrandPrimaryText>  
Default: <BrandSecondaryText>`x`</BrandSecondaryText>

Choose scroll axis between `x` and `y`. Remember to stack your slides horizontally or vertically using CSS to match this option.

## align

Type: <BrandPrimaryText>`string | number`</BrandPrimaryText>  
Default: <BrandSecondaryText>`center`</BrandSecondaryText>

Align the slides relative to the carousel viewport. Use one of the predefined alignments `start`, `center` or `end`. Alternatively, provide a number between `0 - 1` to align the slides, where **0.5 equals 50%**.

## breakpoints

Type: <BrandPrimaryText>`EmblaOptionsType`</BrandPrimaryText>  
Default: <BrandSecondaryText>`{}`</BrandSecondaryText>

An object with options that will be applied for a given breakpoint by overriding the options at the root level. Example: `'(min-width: 768px)': { loop: false }`. Note: If multiple queries match, they will be merged. And when breakpoint options clash, the last one in the list has precedence.

## direction

Type: <BrandPrimaryText>`string`</BrandPrimaryText>  
Default: <BrandSecondaryText>`ltr`</BrandSecondaryText>

Choose content direction between `ltr` and `rtl`. Please note that when using `rtl`, the content direction also has to be set to RTL, either by using the [HTML dir attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) or the [CSS direction](https://developer.mozilla.org/en-US/docs/Web/CSS/direction) property.

## slidesToScroll

Type: <BrandPrimaryText>`string | number`</BrandPrimaryText>  
Default: <BrandSecondaryText>`1`</BrandSecondaryText>

Group slides together. Drag interactions, dot navigation, and previous/next buttons are mapped to group slides into the given number, which has to be an integer. Set it to `auto` if you want Embla to group slides automatically.

## draggable

Type: <BrandPrimaryText>`boolean`</BrandPrimaryText>  
Default: <BrandSecondaryText>`true`</BrandSecondaryText>

Enables for scrolling the carousel with mouse and touch interactions.

## dragFree

Type: <BrandPrimaryText>`boolean`</BrandPrimaryText>  
Default: <BrandSecondaryText>`false`</BrandSecondaryText>

Enables momentum scrolling. The speed and duration of the continued scrolling is proportional to how vigorous the drag gesture is.

## loop

Type: <BrandPrimaryText>`boolean`</BrandPrimaryText>  
Default: <BrandSecondaryText>`false`</BrandSecondaryText>

Enables infinite looping. Automatically falls back to false if slide content isn't enough to loop. Embla will apply `translateX` or `translateY` to the slides that need to change position in order to create the loop effect.

## speed

Type: <BrandPrimaryText>`number`</BrandPrimaryText>  
Default: <BrandSecondaryText>`10`</BrandSecondaryText>

Adjust scroll speed when triggered by any of the API methods. Higher numbers enables faster scrolling. Drag interactions are not affected because speed is then determined by the drag force. Only values between `1`-`20` are recommended.

**Note:** The speed option is actually controlling the magnitude of the attraction force to the target (where the carousel is headed). This is because Embla uses a simple physics simulation when scrolling instead of transitions.

## startIndex

Type: <BrandPrimaryText>`number`</BrandPrimaryText>  
Default: <BrandSecondaryText>`0`</BrandSecondaryText>

Set the initial scroll snap to the given number. First snap index starts at 0. Please note that this is not necessarily equal to the number of slides when used together with the [slidesToScroll](/api/options/#slidestoscroll) option.

## containScroll

Type: <BrandPrimaryText>`string`</BrandPrimaryText>  
Default: <BrandSecondaryText>`''`</BrandSecondaryText>

Clear leading and trailing empty space that causes excessive scrolling. Use `trimSnaps` to only use snap points that trigger scrolling or `keepSnaps` to keep them.

## skipSnaps

Type: <BrandPrimaryText>`boolean`</BrandPrimaryText>  
Default: <BrandSecondaryText>`false`</BrandSecondaryText>

Allow the carousel to skip scroll snaps if it's dragged vigorously. Note that this option will be ignored if the [dragFree](/api/options/#dragfree) option is set to `true`.

## inViewThreshold

Type: <BrandPrimaryText>`number`</BrandPrimaryText>  
Default: <BrandSecondaryText>`0`</BrandSecondaryText>

Choose a fraction representing the percentage portion of a slide that needs to be visible in order to be considered in view. For example, **0.5 equals 50%**.

## Constructor options

The Embla Carousel constructor accepts an optional options object. Below you'll find examples of how to configure your carousel with option depending on which Embla package you are using.

### Vanilla JavaScript

The **second argument** of the `EmblaCarousel` constructor is the options object:

```js
import EmblaCarousel from 'embla-carousel'

const embla = EmblaCarousel(emblaNode, { loop: true })
```

### React

The **first argument** to the `useEmblaCarousel` hook is the options object:

```js
import useEmblaCarousel from 'embla-carousel-react'

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
```

### Vue

The **first argument** to the `emblaCarouselVue` function is the options object:

```js
import emblaCarouselVue from 'embla-carousel-vue'

const [emblaNode, emblaApi] = emblaCarouselVue({ loop: true })
```

## Global options

It's possible to set **global options** that will be applied to all your carousels. This allows for overriding the Embla default options with your own.

### Vanilla JavaScript global options

**Vanilla JavaScript** users can set global options by assigning them to the `EmblaCarousel` constructor:

```js
import EmblaCarousel from 'embla-carousel'

EmblaCarousel.globalOptions = { loop: true }
```

### React global options

**React** users can set global options by assigning them to the `useEmblaCarousel` hook:

```js
import useEmblaCarousel from 'embla-carousel-react'

useEmblaCarousel.globalOptions = { loop: true }
```

### Vue global options

**Vue** users can set global options by assigning them to the `emblaCarouselVue` function:

```js
import emblaCarouselVue from 'embla-carousel-vue'

emblaCarouselVue.globalOptions = { loop: true }
```

### Svelte global options

**Svelte** users can set global options by assigning them to the `emblaCarouselSvelte` action:

```js
import emblaCarouselSvelte from 'embla-carousel-svelte'

emblaCarouselSvelte.globalOptions = { loop: true }
```

Make sure to assign global options **before** initializing any carousel. You should **only assign it once**, because re-assigning global options can lead to confusing code and unexpected behaviour.

## Option priority

If two different option types are merged, and if any options are in conflict, the option type with the highest priority will have precedence. The **option priority** is as follows:

- [Constructor](/api/options/#constructor-options) options _(highest)_
- [Global](/api/options/#global-options) options _(lowest)_

In the following example:

```js
EmblaCarousel.globalOptions = { draggable: false }

const options = { draggable: true }
const embla = EmblaCarousel(emblaNode, options)
```

The carousel will end up being draggable, because the constructor options will override global options.

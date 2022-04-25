---
title: Options
description: Discover how to customize Embla Carousel with its available options.
order: 0
date: 2021-02-21
---

# Options

Embla Carousel takes various **options** in order to customize how the carousel works. You can provide options in different ways.

## Constructor options

The Embla Carousel constructor accepts an optional options object as the **second argument**. Here's an example of how to make use of it:

```js
import EmblaCarousel from 'embla-carousel'

const options = { loop: true } // Options
const embla = EmblaCarousel(emblaNode, options)
```

## Global options

It's possible to set **global options** that will be applied to all your carousels. This allows for overriding the Embla default options with your own. Global options are assigned like so:

```js
import EmblaCarousel from 'embla-carousel'

EmblaCarousel.globalOptions = { loop: true }
```

**React users** can also set global options by assigning them to the `useEmblaCarousel` hook:

```js
import useEmblaCarousel from 'embla-carousel-react'

useEmblaCarousel.globalOptions = { loop: true }
```

Make sure to assign global options **before** initializing any carousel. You should **only assign it once**, because re-assigning global options can lead to confusing code and unexpected behaviour.

## Pseudo options

You can set your options right in your CSS. Embla Carousel will watch the **content** property of the pseudo element `:before` on its **root node**. The **content** property has to contain a valid JSON object with the options you want to apply. Also, make sure that the content isn't displayed:

```css-with-json
.embla:before {
  display: none;
  content: '{ "draggable": true }';  /* <--- put it on a single line */
}
```

The **root node** is the element you pass to the Embla Carousel constructor:

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

## Option priority

If two different option types are merged, and if any options are in conflict, the option type with the highest priority will have precedence. The **option priority** is as follows:

- [Pseudo](/api/options/#pseudo-options) options _(highest)_
- [Constructor](/api/options/#constructor-options) options
- [Global](/api/options/#global-options) options _(lowest)_

In the following example:

```js
const options = { draggable: false } // <-- These options
const embla = EmblaCarousel(emblaNode, options)
```

```css-with-json
.embla:before {
  display: none;
  content: '{ "draggable": true }'; /* <-- Will be overridden by these */
}
```

The carousel will end up being draggable, because the pseudo options will override the constructor options.

### axis

Type: <BrandPrimaryText>`string`</BrandPrimaryText>  
Default: <BrandSecondaryText>`x`</BrandSecondaryText>

Choose scroll axis between `x` and `y`. Remember to stack your slides horizontally or vertically using CSS to match this option.

### align

Type: <BrandPrimaryText>`string | number`</BrandPrimaryText>  
Default: <BrandSecondaryText>`center`</BrandSecondaryText>

Align the slides relative to the carousel viewport. Use one of the predefined alignments `start`, `center` or `end`. Alternatively, provide a number between `0 - 1` to align the slides, where **0.5 equals 50%**.

### direction

Type: <BrandPrimaryText>`string`</BrandPrimaryText>  
Default: <BrandSecondaryText>`ltr`</BrandSecondaryText>

Choose content direction between `ltr` and `rtl`. Please note that when using `rtl`, the content direction also has to be set to RTL, either by using the [HTML dir attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) or the [CSS direction](https://developer.mozilla.org/en-US/docs/Web/CSS/direction) property.

### slidesToScroll

Type: <BrandPrimaryText>`string | number`</BrandPrimaryText>  
Default: <BrandSecondaryText>`1`</BrandSecondaryText>

Group slides together. Drag interactions, dot navigation, and previous/next buttons are mapped to group slides into the given number, which has to be an integer. Set it to `auto` if you want Embla to group slides automatically.

### draggable

Type: <BrandPrimaryText>`boolean`</BrandPrimaryText>  
Default: <BrandSecondaryText>`true`</BrandSecondaryText>

Enables for scrolling the carousel with mouse and touch interactions.

### dragFree

Type: <BrandPrimaryText>`boolean`</BrandPrimaryText>  
Default: <BrandSecondaryText>`false`</BrandSecondaryText>

Enables momentum scrolling. The speed and duration of the continued scrolling is proportional to how vigorous the drag gesture is.

### loop

Type: <BrandPrimaryText>`boolean`</BrandPrimaryText>  
Default: <BrandSecondaryText>`false`</BrandSecondaryText>

Enables infinite looping. Slides need `position: relative;` for this to work. Automatically falls back to false if slide content isn't enough to loop.

### speed

Type: <BrandPrimaryText>`number`</BrandPrimaryText>  
Default: <BrandSecondaryText>`10`</BrandSecondaryText>

Adjust scroll speed when triggered by any of the API methods. Higher numbers enables faster scrolling. Drag interactions are not affected because speed is then determined by the drag force.

### startIndex

Type: <BrandPrimaryText>`number`</BrandPrimaryText>  
Default: <BrandSecondaryText>`0`</BrandSecondaryText>

Set the initial scroll snap to the given number. First snap index starts at 0. Please note that this is not necessarily equal to the number of slides when used together with the [slidesToScroll](/api/options/#slidestoscroll) option.

### containScroll

Type: <BrandPrimaryText>`string`</BrandPrimaryText>  
Default: <BrandSecondaryText>`''`</BrandSecondaryText>

Clear leading and trailing empty space that causes excessive scrolling. Use `trimSnaps` to only use snap points that trigger scrolling or `keepSnaps` to keep them.

### skipSnaps

Type: <BrandPrimaryText>`boolean`</BrandPrimaryText>  
Default: <BrandSecondaryText>`false`</BrandSecondaryText>

Allow the carousel to skip scroll snaps if it's dragged vigorously. Note that this option will be ignored if the [dragFree](/api/options/#dragfree) option is set to `true`.

### inViewThreshold

Type: <BrandPrimaryText>`number`</BrandPrimaryText>  
Default: <BrandSecondaryText>`0`</BrandSecondaryText>

Choose a fraction representing the percentage portion of a slide that needs to be visible in order to be considered in view. For example, **0.5 equals 50%**.

---
title: Options
description: Discover how to customize Embla Carousel with its available options.
order: 0
date: 2021-02-21
---

# Options

Embla Carousel accepts an optional **options** object as the second argument. Here's an example of how to make use of it:

```js
const options = { loop: true }
const embla = EmblaCarousel(emblaNode, options)
```

### axis

Type: `string`  
Default: `x`

Choose scroll axis between `x` and `y`. Remember to stack your slides horizontally or vertically using CSS to match this option.

### align

Type: `string | number`  
Default: `center`

Align the slides relative to the carousel viewport. Use one of the predefined alignments `start`, `center` or `end`. Alternatively, provide a number between 0 - 1 to align the slides, where **0.5 equals 50%**.

### direction

Type: `string`  
Default: `ltr`

Choose content direction between `ltr` and `rtl`. Please note that when using `rtl`, the content direction also has to be set to RTL, either by using the HTML dir attribute or the CSS direction property.

### slidesToScroll

Type: `number`  
Default: `1`

Group slides together. Drag interactions, dot navigation, and previous/next buttons are mapped to group slides into the given number.

### draggable

Type: `boolean`  
Default: `true`

Enables for scrolling the carousel with mouse and touch interactions.

### dragFree

Type: `boolean`  
Default: `false`

Enables momentum scrolling. The speed and duration of the continued scrolling is proportional to how vigorous the drag gesture is.

### loop

Type: `boolean`  
Default: `false`

Enables infinite looping. Slides need `position: relative;` for this to work. Automatically falls back to false if slide content isn't enough to loop.

### speed

Type: `number`  
Default: `10`

Adjust scroll speed when triggered by any of the API methods. Higher numbers enables faster scrolling. Drag interactions are not affected because speed is then determined by the drag force.

### startIndex

Type: `number`  
Default: `0`

Set the initial scroll snap to the given number. First snap index starts at 0. Please note that this is not necessarily equal to the number of slides when used together with the [slidesToScroll](/api/options/#slidestoscroll) option.

### containScroll

Type: `string`  
Default: `''`

Clear leading and trailing empty space that causes excessive scrolling. Use `trimSnaps` to only use snap points that trigger scrolling or `keepSnaps` to keep them.

### skipSnaps

Type: `boolean`  
Default: `false`

Allow the carousel to skip scroll snaps if it's dragged vigorously. Note that this option will be ignored if the [dragFree](/api/options/#dragfree) option is set to `true`.

### inViewThreshold

Type: `number`  
Default: `0`

Choose a fraction representing the percentage portion of a slide that needs to be visible in order to be considered in view. For example, **0.5 equals 50%**.

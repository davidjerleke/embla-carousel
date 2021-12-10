---
title: Wheel Gestures
description: Learn how to add this Wheel Gesture plugin to Embla Carousel
order: 2
date: 2021-11-22
---

# Wheel Gestures

This plugin is used to extend Embla Carousel with the ability to use the mouse/trackpad wheel to navigate through the carousel.

## Installation

First you need to install the **npm package** and save it to your dependencies:

```shell
npm install embla-carousel-wheel-gestures --save
```

Alternatively, you can use a **CDN** to include it in your project:

```html
<script src="https://unpkg.com/embla-carousel-wheel-gestures/dist/embla-carousel-wheel-gestures.umd.js"></script>
```

## Usage

This plugin accepts a single **optional** parameter, which is its [options](/plugins/wheel-gestures/#options) object that allows you to configure it.

```js
import EmblaCarousel from 'embla-carousel'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

const wheelGestures = WheelGesturesPlugin()
const embla = EmblaCarousel(emblaRoot, { loop: false }, [wheelGestures])
```

## Options

The Wheel Gestures plugin accepts an optional **options** object as the first argument. Here's an example of how to make use of it:

```js
import EmblaCarousel from 'embla-carousel'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

const wheelGestures = WheelGesturesPlugin({
  wheelDraggingClass: 'my-wheel-class',
})
const embla = EmblaCarousel(emblaRoot, { loop: false }, [wheelGestures])
```

### wheelDraggingClass

Type: <BrandPrimaryText>`string`</BrandPrimaryText>  
Default: <BrandSecondaryText>`is-wheel-dragging`</BrandSecondaryText>

Choose a classname that will be applied to the container during a wheel gesture. Pass an empty string to opt-out.

### forceWheelAxis

Type: <BrandPrimaryText>`string | undefined`</BrandPrimaryText>  
Default: <BrandSecondaryText>`undefined`</BrandSecondaryText>

Force an axis on which to listen for wheel events. Choose scroll axis between `x` and `y`. Useful if you want to slide horizontally when scrolling vertically or vice versa.

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

## Usage

This plugin accepts a single **optional** parameter, which is its [options](/plugins/wheel-gestures/#options) object that allows you to configure it.

```js
const wheelGestures = WheelGesturesPlugin()
const embla = EmblaCarousel(emblaRoot, { loop: false }, [wheelGestures])
```

## Options

The Class Name plugin accepts an optional **options** object as the first argument. Here's an example of how to make use of it:

```js
const wheelGestures = WheelGesturesPlugin({
  wheelDraggingClass: 'my-wheel-class',
})
const embla = EmblaCarousel(emblaRoot, { loop: false }, [wheelGestures])
```

### wheelDraggingClass

Type: <BrandPrimaryText>`string`</BrandPrimaryText>  
Default: <BrandSecondaryText>`is-wheel-dragging`</BrandSecondaryText>

Choose a classname that will be applied to the container during a wheel gesture. Pass an empty string to opt-out.

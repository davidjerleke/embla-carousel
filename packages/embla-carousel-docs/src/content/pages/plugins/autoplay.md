---
title: Autoplay
description: Learn how to add this Autoplay plugin to Embla Carousel
order: 0
date: 2021-03-13
---

# Autoplay

This plugin is used to extend Embla Carousel with **autoplay** functionality. It comes with a useful set of options that allows you to customize it to your liking.

## Installation

First you need to install the **npm package** and save it to your dependencies:

```shell
npm install embla-carousel-autoplay --save
```

Alternatively, you can use a **CDN** to include it in your project:

```html
<script src="https://unpkg.com/embla-carousel-autoplay/embla-carousel-autoplay.umd.js"></script>
```

## Usage

This plugin accepts two **optional** parameters. The **first parameter** is the autoplay [options](/plugins/autoplay/#options) object that allows you to configure it. The **second parameter** allows you to choose a **custom root node** for the autoplay plugin. If this parameter is omitted, the Embla Carousel root node will be used as a default.

```js
const options = { delay: 4000 } // Options
const autoplayRoot = (emblaRoot) => emblaRoot.parentElement // Root node
const autoplay = Autoplay(options, autoplayRoot)

const embla = EmblaCarousel(emblaRoot, { loop: false }, [autoplay]) // Add plugin
```

## Options

The Autoplay plugin accepts an optional **options** object as the first argument. Here's an example of how to make use of it:

```js
const options = { delay: 4000 }
const autoplay = Autoplay(options)
```

### delay

Type: `number`  
Default: `4000`

Delay between transitions in milliseconds.

### stopOnInteraction

Type: `boolean`  
Default: `true`

If set to `false`, autoplay will not be disabled after drag interactions, and it will restart every time after the interaction.

### stopOnMouseEnter

Type: `boolean`  
Default: `false`

When enabled, autoplay will pause when a mouse pointer enters the Embla Carousel container. If [stopOnInteraction](/plugins/autoplay/#stoponinteraction) is also enabled, it will stop autoplay entirely instead of pausing it.

### stopOnLastSnap

Type: `boolean`  
Default: `false`

If this parameter is enabled, autoplay will be stopped when it reaches last slide.

## Methods

The Autoplay pliugin exposes a set of **useful methods** which lets you control it. Assuming you've stored the plugin instance in a variable, a method is called like demonstrated below:

```js
const options = { delay: 4000 }
const autoplay = Autoplay(options)

autoplay.stop() // Method
```

### play

Parameters: `none`  
Returns: `void`

Start autoplay.

### stop

Parameters: `none`  
Returns: `void`

Stop autoplay.

### reset

Parameters: `none`  
Returns: `void`

If [stopOnInteraction](/plugins/autoplay/#stoponinteraction) is set to `false`, this will restart the autoplay timer. If not, this method stops autoplay.

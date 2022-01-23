---
title: Autoplay
description: Learn how to add this Autoplay plugin to Embla Carousel
order: 0
date: 2021-03-13
---

# Autoplay

<RepositoryLink to="https://github.com/davidcetinkaya/embla-carousel/tree/master/packages/embla-carousel-autoplay">View plugin on GitHub</RepositoryLink>

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
import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

const options = { delay: 4000 } // Options
const autoplayRoot = (emblaRoot) => emblaRoot.parentElement // Root node
const autoplay = Autoplay(options, autoplayRoot)

const embla = EmblaCarousel(emblaRoot, { loop: false }, [autoplay]) // Add plugin
```

## Options

The Autoplay plugin accepts an optional **options** object as the first argument. Here's an example of how to make use of it:

```js
import Autoplay from 'embla-carousel-autoplay'

const options = { delay: 4000 }
const autoplay = Autoplay(options)
```

### delay

Type: <BrandPrimaryText>`number`</BrandPrimaryText>  
Default: <BrandSecondaryText>`4000`</BrandSecondaryText>

Delay between transitions in milliseconds.

### playOnInit

Type: <BrandPrimaryText>`boolean`</BrandPrimaryText>  
Default: <BrandSecondaryText>`true`</BrandSecondaryText>

If set to `false`, you'll have to start autoplay yourself by calling the [play](/plugins/autoplay/#play) method.

### stopOnInteraction

Type: <BrandPrimaryText>`boolean`</BrandPrimaryText>  
Default: <BrandSecondaryText>`true`</BrandSecondaryText>

If set to `false`, autoplay will not be disabled after drag interactions, and it will restart every time after the interaction.

### stopOnMouseEnter

Type: <BrandPrimaryText>`boolean`</BrandPrimaryText>  
Default: <BrandSecondaryText>`false`</BrandSecondaryText>

When enabled, autoplay will pause when a mouse pointer enters the Embla Carousel container. If [stopOnInteraction](/plugins/autoplay/#stoponinteraction) is also enabled, it will stop autoplay entirely instead of pausing it.

### stopOnLastSnap

Type: <BrandPrimaryText>`boolean`</BrandPrimaryText>  
Default: <BrandSecondaryText>`false`</BrandSecondaryText>

If this parameter is enabled, autoplay will be stopped when it reaches last slide.

## Methods

The Autoplay plugin exposes a set of **useful methods** which lets you control it. Assuming you've stored the plugin instance in a variable, a method is called like demonstrated below:

```js
import Autoplay from 'embla-carousel-autoplay'

const options = { delay: 4000 }
const autoplay = Autoplay(options)

autoplay.stop() // Method
```

### play

Parameters: <BrandPrimaryText>`none`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`void`</BrandSecondaryText>

Start autoplay.

### stop

Parameters: <BrandPrimaryText>`none`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`void`</BrandSecondaryText>

Stop autoplay.

### reset

Parameters: <BrandPrimaryText>`none`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`void`</BrandSecondaryText>

If [stopOnInteraction](/plugins/autoplay/#stoponinteraction) is set to `false`, this will restart the autoplay timer. If not, this method stops autoplay.

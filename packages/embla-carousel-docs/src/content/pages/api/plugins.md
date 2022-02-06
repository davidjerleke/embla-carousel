---
title: Plugins
description: Learn how to add plugins to Embla Carousel and extend it.
order: 3
date: 2021-11-06
---

# Plugins

The Embla Carousel constructor accepts an optional **plugin array** as the thrid argument, which enables you to **extend your carousels** with additional features.

## Adding a plugin

Here's a basic example of how to make use of it:

```js
import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

const options = { loop: true }
const plugins = [Autoplay()] // Plugins

const embla = EmblaCarousel(emblaNode, options, plugins) // Add plugins
```

You can find a complete list of plugins [here](/plugins/).

## Options

Plugins have their own specific **options** that allows for configuring the plugin to your liking. Here's how to make use of it:

```js
import Autoplay from 'embla-carousel-autoplay'

const autoplayOptions = { delay: 2000 }
const autoplay = Autoplay(autoplayOptions)
```

Most plugins allows you to set **global options** that will be applied to all instances. This allows for overriding the default plugin options with your own:

```js
import Autoplay from 'embla-carousel-autoplay'

Autoplay.globalOptions = { delay: 4000 }
```

Make sure to assign global options **before** initializing any instance. You should **only assign it once**, because re-assigning global options can lead to confusing code and unexpected behaviour.

## Methods

Additionally, some plugins expose their own **API methods**. You can make use of these by storing the plugin instance in a variable before passing it to the Embla Carousel initialiser:

```js
import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

const autoplay = Autoplay({ delay: 2000 })
const embla = EmblaCarousel(emblaNode, options, [autoplay])

autoplay.play() // Call plugin method
```

Read more about how to **customize your plugin** by picking a plugin from this [list](/plugins/).

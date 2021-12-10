---
title: Class Names
description: Learn how to add this Class Name plugin to Embla Carousel
order: 1
date: 2021-11-22
---

# Class Names

Class Names is a **class name toggle** utility plugin for Embla Carousel. It enables you to automate the toggling of the following class names on your carousel:

- `selected`
- `draggable`
- `dragging`

## Installation

First you need to install the **npm package** and save it to your dependencies:

```shell
npm install embla-carousel-class-names --save
```

Alternatively, you can use a **CDN** to include it in your project:

```html
<script src="https://unpkg.com/embla-carousel-class-names/embla-carousel-class-names.umd.js"></script>
```

## Usage

This plugin accepts a single **optional** parameter, which is its [options](/plugins/class-names/#options) object that allows you to configure it.

```js
import EmblaCarousel from 'embla-carousel'
import ClassNames from 'embla-carousel-class-names'

const options = { selected: 'my-selected-class' } // Options
const embla = EmblaCarousel(emblaRoot, { loop: false }, [ClassNames(options)]) // Add plugin
```

## Options

The Class Name plugin accepts an optional **options** object as the first argument. Here's an example of how to make use of it:

```js
import ClassNames from 'embla-carousel-class-names'

const options = { selected: 'my-selected-class' }
const classNames = ClassNames(options)
```

### selected

Type: <BrandPrimaryText>`string`</BrandPrimaryText>  
Default: <BrandSecondaryText>`is-selected`</BrandSecondaryText>

Choose a classname that will be applied to the selected slides. Pass an empty string to opt-out.

### draggable

Type: <BrandPrimaryText>`string`</BrandPrimaryText>  
Default: <BrandSecondaryText>`is-draggable`</BrandSecondaryText>

Choose a classname that will be applied to a draggable carousel container. Pass an empty string to opt-out.

### dragging

Type: <BrandPrimaryText>`string`</BrandPrimaryText>  
Default: <BrandSecondaryText>`is-dragging`</BrandSecondaryText>

Choose a classname that will be applied to the container when dragging. Pass an empty string to opt-out.

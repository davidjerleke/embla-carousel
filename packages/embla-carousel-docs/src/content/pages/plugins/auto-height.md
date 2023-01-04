---
title: Auto Height
description: Learn how to add this Auto Height plugin to Embla Carousel
order: 1
date: 2022-01-14
---

# Auto Height

<RepositoryLink to="https://github.com/davidjerleke/embla-carousel/tree/master/packages/embla-carousel-auto-height">View plugin on GitHub</RepositoryLink>

This plugin is used to extend Embla Carousel with **auto height** functionality. It changes the height of the carousel container to fit the height of the highest slide in view.

## Installation

First you need to install the **npm package** and save it to your dependencies:

```shell
npm install embla-carousel-auto-height --save
```

Alternatively, you can use a **CDN** to include it in your project:

```html
<script src="https://unpkg.com/embla-carousel-auto-height/embla-carousel-auto-height.umd.js"></script>
```

## Usage

This plugin accepts a single **optional** parameter, which is its [options](/plugins/auto-height/#options) object that allows you to configure it.

```js
import EmblaCarousel from 'embla-carousel'
import AutoHeight from 'embla-carousel-auto-height'

const embla = EmblaCarousel(emblaRoot, { loop: false }, [AutoHeight()]) // Add plugin
```

You can make use of CSS transitions to **transition height** changes. But beware: Transitioning height triggers reflow and may cause a performance hit.

```css
.embla__container {
  transition: height 0.2s;
}
```

If you've been following along with any of the guides in the [Get Started](/get-started/) section, you will probably want to make sure that each **slide height** is **determined** by the **content** it holds. Amend your CSS with the following to achieve this:

```css{3}
.embla__container {
  display: flex;
  align-items: flex-start; /* Add this */
}
```

## Options

The Auto Height plugin accepts an optional **options** object as the first argument. Here's an example of how to make use of it:

```js
import EmblaCarousel from 'embla-carousel'
import AutoHeight from 'embla-carousel-auto-height'

const autoHeightOptions = { destroyHeight: 'auto' } // Options

const embla = EmblaCarousel(emblaRoot, { loop: false }, [
  AutoHeight(autoHeightOptions), // Add plugin with options
])
```

### destroyHeight

Type: <BrandPrimaryText>`CSSStyleDeclaration.height`</BrandPrimaryText>  
Default: <BrandSecondaryText>`auto`</BrandSecondaryText>

Choose CSS height declaration that will be applied to the carousel container when the plugin is destroyed.

---
title: Methods
description: Explore Embla Carousel methods useful for extending the carousel beyond its native functionality.
order: 1
date: 2021-02-21
---

# Methods

Embla Carousel exposes a set of **useful methods** which makes it very **extensible**. Assuming you've stored the carousel instance in a variable, a method is called like demonstrated below.

```js
import EmblaCarousel from 'embla-carousel'

const embla = EmblaCarousel(emblaNode)
embla.scrollTo(4) // Method
```

### rootNode

Parameters: <BrandPrimaryText>`none`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`HTMLElement`</BrandSecondaryText>

Get the root node that holds the scroll container with slides inside. This method can be useful when you need to manipulate the root element dynamically or similar.

### containerNode

Parameters: <BrandPrimaryText>`none`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`HTMLElement`</BrandSecondaryText>

Get the container node that holds the slides. This method can be useful when you need to manipulate the container element dynamically or similar.

### slideNodes

Parameters: <BrandPrimaryText>`none`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`HTMLElement[]`</BrandSecondaryText>

Get all the slide nodes inside the container. This method can be useful when you need to manipulate the slide elements dynamically or similar.

### scrollNext

Parameters: <BrandPrimaryText>`jump?: boolean`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`void`</BrandSecondaryText>

Scroll to the next snap point if possible. When [loop](/api/options/#loop) is disabled and the carousel has reached the last snap point, this method won't do anything. Set the **jump** parameter to `true` when you want to go to the next slide instantly.

### scrollPrev

Parameters: <BrandPrimaryText>`jump?: boolean`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`void`</BrandSecondaryText>

Scroll to the previous snap point if possible. When [loop](/api/options/#loop) is disabled and the carousel has reached the first snap point, this method won't do anything. Set the **jump** parameter to `true` when you want to go to the previous slide instantly.

### scrollTo

Parameters: <BrandPrimaryText>`index: number`, `jump?: boolean`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`void`</BrandSecondaryText>

Scroll to a snap point by its unique index. If [loop](/api/options/#loop) is enabled, Embla Carousel will choose the closest way to the target snap point. Set the **jump** parameter to `true` when you want to go to the desired slide instantly.

### canScrollNext

Parameters: <BrandPrimaryText>`none`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`boolean`</BrandSecondaryText>

Check the possiblity to scroll to a next snap point. If [loop](/api/options/#loop) is enabled and the container holds any slides, this will always return true.

### canScrollPrev

Parameters: <BrandPrimaryText>`none`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`boolean`</BrandSecondaryText>

Check the possiblity to scroll to a previous snap point. If [loop](/api/options/#loop) is enabled and the container holds any slides, this will always return true.

### selectedScrollSnap

Parameters: <BrandPrimaryText>`none`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`number`</BrandSecondaryText>

Get the index of the selected snap point.

### previousScrollSnap

Parameters: <BrandPrimaryText>`none`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`number`</BrandSecondaryText>

Get the index of the previously selected snap point.

### scrollSnapList

Parameters: <BrandPrimaryText>`none`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`number[]`</BrandSecondaryText>

Get an array containing all the snap point positions. Each position represents how far the carousel needs to progress in order to reach this position.

### scrollProgress

Parameters: <BrandPrimaryText>`none`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`number`</BrandSecondaryText>

Check how far the carousel has scrolled of its scrollable length from 0 - 1. For example, **0.5 equals 50%**. For example, this can be useful when creating a scroll progress bar.

### slidesInView

Parameters: <BrandPrimaryText>`target?: boolean`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`number[]`</BrandSecondaryText>

Get slide indexes visible in the carousel viewport. Honors the [inViewThreshold](/api/options/#inviewthreshold) option. Set the **target** parameter to `true` when you want to get the slides visible at the scroll destination instead of the current scroll location.

### slidesNotInView

Parameters: <BrandPrimaryText>`target?: boolean`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`number[]`</BrandSecondaryText>

Get slide indexes not visible in the carousel viewport. Honors the [inViewThreshold](/api/options/#inviewthreshold) option. Set the **target** parameter to `true` when you want to get the slides not visible at the scroll destination instead of the current scroll location.

### clickAllowed

Parameters: <BrandPrimaryText>`none`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`boolean`</BrandSecondaryText>

For touch pointers, this method will return `false` when the gesture is a drag move or if the carousel is clicked during scroll. For mouse pointers, this method will only return `false` when the gesture is a drag move.

### reInit

Parameters: <BrandPrimaryText>`options?: EmblaOptionsType`, `plugins?: EmblaPluginType[]`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`void`</BrandSecondaryText>

Hard reset the carousel after it has been initialized. This method allows for changing [options](/api/options/) and [plugins](/api/plugins/). It's also useful when adding or removing slides, or picking up any other changes like slide dimensions. Note that passed options will be **merged** with current options, but passed plugins will **replace** current plugins.

### destroy

Parameters: <BrandPrimaryText>`none`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`void`</BrandSecondaryText>

Destroy the carousel instance permanently. This is a one way operation and is intended to be used as a cleanup measure when the carousel instance isn't needed anymore.

### on

Parameters: <BrandPrimaryText>`event: EmblaEventType`, `callback: Function`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`void`</BrandSecondaryText>

Subscribe to an Embla specific [event](/api/events/) with a callback.

### off

Parameters: <BrandPrimaryText>`event: EmblaEventType`, `callback: Function`</BrandPrimaryText>  
Returns: <BrandSecondaryText>`void`</BrandSecondaryText>

Unsubscribe from an Embla specific [event](/api/events/).

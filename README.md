# Embla Carousel &middot; ![GitHub](https://img.shields.io/github/license/davidcetinkaya/embla-carousel.svg?color=blue) ![npm](https://img.shields.io/npm/v/embla-carousel.svg) ![Travis (.org) branch](https://img.shields.io/travis/davidcetinkaya/embla-carousel/master.svg) ![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)

> An extensible low level carousel for the web, written in TypeScript.

Embla's purpose is to provide a low level carousel and allow developers to extend it by using its available methods. It doesn’t come with many options - just a few useful methods. Extend it with some very basic JavaScript and build awesome things! It's is 100% open source and free to use on both personal and commercial projects.

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [API](#api)
- [License](#license)

## Demo

See the [demo page](https://davidcetinkaya.github.io/embla-carousel).

## Installation

If you are using a module bundler...

```bash
yarn add embla-carousel
```

```javascript
import EmblaCarousel from 'embla-carousel'
const embla = EmblaCarousel(document.getElementById('embla'))
```

...or manually inject [this script](https://raw.githubusercontent.com/davidcetinkaya/embla-carousel/master/docs/index.js) into your website.

```html
<script src="embla.min.js"></script>
<script>
  const embla = EmblaCarousel(document.getElementById('embla'))
</script>
```

## Usage

Setup your HTML markup...

```html
<div class="embla" id="embla">
  <div class="embla__container">
    <div class="embla__slide">
      ...
    </div>
    <div class="embla__slide">
      ...
    </div>
    <div class="embla__slide">
      ...
    </div>
  </div>
</div>
```

...add some CSS...

```css
.embla {
  overflow: hidden;
}
.embla__container {
  display: flex;
  will-change: transform;
}
.embla__slide {
  position: relative;
  flex: 0 0 auto;
  width: 100%;
}
```

...initialize the script and pass the element node...

```javascript
import EmblaCarousel from 'embla-carousel'
const embla = EmblaCarousel(document.getElementById('embla'))
```

...and you're good to go!

## Options

Embla comes with a few optional settings that you can change by passing an object as the second argument. **Default** values are:

```javascript
const node = document.getElementById('embla')
const embla = EmblaCarousel(node, {
  align: 'center',
  container: '*',
  groupSlides: 1,
  draggable: true,
  dragFree: false,
  loop: false,
  speed: 10,
  startIndex: 0,
  selectedClass: 'is-selected',
  draggableClass: 'is-draggable',
  draggingClass: 'is-dragging',
})
```

**`align`** (string: start | center | end)  
Align the slides relative to the carousel viewport.

**`container`** (string: querySelectorString)  
The selector to use for the container that holds the slides. Embla will use all immediate children of this node as slides.

**`groupSlides`** (number)  
Groups slides together into groups of given size and makes each group act as a single slide.

**`draggable`** (boolean)  
Allow mouse and touch interactions to move the carousel.

**`dragFree`** (boolean)  
Determines if the carousel should snap to a slide position after mouse and touch interactions.

**`loop`** (boolean)  
Determines if the carousel should loop when start or end is reached.

**`speed`** (number: 5 - 20)  
Carousel speed when using buttons to navigate. A higher number will make transitions faster. Pointer events are not affected by this.

**`startIndex`** (number)  
Zero based index of the starting slide when carousel mounts.

**`selectedClass`** (string)  
Classname that will be applied to the selected slide.

**`draggableClass`** (string)  
Classname that will be applied to the wrapper when the carousel mounts if draggable is set to true.

**`draggingClass`** (string)  
Classname that will be applied to the wrapper when a pointer is dragging the carousel.

## API

Embla exposes a set of methods upon setup that can be used to control the carousel externally. Example usage looks like this...

```javascript
import EmblaCarousel from 'embla-carousel'
const embla = EmblaCarousel(document.getElementById('embla'))

embla.next()
```

...and the methods are:

**`getContainer()`**  
Gets the current container element node.

**`getSlides()`**  
Gets the slides as an array of element nodes.

**`getSelectedIndex()`**  
Gets the current selected slide index. First slide starts at index 0.

**`next()`**  
Goes to next item. If loop is disabled and the carousel is on the last slide this method will do nothing.

**`previous()`**  
Goes to previous item. If loop is disabled and the carousel is on the first slide this method will do nothing.

**`goTo(index: number)`**
Goes to item that matches passed index. If loop is enabled the carousel will seek the closest way to passed index.

**`changeOptions(options: options)`**  
Applies passed options by doing all the necessary calculations and reinitializing the carousel from scratch.

**`on(event: string, callback: function)`**  
Subscribes to a custom Embla event by firing the passed callback. Below is a list of events you can subscribe to:

- **`init`** - Triggers after the carousel has been initialized for the first time.
- **`destroy`** - Triggers after the carousel has been destroyed.
- **`select`** - Triggers when a new target slide has been selected.
- **`dragStart`** - Triggers when carousel dragging begins.
- **`dragEnd`** - Triggers when carousel dragging ends.

**`off(event: string, callback: function)`**  
Ends subscription to a custom Embla event by removing the passed callback. This works for all events listed on the **on** method.

**`destroy()`**  
Removes all styles applied to DOM nodes and kills all event listeners for this Embla instance.

## License

Embla is [MIT licensed](./LICENSE).

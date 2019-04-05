# Embla Carousel &middot; ![GitHub](https://img.shields.io/github/license/davidcetinkaya/embla-carousel.svg?color=blue) ![npm](https://img.shields.io/npm/v/embla-carousel.svg) ![Travis (.org) branch](https://img.shields.io/travis/davidcetinkaya/embla-carousel/master.svg) ![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)

> Simple and sensible carousels for the web, written in TypeScript.

Embla is a lightweight and simple carousel plugin for the web. Its purpose is to provide simple and extensible carousels that feels natural to interact with. It's 100% open source and free to use on both personal and commercial projects. Use it with the module bundler of your choice or by manually injecting the script.

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [API](#api)
- [License](#license)

## Demo

See the demo page [here](https://davidcetinkaya.github.io/embla-carousel).

## Installation

If you are using a module bundler...

```bash
yarn add embla-carousel
```

```javascript
import EmblaCarousel from 'embla-carousel'
const embla = EmblaCarousel(document.getElementById('embla'))
```

...or inject the minified script [here](https://raw.githubusercontent.com/davidcetinkaya/embla-carousel/master/docs/index.js) into your website.

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
  draggable: true,
  loop: false,
  speed: 10,
  startIndex: 0,
})
```

**`align`** (string: start | center | end)  
Align the slides relative to the carousel viewport.

**`container`** (string: querySelectorString)  
The selector to use for the container that holds the slides. Embla will use all immediate children of this node as slides.

**`draggable`** (boolean)  
Allow mouse and touch interactions to move the carousel.

**`loop`** (boolean)  
Determines if the carousel should loop when start or end is reached.

**`speed`** (number: 5 - 20)  
Carousel speed when using buttons to navigate. A higher number will make transitions faster. Pointer events are not affected by this.

**`startIndex`** (number)  
Zero based index of the starting slide when carousel mounts.

## API

Embla exposes a set of methods upon setup that can be used to control the carousel externally. Example usage looks like this...

```javascript
import EmblaCarousel from 'embla-carousel'
const embla = EmblaCarousel(document.getElementById('embla'))

embla.next()
```

...and the methods are:

**`next()`**  
Goes to next item. If loop is disabled and the carousel is on the last slide this method will do nothing.

**`previous()`**  
Goes to previous item. If loop is disabled and the carousel is on the first slide this method will do nothing.

**`goTo(index: number)`**
Goes to item that matches passed index. If loop is enabled the carousel will seek the closest way to passed index.

**`changeOptions(options: options)`**  
Reinitializes the carousel with passed options. This will do all the calculations and setup the carousel from scratch.

**`destroy()`**  
Removes all styles applied to DOM nodes and kills all event listeners for this Embla instance.

**`on(event: string, callback: function)`**  
Subscribes to a custom Embla event by firing the passed callback. Below is a list of events you can subscribe to:

- **init** - Triggers after the carousel has been initialized for the first time.
- **destroy** - Triggers after the carousel has been destroyed.
- **select** - Triggers when a new target slide has been selected.
- **dragStart** - Triggers when carousel dragging begins.
- **dragEnd** - Triggers when carousel dragging ends.

**`off(event: string, callback: function)`**  
Ends subscription to a custom Embla event by removing the passed callback. This works for all events listed on the **on** method.

## License

Embla is [MIT licensed](./LICENSE).

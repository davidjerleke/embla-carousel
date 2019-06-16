<br />
<p align="center">
  <a href="https://davidcetinkaya.github.io/embla-carousel" target="_blank"><img width="80" height="80" src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/embla-logo.svg" alt="Embla Carousel">
  </a>
</p>
<strong>
  <h1 align="center">Embla Carousel</h1>
</strong>
<p align="center">
  An extensible low level carousel for the web, written in TypeScript.
</p>
<p align="center">
  <a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
  <a href="https://www.npmjs.com/package/embla-carousel" target="_blank"><img src="https://img.shields.io/npm/v/embla-carousel.svg"></a>
  <a href="https://travis-ci.org/davidcetinkaya/embla-carousel" target="_blank"><img src="https://img.shields.io/travis/davidcetinkaya/embla-carousel/master.svg"></a>
  <a href="https://prettier.io" target="_blank"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat"></a>
</p>
<p align="center">
  <strong>
    <a href="https://davidcetinkaya.github.io/embla-carousel" target="_blank">« View Demo »</a>
  </strong>
</p>

## Table of contents

- [What's Embla?](#whats-embla)
- [Features](#features)
- [Installation](#installation)
- [QuickStart](#quickstart)
- [Options](#options)
- [API](#api)
- [Implementations](#implementations)
- [Contributing](#contributing)
- [License](#license)

## What's Embla?

Embla’s purpose is to provide a low level carousel and allow developers to extend it by using its available methods. Extend it with some very basic JavaScript and build awesome physics simulated carousels. It’s dependency free and 100% open source.

Try it here on the [Demo Page](https://davidcetinkaya.github.io/embla-carousel) or [CodeSandbox](https://codesandbox.io/s/embla-carousel-loop-false-oyols) ✨.

## Features

- **`Responsive out of the box`** - Choose any **%**-based slide widths.
- **`Seamless loop effect`** - No pauses or previous/next button throttling.
- **`Hardware accelerated`** - Smooth physics simulated animations.
- **`Extensible rich API`** - Comes with a low-level API to control the carousel.
- **`Realistic drag handling`** - Authentic cross device drag behaviour.

## Installation

If you are using a module bundler...

```bash

yarn add embla-carousel

```

```javascript
import EmblaCarousel from 'embla-carousel'
```

...or manually inject [this script](https://raw.githubusercontent.com/davidcetinkaya/embla-carousel/master/docs/index.js) into your website.

```html
<script src="embla.min.js"></script>
```

## QuickStart

Setup your HTML markup...

```html
<div class="embla">
  <div class="embla__container">
    <div class="embla__slide">
      Slide 1
    </div>
    <div class="embla__slide">
      Slide 2
    </div>
    <div class="embla__slide">
      Slide 3
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
const emblaNode = document.querySelector('.embla')
const options = { loop: true }
const embla = EmblaCarousel(emblaNode, options)
```

...and you're good to go!

## Options

Embla comes with a few optional settings that you can change by passing an object as the second argument. **Default** values are:

```javascript
const embla = EmblaCarousel(emblaNode, {
  align: 'center',
  containerSelector: '*',
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

**`containerSelector`** (string: querySelectorString)  
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
Classname that will be applied to the wrapper when the carousel mounts if `draggable` is `true`.

**`draggingClass`** (string)  
Classname that will be applied to the wrapper when a pointer is dragging the carousel.

## API

Embla exposes a set of methods upon setup that can be used to control the carousel externally. Usage looks like this:

```javascript
embla.containerNode()
embla.slideNodes()
embla.next()
embla.previous()
embla.goTo(2)
embla.selectedIndex()
embla.previousIndex()
embla.groupedIndexes()
embla.isFirstIndex()
embla.islastIndex()
embla.hasPreviousIndex()
embla.hasNextIndex()
embla.changeOptions({ loop: true })
embla.on('select', () => console.log('Selected a new index!'))
embla.destroy()
```

...and the methods are:

**`containerNode()`**  
Returns the current container element node.

**`slideNodes()`**  
Returns the slides as an array of element nodes.

**`next()`**  
Moves to next item. If `loop` option is `false` and the carousel is on the last slide this method will do nothing.

**`previous()`**  
Moves to previous item. If `loop` option is `false` and the carousel is on the first slide this method will do nothing.

**`goTo(index: number)`**  
Moves to item that matches passed index. If `loop` option is `true` the carousel will seek the closest way to the passed index.

**`selectedIndex()`**  
Returns the current selected index. Each index contains multiple slides if `groupSlides` options is more than `1`. If `groupSlides` is `1` each slide has its own index. Zero-based.

**`previousIndex()`**  
Returns the previous selected index. Each index contains multiple slides if `groupSlides` options is more than `1`. If `groupSlides` is `1` each slide has its own index. Zero-based.

**`groupedIndexes()`**  
Returns an array of all slide indexes grouped into arrays according to the `groupSlides` option, i.e. if the total number of slides is `4` and `groupSlides` is `2`, it will return `[[0, 1], [2, 3]]`.

**`isFirstIndex()`**  
Returns if selected index is first possible index. If `loop` option is `false`, it's not possible to slide to previous index from here.

**`isLastIndex()`**  
Returns if selected index is last possible index. If `loop` option is `false`, it's not possible to slide to next index from here.

**`hasPreviousIndex()`**  
Returns if it's possible to slide to previous index from here. Note that if `loop` option is `true` this will always return `true`.

**`hasNextIndex()`**  
Returns if it's possible to slide to next index from here. Note that if `loop` option is `true` this will always return `true`.

**`changeOptions(options: options)`**  
Applies passed options by doing all the necessary calculations and reinitialising the carousel from scratch.

**`on(event: string, callback: function)`**  
Subscribes to a custom Embla event by firing the passed callback. Below is a list of events you can subscribe to:

- **`init`** - Triggers after the carousel has been initialised for the first time.
- **`destroy`** - Triggers after the carousel has been destroyed.
- **`select`** - Triggers when a new target slide has been selected.
- **`dragStart`** - Triggers when carousel dragging begins.
- **`dragEnd`** - Triggers when carousel dragging ends.

**`off(event: string, callback: function)`**  
Ends subscription to a custom Embla event by removing the passed callback. This works for all events listed on the **on** method.

**`destroy()`**  
Removes all styles applied to DOM nodes and kills all event listeners for this Embla instance.

## Implementations

[<img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/javascript-logo.svg" height="60" alt="Embla Carousel JavaScript" />](https://github.com/davidcetinkaya/embla-carousel) &nbsp; &nbsp; [<img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/react-logo.svg" height="60" alt="Embla Carousel React" />](https://github.com/davidcetinkaya/embla-carousel-react)

## Contributing

Do you like this project and want to contribute to it? Fantastic! How do you want to contribute?

- **`I want to show my love`**: Awesome! Give it a **star** ⭐.
- **`I want people to know about it`**: Great! Spread the word on **twitter** or similar 📣.
- **`I want to get my hands dirty`**: Splendid! Read the [contribution guidelines](https://github.com/davidcetinkaya/embla-carousel/blob/master/CONTRIBUTING.md) first 📋.

## License

Embla is [MIT licensed](./LICENSE).

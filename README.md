<br />
<div align="center">
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

  <h4>
    <code> &nbsp; <a href="https://davidcetinkaya.github.io/embla-carousel">DEMO PAGE</a> &nbsp; </code>
  </h4>
</div>

<br>

<p align="center">
  <strong>
    « &nbsp;<code><a href="#options">OPTIONS</a></code>
  </strong>
  <strong>
    &nbsp; | &nbsp;
  </strong>
  <strong>
    <code><a href="#api">THE API</a></code>&nbsp; »
  </strong>
</p>

<br>

<p align="center">
  <a href="https://github.com/davidcetinkaya/embla-carousel">
    <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/javascript-logo.svg" height="50" alt="Embla Carousel JavaScript" />
  </a>
  &nbsp;
  <a href="https://github.com/davidcetinkaya/embla-carousel-react">
    <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/react-logo.svg" height="50" alt="Embla Carousel React" />
  </a>
</p>

<br>

## Installation

NPM

<pre>npm install <a href="https://www.npmjs.com/package/embla-carousel">embla-carousel</a></pre>

```javascript
import EmblaCarousel from 'embla-carousel'
```

## QuickStart

HTML

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

CSS

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

JavaScript

```javascript
const emblaNode = document.querySelector('.embla')
const options = { loop: true }
const embla = EmblaCarousel(emblaNode, options)
```

## Options

Embla comes with a few optional settings that you can change by passing an object as the second argument. **Default** values are:

```javascript
const embla = EmblaCarousel(emblaNode, {
  align: 'center',
  containerSelector: '*',
  slidesToScroll: 1,
  containScroll: false,
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

#### `Align` — <sup>type: string<sup>

- Align the slides relative to the carousel viewport.
- Demos: [`start`](#) **·** [`center`](#) **·** [`end`](#)

**`align`** (string)  
Align the slides relative to the carousel viewport. Possible values are **'start'**, **'center'** and **'end'**.

**`containerSelector`** (string)  
The selector to use for the container that holds the slides. Embla will use all immediate children of this node as slides.

**`slidesToScroll`** (number)  
Scrolls past given number of slides whether scroll is triggered by **scrollNext()**, **scrollPrev()** or **scrollTo()** methods as well as drag interactions.

**`containScroll`** (boolean)  
Contains slides to the carousel viewport to prevent excessive scrolling at the beginning or the end. This has no effect if `loop: true`.

**`draggable`** (boolean)  
Allow mouse and touch interactions to move the carousel.

**`dragFree`** (boolean)  
Determines if the carousel should snap to a slide position after mouse and touch interactions.

**`loop`** (boolean)  
Determines if the carousel should loop when start or end is reached.

**`speed`** (number)  
Carousel speed when using buttons to navigate. A higher number will make transitions faster. Pointer events are not affected by this.

**`startIndex`** (number)  
Zero based index of the starting slide when carousel mounts.

**`selectedClass`** (string)  
Classname that will be applied to the selected slide.

**`draggableClass`** (string)  
Classname that will be applied to the wrapper when the carousel mounts if `draggable: true`.

**`draggingClass`** (string)  
Classname that will be applied to the wrapper when a pointer is dragging the carousel.

## API

Embla exposes a set of methods upon setup that can be used to control the carousel externally. Example usage looks like this:

```javascript
embla.scrollNext()
embla.scrollTo(2)
embla.changeOptions({ loop: true })
embla.on('select', () => {
  console.log(`Selected snap index is ${embla.selectedScrollSnap()}!`)
})
```

...and the methods are:

**`containerNode()`**  
Returns the current container element node.

**`slideNodes()`**  
Returns the slides as an array of element nodes.

**`scrollNext()`**  
Scrolls to next snap point if possible. If `loop: false` and the carousel is on the last snap point this method will do nothing.

**`scrollPrev()`**  
Scrolls to previous snap point if possible. If `loop: false` and the carousel is on the first snap point this method will do nothing.

**`scrollTo(index)`**  
Scrolls to the snap point that matches the passed index. If `loop: true` the carousel will seek the closest way to the target.

**`canScrollPrev()`**  
Returns if it's possible to scroll to a previous snap point. Note that if `loop: true` this will always return `true`.

**`canScrollNext()`**  
Returns if it's possible to scroll to a next snap point. Note that if `loop: true` this will always return `true`.

**`selectedScrollSnap()`**  
Returns the index of the selected snap point. Each snap point scrolls more than one slide if `slidesToScroll > 1`. Zero-based.

**`previousScrollSnap()`**  
Returns the index of the previous snap point. Each snap point scrolls more than one slide if `slidesToScroll > 1`. Zero-based.

**`scrollSnapList()`**  
Returns an array of all scroll snap points, each containing slide numbers and slide nodes. If total slide count is `4` and `slidesToScroll: 2`, it means that every scroll snap point contains `2` slides because any scroll triggered by **scrollNext()** or **scrollPrev()** will scroll `2` slides at a time.

**`changeOptions(options)`**  
Applies passed options by doing all the necessary calculations and reinitialising the carousel from scratch.

**`on(event, callback)`**  
Subscribes to a custom Embla event by firing the passed callback. Below is a list of events you can subscribe to:

- **`init`** - When the carousel has been initialised for the first time.
- **`destroy`** - When the carousel has been destroyed.
- **`select`** - When a new target slide has been selected.
- **`resize`** - When window size changes.
- **`dragStart`** - When carousel dragging begins.
- **`dragEnd`** - When carousel dragging ends.

**`off(event, callback)`**  
Ends subscription to a custom Embla event by removing the passed callback. This works for all events listed on the **on** method.

**`destroy()`**  
Removes all styles applied to DOM nodes and kills all event listeners for this Embla instance.

## Browser Support

- <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/ie-logo.svg" height="23" align="top" alt="Embla Carousel Internet Explorer support" /> &nbsp; **`IE`** - 11

- <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/edge-logo.svg" height="23" align="top" alt="Embla Carousel Internet Explorer support" /> &nbsp; **`Edge`** - Latest 2 versions

- <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/chrome-logo.svg" height="23" align="top" alt="Embla Carousel Chrome support" /> &nbsp; **`Chrome`** - Latest 2 versions

- <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/firefox-logo.svg" height="23" align="top" alt="Embla Carousel Firefox support" /> &nbsp; **`Firefox`** - Latest 2 versions

- <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/safari-logo.svg" height="23" align="top" alt="Embla Carousel Safari support" /> &nbsp; **`Safari`** - Latest 2 versions

## Contribution

Thank you to all the people who already contributed to Embla Carousel 🙏!  
Do you like this project and want to contribute to it?

- **`I just want to support it`**: Thank you! Give it a **star** maybe ⭐?
- **`I want to spread the word`**: You're a star! Why not **twitter** or similar 📣?
- **`I want to get my hands dirty`**: Awesome! Read the [contribution guidelines](https://github.com/davidcetinkaya/embla-carousel/blob/master/CONTRIBUTING.md) first 📋.

## License

Embla is [MIT licensed](./LICENSE).  
Copyright © 2019-present, David Cetinkaya.

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

  <p align="center">
    <strong>
      <h4 align="center">
        <code> &nbsp; <a href="https://davidcetinkaya.github.io/embla-carousel">DEMO PAGE</a> &nbsp; </code>
      </h4>
    </strong>
  </p>
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

Configure Embla by passing an options object as the second argument. **Default** options values are:

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

##### `align` &nbsp; <sup>type: string<sup>

<p>Align the slides relative to the carousel viewport.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-align-start-5kfhw"><code>start</code></a> · 
  <a href="https://codesandbox.io/s/embla-carousel-align-center-e8s0w"><code>center</code></a> · 
  <a href="https://codesandbox.io/s/embla-carousel-align-end-h233r"><code>end</code></a>
</sup>

##### `containerSelector` &nbsp; <sup>type: string<sup>

<p>A query selector for the container that holds the slides, where all immediate children will be treated as slides.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-containerselector-yfxll"><code>*</code></a> · 
  <a href="https://codesandbox.io/s/embla-carousel-containerselector-my-classname-ntlzb"><code>.my-classname</code></a>
</sup>

##### `slidesToScroll` &nbsp; <sup>type: number<sup>

<p>Scrolls past given number of slides whether scroll is triggered by API methods or drag interactions.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-slidestoscroll-1-ry5y7"><code>1</code></a> · 
  <a href="https://codesandbox.io/s/embla-carousel-slidestoscroll-2-1g4rk"><code>2</code></a>
</sup>

##### `containScroll` &nbsp; <sup>type: boolean<sup>

<p>Contains slides to carousel viewport to prevent excessive scrolling at the beginning or end.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-containscroll-false-jktsn"><code>false</code></a> · 
  <a href="https://codesandbox.io/s/embla-carousel-containscroll-true-tunvy"><code>true</code></a>
</sup>

##### `draggable` &nbsp; <sup>type: boolean<sup>

<p>Allow mouse & touch interactions to scroll the carousel.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-draggable-true-4prej"><code>true</code></a> · 
  <a href="https://codesandbox.io/s/embla-carousel-draggable-false-gj9j0"><code>false</code></a>
</sup>

##### `dragFree` &nbsp; <sup>type: boolean<sup>

<p>Determines if the carousel should snap to a slide position after mouse & touch interactions.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-dragfree-false-he5m1"><code>false</code></a> · 
  <a href="https://codesandbox.io/s/embla-carousel-dragfree-true-bfqjc"><code>true</code></a>
</sup>

##### `loop` &nbsp; <sup>type: boolean<sup>

<p>Determines if the carousel should loop when start or end is reached.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-loop-false-oyols"><code>false</code></a> · 
  <a href="https://codesandbox.io/s/embla-carousel-loop-true-3x6id"><code>true</code></a>
</sup>

##### `speed` &nbsp; <sup>type: number<sup>

<p>Carousel speed when using API methods to navigate. A higher number will make transitions faster.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-speed-10-9v4gr"><code>10</code></a> · 
  <a href="https://codesandbox.io/s/embla-carousel-speed-15-omw5i"><code>15</code></a>
</sup>

##### `startIndex` &nbsp; <sup>type: number<sup>

<p>Zero based index of the starting slide when carousel mounts.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-startindex-0-zpxyn"><code>0</code></a> · 
  <a href="https://codesandbox.io/s/embla-carousel-startindex-0-3ur20"><code>3</code></a>
</sup>

##### `selectedClass` &nbsp; <sup>type: string<sup>

<p>Classname that will be applied to the selected slide.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-selectedclass-is-selected-1h2ts"><code>is-selected</code></a> · 
  <a href="https://codesandbox.io/s/embla-carousel-selectedclass-my-class-ioysh"><code>my-class</code></a>
</sup>

##### `draggableClass` &nbsp; <sup>type: string<sup>

<p>Classname that will be applied to the wrapper when the carousel mounts if draggable.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-draggableclass-is-draggable-3eben"><code>is-draggable</code></a> · 
  <a href="https://codesandbox.io/s/embla-carousel-draggableclass-my-class-j7r68"><code>my-class</code></a>
</sup>

##### `draggingClass` &nbsp; <sup>type: string<sup>

<p>Classname that will be applied to the wrapper when a pointer is dragging the carousel.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-draggingclass-is-dragging-7u90r"><code>is-dragging</code></a> · 
  <a href="https://codesandbox.io/s/embla-carousel-draggingclass-my-class-7u90r"><code>my-class</code></a>
</sup>

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

<br>
<br>

<h2 align="center">License</h2>

<p align="center">
  <sup>Copyright © 2019-present, David Cetinkaya.</sup><br>
  Embla is <a href="https://github.com/davidcetinkaya/embla-carousel/blob/master/LICENSE">MIT licensed</a>.
</p>

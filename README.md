<br />
<div align="center">
  <p align="center">
    <a href="https://davidcetinkaya.github.io/embla-carousel" target="_blank"><img width="80" height="80" src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/embla-logo.svg" alt="Embla Carousel">
    </a>
  </p>

  <p align="center">
    <a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/license-MIT-green.svg"></a>
    <a href="https://www.npmjs.com/package/embla-carousel" target="_blank"><img src="https://img.shields.io/npm/v/embla-carousel.svg"></a>
    <a href="https://travis-ci.org/davidcetinkaya/embla-carousel" target="_blank"><img src="https://img.shields.io/travis/davidcetinkaya/embla-carousel/master.svg"></a>
    <a href="https://prettier.io" target="_blank"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat"></a>
    <a href="https://www.npmjs.com/package/embla-carousel" target="_blank"><img src="https://img.shields.io/bundlephobia/minzip/embla-carousel?color=%234c1&label=gzip%20size">
    </a>
  </p>

  <strong>
    <h2 align="center">Embla Carousel</h2>
  </strong>

  <p align="center">
    Extensible low level carousels for the web. Extend it with basic JavaScript and build awesome physics simulated carousels. Dependency free and 100% open source.
  </p>

  <br>

  <p align="center">
    <strong>
      <code>&nbsp;<a href="https://davidcetinkaya.github.io/embla-carousel">TRY DEMO</a>&nbsp;</code>
    </strong>
  </p>

  <br>

  <p align="center">
    <strong>
      <a href="#options">options</a>
      &nbsp; &middot; &nbsp;
      <a href="#api">api</a>
      &nbsp; &middot; &nbsp;
      <a href="https://codesandbox.io/s/oyols">codesandbox</a>
    </strong>
  </p>

  <br>

  <p align="center">
    <a href="https://github.com/davidcetinkaya/embla-carousel">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/javascript-logo.svg" height="45" alt="JavaScript" />
    </a>
    &nbsp;
    <a href="https://github.com/davidcetinkaya/embla-carousel-react">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/react-logo.svg" height="45" alt="React" />
    </a>
  </p>
</div>
<br />

## Installation

NPM

<pre>npm install <a href="https://www.npmjs.com/package/embla-carousel">embla-carousel</a></pre>

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
}

.embla__slide {
  position: relative; /* Needed if loop: true */
  flex: 0 0 100%; /* Choose any width */
}
```

JavaScript

```javascript
import EmblaCarousel from 'embla-carousel'

const emblaNode = document.querySelector('.embla')
const options = { loop: true }
const embla = EmblaCarousel(emblaNode, options)
```

## Options

Configure Embla by passing an options object as the second argument. **Default** values are:

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

Embla exposes API methods that can be used to control the carousel externally. Example usage:

```javascript
embla.scrollNext()
embla.scrollTo(2)
embla.changeOptions({ loop: true })
embla.on('select', () => {
  console.log(`Selected snap index is ${embla.selectedScrollSnap()}!`)
})
```

##### `containerNode()`

<p>Returns the current container element node.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-containernode-fq9xw"><code>embla.containerNode()</code></a>
</sup>

##### `slideNodes()`

<p>Returns the slides as an array of element nodes.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-slidenodes-dsesp"><code>embla.slideNodes()</code></a>
</sup>

##### `scrollNext()`

<p>Scrolls to next snap point if possible. If <code>loop: false</code> and the carousel is on the last snap point this method will do nothing.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-scrollnext-scrollprev-hutpm"><code>embla.scrollNext()</code></a>
</sup>

##### `scrollPrev()`

<p>Scrolls to previous snap point if possible. If <code>loop: false</code> and the carousel is on the first snap point this method will do nothing.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-scrollnext-scrollprev-hutpm"><code>embla.scrollPrev()</code></a>
</sup>

##### `scrollTo(index)`

<p>Scrolls to the snap point that matches the passed index. If <code>loop: true</code> the carousel will seek the closest way to the target.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-scrollto-3igby"><code>embla.scrollTo()</code></a>
</sup>

##### `canScrollPrev()`

<p>Returns if it's possible to scroll to a previous snap point. If <code>loop: true</code> this will always return <code>true</code>.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-canscrollprev-canscrollnext-4wt5z"><code>embla.canScrollPrev()</code></a>
</sup>

##### `canScrollNext()`

<p>Returns if it's possible to scroll to a next snap point. If <code>loop: true</code> this will always return <code>true</code>.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-canscrollprev-canscrollnext-4wt5z"><code>embla.canScrollNext()</code></a>
</sup>

##### `selectedScrollSnap()`

<p>Returns the index of the selected snap point. Each snap point scrolls more than one slide if <code>slidesToScroll > 1</code>. Zero-based.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-selectedscrollsnap-previousscrollsnap-04ux1"><code>embla.selectedScrollSnap()</code></a>
</sup>

##### `previousScrollSnap()`

<p>Returns the index of the previous snap point. Each snap point scrolls more than one slide if <code>slidesToScroll > 1</code>. Zero-based.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-selectedscrollsnap-previousscrollsnap-04ux1"><code>embla.previousScrollSnap()</code></a>
</sup>

##### `scrollSnapList()`

<p>Returns an array of all scroll snap points, each containing slide numbers and slide nodes.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-scrollsnaplist-9bnsk"><code>embla.scrollSnapList()</code></a>
</sup>

##### `changeOptions(options)`

<p>Applies passed options by doing all the necessary calculations and initialising the carousel from scratch.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-changeoptions-mybvm"><code>embla.changeOptions()</code></a>
</sup>

##### `on(event, callback)`

<p>Subscribes to a custom Embla event by firing the passed callback. Below is a list of events you can subscribe to:</p>

- **`init`** - When the carousel has been initialised for the first time.
- **`destroy`** - When the carousel has been destroyed.
- **`select`** - When a new target slide has been selected.
- **`scroll`** - When carousel is scrolled.
- **`resize`** - When window size changes.
- **`dragStart`** - When carousel dragging begins.
- **`dragEnd`** - When carousel dragging ends.

<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-on-off-pjgmk"><code>embla.on()</code></a>
</sup>

##### `off(event, callback)`

<p>Ends subscription to a custom Embla event by removing the passed callback. This works for all events listed on the <code>on</code> method.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-on-off-pjgmk"><code>embla.off()</code></a>
</sup>

##### `destroy()`

<p>Removes all styles applied to DOM nodes and kills all event listeners for this Embla instance.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-destroy-t4ly1"><code>embla.destroy()</code></a>
</sup>

## Browser Support

<p>
  <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/ie-logo.svg" height="23" align="top" alt="Embla Carousel Internet Explorer support" /> &nbsp; <strong>IE</strong> - 11
</p>

<p>
  <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/edge-logo.svg" height="23" align="top" alt="Embla Carousel Internet Explorer support" /> &nbsp; <strong>Edge</strong> - Latest 2 versions
</p>

<p>
  <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/chrome-logo.svg" height="23" align="top" alt="Embla Carousel Chrome support" /> &nbsp; <strong>Chrome</strong> - Latest 2 versions
</p>

<p>
  <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/firefox-logo.svg" height="23" align="top" alt="Embla Carousel Firefox support" /> &nbsp; <strong>Firefox</strong> - Latest 2 versions
</p>

<p>
  <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/safari-logo.svg" height="23" align="top" alt="Embla Carousel Safari support" /> &nbsp; <strong>Safari</strong> - Latest 2 versions
</p>

## Contributors

<p>
  <a href="https://github.com/michaelrambeau"><img src="https://avatars0.githubusercontent.com/u/5546996?s=400&v=4" title="michaelrambeau" width="80" height="80" style="max-width:100%;"></a> 
  &nbsp;
  <a href="https://github.com/ehellman"><img src="https://avatars3.githubusercontent.com/u/586152?s=400&v=4" title="ehellman" width="80" height="80" style="max-width:100%;"></a>
</p>

<br>

<h2 align="center">Open Source</h2>

<p align="center">
  <sup>Copyright © 2019-present, David Cetinkaya.</sup><br>
  Embla is <a href="https://github.com/davidcetinkaya/embla-carousel/blob/master/LICENSE">MIT licensed</a> 💖
</p>

<br>

<p align="center">
  📋 <a href="https://github.com/davidcetinkaya/embla-carousel/blob/master/CONTRIBUTING.md">contribution</a>
</p>

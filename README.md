<br />
<div align="center">
  <p align="center">
    <a href="https://davidcetinkaya.github.io/embla-carousel" target="_blank"><img width="80" height="80" src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/embla-logo.svg" alt="Embla Carousel Logo">
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
      <a href="#events">events</a>
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
    <div class="embla__slide">
      Slide 4
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
  flex: 0 0 100%; /* Choose any slide width */
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

##### `align`

<details open>
  <summary>
    Align the slides relative to the carousel viewport.
  </summary>
  <hr>
  <div>
    This option aligns the slides to the start or end edge of the carousel viewport. Slides will be centered if no value is provided. Note that slide alignments will be overrided for slides at the start or end when used together with 
    <a href="#containscroll">
      <code>containScroll</code>
    </a>, 
    that prevents excessive scrolling at the beginning or end.
  </div>
  <br>
  <div>
    <sup>
      <strong>Type: </strong>
      <code>string</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Allowed values: </strong>
      <code>start</code>
      <code>center</code>
      <code>end</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Default value: </strong>
      <code>center</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-align-5kfhw">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-align-5kfhw">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const options = { align: 'start' }
const embla = EmblaCarousel(emblaNode, options)
```

<hr>    
</details>

##### `containerSelector`

<details>
  <summary>
    Target the slide container with a query selector.
  </summary>
  <hr>
  <div>
    This option allows for the use of a custom query selector to match the container that holds the slides. If no value is provided Embla will match any immediate html tag. All immediate children of this container will be treated as slides.
  </div>
  <br>
  <div>
    <sup>
      <strong>Type: </strong>
      <code>string</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Allowed values: </strong>
      <code>any</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Default value: </strong>
      <code>*</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-containerselector-ntlzb">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-containerselector-ntlzb">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const options = { containerSelector: '.my-container-selector' }
const embla = EmblaCarousel(emblaNode, options)
```

```html
<div class="embla">
  <div class="my-container-selector">
    ...slides
  </div>
</div>
```

<hr>    
</details>

##### `slidesToScroll`

<details>
  <summary>
    Scroll past the given number of slides.
  </summary>
  <hr>
  <div>
    This option groups slides together. Drag interactions, dot navigation, and previous/next buttons are mapped to group slides into the given number. For example, if the option is set to <code>2</code>, every two slides will be treated as a single slide.
  </div>
  <br>
  <div>
    <sup>
      <strong>Type: </strong>
      <code>number</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Allowed values: </strong>
      <code>any</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Default value: </strong>
      <code>1</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-slidestoscroll-1g4rk">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-slidestoscroll-1g4rk">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const options = { slidesToScroll: 2 }
const embla = EmblaCarousel(emblaNode, options)
```

```css
.embla__slide {
  flex: 0 0 50%; /* Show 2 slides in viewport */
}
```

<hr>    
</details>

##### `containScroll`

<details>
  <summary>
    Contain slides to the carousel viewport.
  </summary>
  <hr>
  <div>
    This option clears leading and trailing empty space that causes excessive scrolling. Note that this will override the chosen <a href="#align">alignment</a> for slides at the beginning or the end if necessary, in order to get rid of the empty space.
  </div>
  <br>
  <div>
    <sup>
      <strong>Type: </strong>
      <code>boolean</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Allowed values: </strong>
      <code>true</code>
      <code>false</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Default value: </strong>
      <code>false</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-containscroll-tunvy">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-containscroll-tunvy">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const options = { containScroll: true }
const embla = EmblaCarousel(emblaNode, options)
```

<hr>    
</details>

##### `draggable`

<details>
  <summary>
    Allow drag interactions to scroll the carousel.
  </summary>
  <hr>
  <div>
    This option enables for scrolling the carousel with mouse and touch interactions. They're are enabled by default. Use this option to turn this feature off if you have good reasons to limit the accessibility of the carousel.
  </div>
  <br>
  <div>
    <sup>
      <strong>Type: </strong>
      <code>boolean</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Allowed values: </strong>
      <code>true</code>
      <code>false</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Default value: </strong>
      <code>true</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-draggable-gj9j0">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-draggable-gj9j0">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const options = { draggable: false }
const embla = EmblaCarousel(emblaNode, options)
```

<hr>    
</details>

##### `dragFree`

<details>
  <summary>
    Enable momentum scrolling for drag interactions.
  </summary>
  <hr>
  <div>
    This option enables momentum scrolling, where the carousel continues to scroll for a while after finishing the scroll gesture by releasing the mouse/touch input. The speed and duration of the continued scrolling is proportional to how vigorous the scroll gesture was.
  </div>
  <br>
  <div>
    <sup>
      <strong>Type: </strong>
      <code>boolean</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Allowed values: </strong>
      <code>true</code>
      <code>false</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Default value: </strong>
      <code>false</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-dragfree-bfqjc">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-dragfree-bfqjc">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const options = { dragFree: true }
const embla = EmblaCarousel(emblaNode, options)
```

<hr>    
</details>

##### `loop`

<details>
  <summary>
    Enable infinite looping for the carousel.
  </summary>
  <hr>
  <div>
    This option enables infinite looping. Slides need relative positioning in order for this to work. If the carousel only has one slide it will fall back to non looping behaviour. Note that <a href="#containscroll">
      <code>containScroll</code>
    </a> will be ignored if loop is enabled because the empty space is already filled with looping slides.
  </div>
  <br>
  <div>
    <sup>
      <strong>Type: </strong>
      <code>boolean</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Allowed values: </strong>
      <code>true</code>
      <code>false</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Default value: </strong>
      <code>false</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-loop-3x6id">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-loop-3x6id">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const options = { loop: true }
const embla = EmblaCarousel(emblaNode, options)
```

```css
.embla__slide {
  position: relative; /* Needed for loop to work */
}
```

<hr>
</details>

##### `speed`

<details>
  <summary>
    Set scroll speed triggered by API navigation.
  </summary>
  <hr>
  <div>
    This option enables adjustment of the scroll speed when triggered by any of the API methods 
    <a href="#scrollnext">
      <code>scrollNext</code>
    </a>,
    <a href="#scrollprev">
      <code>scrollPrev</code>
    </a> and
    <a href="#scrollTo">
      <code>scrollTo</code>
    </a>. Use a higher number for faster scrolling. Drag interactions are not affected by this because the speed in these cases is determined by how vigorous the drag gesture was. 
  </div>
  <br>
  <div>
    <sup>
      <strong>Type: </strong>
      <code>number</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Allowed values: </strong>
      <code>any</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Default value: </strong>
      <code>10</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-speed-omw5i">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-speed-omw5i">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const options = { speed: 15 }
const embla = EmblaCarousel(emblaNode, options)
```

<hr>
</details>

##### `startIndex`

<details>
  <summary>
    Select index of the initial scroll snap.
  </summary>
  <hr>
  <div>
    This option allows the selection of the initial scroll snap position. First scroll snap index starts at <code>0</code>. If slides are mapped to groups with the
    <a href="#slidestoscroll">
      <code>slidesToScroll</code>
    </a> option, some slides share the same scroll snap index. For example, if it's set to <code>2</code> slide one and two will be at index 0, while slide three and four will be at index 1 and so on.
  </div>
  <br>
  <div>
    <sup>
      <strong>Type: </strong>
      <code>number</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Allowed values: </strong>
      <code>any</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Default value: </strong>
      <code>0</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-startindex-3ur20">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-startindex-3ur20">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const options = { startIndex: 3 }
const embla = EmblaCarousel(emblaNode, options)
```

<hr>
</details>

##### `selectedClass`

<details>
  <summary>
    Choose classname applied to the selected slides.
  </summary>
  <hr>
  <div>
    This option allows for a custom classname that will be applied to the selected slide. In most cases, only one slide will be selected at a time. However, when
    <a href="#slidestoscroll">
      <code>slidesToScroll</code>
    </a> is more than <code>1</code> and/or
    <a href="#containScroll">
      <code>containScroll</code>
    </a> is active, slides are mapped to groups. This means that the selected class will be added to multiple slides at a time.
  </div>
  <br>
  <div>
    <sup>
      <strong>Type: </strong>
      <code>string</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Allowed values: </strong>
      <code>any</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Default value: </strong>
      <code>is-selected</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-selectedclass-ioysh">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-selectedclass-ioysh">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const options = { selectedClass: 'my-selected-class' }
const embla = EmblaCarousel(emblaNode, options)
```

<hr>
</details>

##### `draggableClass`

<details>
  <summary>
    Choose classname applied to the draggable container.
  </summary>
  <hr>
  <div>
    This option allows for a custom classname that will be applied to the carousel container if the carousel is
    <a href="#draggable">
      <code>draggable</code>
    </a>. Use it to style the carousel accordingly. For example, you can show a grab cursor when a draggable carousel is hovered. If no value is provided it will fall back to <code>is-draggable</code>.
  </div>
  <br>
  <div>
    <sup>
      <strong>Type: </strong>
      <code>string</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Allowed values: </strong>
      <code>any</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Default value: </strong>
      <code>is-draggable</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-draggableclass-j7r68">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-draggableclass-j7r68">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const options = { draggableClass: 'my-draggable-class' }
const embla = EmblaCarousel(emblaNode, options)
```

```css
.my-draggable-class {
  cursor: grab;
}
```

<hr>
</details>

##### `draggingClass`

<details>
  <summary>
    Choose classname applied to the container when dragging.
  </summary>
  <hr>
  <div>
    This option allows for a custom classname that will be applied to the carousel container on mousedown or touchstart, if the carousel is
    <a href="#draggable">
      <code>draggable</code>
    </a>. Use it to style the carousel accordingly. For example, you can show a grabbing cursor when a pointer is down. If no value is provided it will fall back to <code>is-dragging</code>.
  </div>
  <br>
  <div>
    <sup>
      <strong>Type: </strong>
      <code>string</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Allowed values: </strong>
      <code>any</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Default value: </strong>
      <code>is-dragging</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-draggingclass-7u90r">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-draggingclass-7u90r">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const options = { draggingClass: 'my-dragging-class' }
const embla = EmblaCarousel(emblaNode, options)
```

```css
.my-dragging-class {
  cursor: grabbing;
}
```

<hr>
</details>

## API

Embla exposes API methods that can be used to control the carousel externally. Example usage:

```javascript
embla.scrollNext()
embla.scrollTo(2)
embla.changeOptions({ loop: true })
embla.on('select', () => {
  console.log(`Selected snap index is ${embla.selectedScrollSnap()}.`)
})
```

##### `containerNode`

<details>
  <summary>
    Get the container node that holds the slides.
  </summary>
  <hr>
  <div>
    This API method returns the container node that holds the slides. If a custom selector is used by utilising the <a href="#containerselector"><code>containerSelector</code></a> option this will return the matching element, otherwise it will return the first immediate child of the Embla node passed to EmblaCarousel.
  </div>
  <br>
  <div>
    <sup>
      <strong>Parameters: </strong>
      <code>none</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Return Type: </strong>
      <code>Node.ELEMENT_NODE</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-containernode-fq9xw">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-containernode-fq9xw">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
const emblaContainer = embla.containerNode()
```

<hr>    
</details>

##### `slideNodes`

<details>
  <summary>
    Get the slide nodes inside the container.
  </summary>
  <hr>
  <div>
    This API method returns an array with the slide nodes inside the carousel container. Use this handy method if you want to manipulate the slide nodes in some way. You can also grab the length of the array to get the slide count.
  </div>
  <br>
  <div>
    <sup>
      <strong>Parameters: </strong>
      <code>none</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Return Type: </strong>
      <code>Node.ELEMENT_NODE[]</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-slidenodes-dsesp">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-slidenodes-dsesp">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
const emblaSlides = embla.slideNodes()
```

<hr>    
</details>

##### `scrollNext`

<details>
  <summary>
    Scroll to the next snap point if possible.
  </summary>
  <hr>
  <div>
    This API method scrolls to the next snap point if possible. If the
    <a href="#loop">
      <code>loop</code>
    </a> option is disabled and the carousel is on the last snap point, this method will do nothing. When loop is enabled, it will always be able to scroll to the next snap point. Useful for creating a scroll next button for example.
  </div>
  <br>
  <div>
    <sup>
      <strong>Parameters: </strong>
      <code>none</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Return Type: </strong>
      <code>undefined</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-scrollnext-scrollprev-hutpm">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-scrollnext-scrollprev-hutpm">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
const nextButton = emblaNode.querySelector('.embla__next')

nextButton.addEventListener('click', embla.scrollNext, false)
```

```html
<button class="embla__next" type="button">
  Scroll Next
</button>
```

<hr>    
</details>

##### `scrollPrev`

<details>
  <summary>
    Scroll to the previous snap point if possible.
  </summary>
  <hr>
  <div>
    This API method scrolls to the previous snap point if possible. If the
    <a href="#loop">
      <code>loop</code>
    </a> option is disabled and the carousel is on the first snap point, this method will do nothing. When loop is enabled, it will always be able to scroll to the previous snap point. Useful for creating a scroll previous button for example.
  </div>
  <br>
  <div>
    <sup>
      <strong>Parameters: </strong>
      <code>none</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Return Type: </strong>
      <code>undefined</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-scrollnext-scrollprev-hutpm">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-scrollnext-scrollprev-hutpm">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
const prevButton = emblaNode.querySelector('.embla__prev')

prevButton.addEventListener('click', embla.scrollPrev, false)
```

```html
<button class="embla__prev" type="button">
  Scroll Previous
</button>
```

<hr>    
</details>

##### `scrollTo`

<details>
  <summary>
    Scroll to a snap point by its unique index.
  </summary>
  <hr>
  <div>
    This API method scrolls to the snap point that matches the given index. When the
    <a href="#loop">
      <code>loop</code>
    </a> option is enabled, the carousel will seek the closest way to the target. Useful for creating dot navigation together with the
    <a href="#scrollsnaplist">
      <code>scrollSnapList</code>
    </a> method.
  </div>
  <br>
  <div>
    <sup>
      <strong>Parameters: </strong>
      <code>index: number</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Return Type: </strong>
      <code>undefined</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-scrollto-3igby">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-scrollto-3igby">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
const rewindButton = emblaNode.querySelector('.embla__rewind')

rewindButton.addEventListener('click', () => embla.scrollTo(0), false)
```

```html
<button class="embla__rewind" type="button">
  Rewind
</button>
```

<hr>    
</details>

##### `canScrollPrev`

<details>
  <summary>
    Check the possiblity to scroll to a previous snap point.
  </summary>
  <hr>
  <div>
    This API method returns a boolean that indicates if the carousel can scroll to a previous snap point from its current position. Note that if the
    <a href="#loop">
      <code>loop</code>
    </a> option is enabled it will always return true. For example, it can be used to disable or enable a scroll to previous button.
  </div>
  <br>
  <div>
    <sup>
      <strong>Parameters: </strong>
      <code>none</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Return Type: </strong>
      <code>boolean</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-canscrollprev-canscrollnext-4wt5z">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-canscrollprev-canscrollnext-4wt5z">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
const prevButton = emblaNode.querySelector('.embla__prev')

const togglePrevButtonEnabled = () => {
  if (embla.canScrollPrev()) {
    prevButton.removeAttribute('disabled')
  } else {
    prevButton.setAttribute('disabled', 'disabled')
  }
}

embla.on('init', togglePrevButtonEnabled);
embla.on('select', togglePrevButtonEnabled);
```

```html
<button class="embla__prev" type="button">
  Scroll Previous
</button>
```

<hr>    
</details>

##### `canScrollNext`

<details>
  <summary>
    Check the possiblity to scroll to a next snap point.
  </summary>
  <hr>
  <div>
    This API method returns a boolean that indicates if the carousel can scroll to a next snap point from its current position. Note that if the
    <a href="#loop">
      <code>loop</code>
    </a> option is enabled it will always return true. For example, it can be used to disable or enable a scroll to next button.
  </div>
  <br>
  <div>
    <sup>
      <strong>Parameters: </strong>
      <code>none</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Return Type: </strong>
      <code>boolean</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-canscrollprev-canscrollnext-4wt5z">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-canscrollprev-canscrollnext-4wt5z">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
const nextButton = emblaNode.querySelector('.embla__next')

const toggleNextButtonEnabled = () => {
  if (embla.canScrollNext()) {
    nextButton.removeAttribute('disabled')
  } else {
    nextButton.setAttribute('disabled', 'disabled')
  }
}

embla.on('init', toggleNextButtonEnabled);
embla.on('select', toggleNextButtonEnabled);
```

```html
<button class="embla__next" type="button">
  Scroll Next
</button>
```

<hr>    
</details>

##### `selectedScrollSnap`

<details>
  <summary>
    Get the index of the selected snap point.
  </summary>
  <hr>
  <div>
    This API method returns the index of the current selected snap point. If the
    <a href="#slidestoscroll">
      <code>slidesToScroll</code>
    </a> option is more than <code>1</code> some slides will be grouped together and share the same index. For example, when it's set to <code>2</code>, every two slides will share the same index. In this case, slide <code>1</code> and <code>2</code> will share index <code>0</code> and slide <code>3</code> and <code>4</code> will share index <code>1</code> and so on.
  </div>
  <br>
  <div>
    <sup>
      <strong>Parameters: </strong>
      <code>none</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Return Type: </strong>
      <code>number</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-selectedscrollsnap-previousscrollsnap-04ux1">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-selectedscrollsnap-previousscrollsnap-04ux1">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)

embla.on('select', () => {
  const currentSnapIndex = embla.selectedScrollSnap()
  alert(`Selected index has changed to ${currentSnapIndex}.`)
})
```

<hr>    
</details>

##### `previousScrollSnap`

<details>
  <summary>
    Get the index of the previous snap point.
  </summary>
  <hr>
  <div>
    This API method returns the index of the previously selected snap point. If the
    <a href="#slidestoscroll">
      <code>slidesToScroll</code>
    </a> option is more than <code>1</code> some slides will be grouped together and share the same index. For example, when it's set to <code>2</code>, every two slides will share the same index. In this case, slide <code>1</code> and <code>2</code> will share index <code>0</code> and slide <code>3</code> and <code>4</code> will share index <code>1</code> and so on.
  </div>
  <br>
  <div>
    <sup>
      <strong>Parameters: </strong>
      <code>none</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Return Type: </strong>
      <code>number</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-selectedscrollsnap-previousscrollsnap-04ux1">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-selectedscrollsnap-previousscrollsnap-04ux1">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)

embla.on('select', () => {
  const previousSnapIndex = embla.previousScrollSnap()
  alert(`Previously selected index was ${previousSnapIndex}.`)
})
```

<hr>    
</details>

##### `scrollSnapList`

<details>
  <summary>
    Get an array of all scroll snap points.
  </summary>
  <hr>
  <div>
    This API method returns an array containing all the carousel snap points. Each snap point comes with its <code>slideNodes</code> and <code>slideIndexes</code>. For example, it's useful for getting the snap point count or creating a dot navigation together with the
    <a href="#scrollto">
      <code>scrollTo</code>
    </a> method.
  </div>
  <br>
  <div>
    <sup>
      <strong>Parameters: </strong>
      <code>none</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Return Type: </strong>
      <code>scrollSnap[]</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-scrollsnaplist-9bnsk">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-scrollsnaplist-9bnsk">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
const scrollSnaps = embla.scrollSnapList()

const slidesInFirstScrollSnap = scrollSnaps[0].slideNodes;
const indexesInFirstScrollSnap = scrollSnaps[0].slideIndexes;
```

<hr>    
</details>

##### `scrollProgress`

<details>
  <summary>
    Check how far the carousel has scrolled.
  </summary>
  <hr>
  <div>
    This API method returns how far the carousel has scrolled from <code>0</code> at the beginning to <code>1</code> at the end. For example, it's useful for creating a progress bar together with the
    <a href="#scroll">
      <code>scroll</code>
    </a> event.
  </div>
  <br>
  <div>
    <sup>
      <strong>Parameters: </strong>
      <code>none</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Return Type: </strong>
      <code>number</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-scrollprogress-cghc5">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-scrollprogress-cghc5">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)

embla.on('scroll', () => {
  const scrollProgressPercentage = embla.scrollProgress() * 100
  console.log(`The carousel has scrolled ${scrollProgressPercentage}%.`)
})
```

<hr>    
</details>

##### `clickAllowed`

<details>
  <summary>
    Check if interaction was a static click.
  </summary>
  <hr>
  <div>
    This API method returns if the user interaction was a click. For mouse events Embla will return <code>true</code> if a drag interaction in any direction didn't occur before the mouse was released. Touch events also require the carousel to not be in a scrolling state in order to accept the click.
  </div>
  <br>
  <div>
    <sup>
      <strong>Parameters: </strong>
      <code>none</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Return Type: </strong>
      <code>boolean</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-clickallowed-woxr1">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-clickallowed-woxr1">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
const emblaSlides = embla.slideNodes()

const alertClickedSlide = (index) => {
  return () => {
    if (embla.clickAllowed()) {
      alert(`Slide with index ${index} was clicked.`)
    }
  }
}

emblaSlides.forEach((slide, index) => {
  const alertClickedSlideIndex = alertClickedSlide(index)
  slide.addEventListener('click', alertClickedSlideIndex, false)
})
```

<hr>    
</details>

##### `changeOptions`

<details>
  <summary>
    Change the carousel options after initialization.
  </summary>
  <hr>
  <div>
    This API method allows for changing the carousel options after it has been initialized. Useful for changing the carousel setup depending on different screen sizes. Note that this will stop the carousel if it's in motion when change options is called, and initialize the carousel from scratch.
  </div>
  <br>
  <div>
    <sup>
      <strong>Parameters: </strong>
      <code>
        options: 
        <a href="#options">
          EmblaOptions
        </a>
      </code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Return Type: </strong>
      <code>undefined</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-changeoptions-mybvm">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-changeoptions-mybvm">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
embla.changeOptions({ loop: true })
```

<hr>    
</details>

##### `destroy`

<details>
  <summary>
    Destroy a carousel instance permanently. 
  </summary>
  <hr>
  <div>
    This API method is a one way operation and destroys a carousel instance. All applied styles to DOM nodes and any event listeners will be removed. Remember to remove any external event listeners if you've used the API to create prev/next and/or dot navigation for the carousel.
  </div>
  <br>
  <div>
    <sup>
      <strong>Parameters: </strong>
      <code>none</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Return Type: </strong>
      <code>undefined</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-destroy-t4ly1">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-destroy-t4ly1">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
embla.destroy()
```

<hr>    
</details>

##### `on`

<details>
  <summary>
    Subscribe to an Embla specific event with a callback.
  </summary>
  <hr>
  <div>
    This API method enables the use of event listeners by attaching them to any of the Embla specific 
    <a href="#events">
      <code>events</code>
    </a>. For example, it's useful for changing styles whenever a new target snap point has been selected or when the carousel is scrolling. Use it together with the 
    <a href="#off">
      <code>off</code>
    </a> method to remove added event listeners without destroying the carousel. However, when the
    <a href="#destroy">
      <code>destroy</code>
    </a> method is invoked, any added event listeners will be destroyed.
  </div>
  <br>
  <div>
    <sup>
      <strong>Parameters: </strong>
      <code>event: <a href="#events">EmblaEvent</a></code>
      <code>callback: function</code>
    </sup>
  </div>
  <div>
    <sup>
      <strong>Return Type: </strong>
      <code>undefined</code>
    </sup>
  </div>
  <br>
  <div>
    <a href="https://codesandbox.io/s/embla-carousel-on-off-pjgmk">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="https://codesandbox.io/s/embla-carousel-on-off-pjgmk">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)

const onInitCallback = () => {
  console.log('The carousel has just been initialized.')
}

embla.on('init', onInitCallback)
```

<hr>    
</details>

##### `off(event, callback)`

<p>Ends subscription to a custom Embla event by removing the passed callback. This works for all events listed on the <code>on</code> method.</p>
<sup>
  ✨ <strong>Demo</strong> - 
  <a href="https://codesandbox.io/s/embla-carousel-on-off-pjgmk"><code>embla.off()</code></a>
</sup>

## Events

Embla exposes custom events that can be hooked on to. Example usage:

```javascript
embla.on('select', () => {
  console.log(`Selected snap index is ${embla.selectedScrollSnap()}.`)
})
embla.on('scroll', () => {
  console.log(`Scroll progress is ${embla.scrollProgress()}.`)
})
```

##### `init`

<details>
  <summary>
    Under construction...
  </summary>
  <hr>
  <div>
    Under construction...
  </div>
  <br>
  <div>
    <a href="#">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="#">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
```

<hr>    
</details>

##### `destroy`

<details>
  <summary>
    Under construction...
  </summary>
  <hr>
  <div>
    Under construction...
  </div>
  <br>
  <div>
    <a href="#">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="#">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
```

<hr>    
</details>

##### `select`

<details>
  <summary>
    Under construction...
  </summary>
  <hr>
  <div>
    Under construction...
  </div>
  <br>
  <div>
    <a href="#">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="#">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
```

<hr>    
</details>

##### `scroll`

<details>
  <summary>
    Under construction...
  </summary>
  <hr>
  <div>
    Under construction...
  </div>
  <br>
  <div>
    <a href="#">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="#">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
```

<hr>    
</details>

##### `resize`

<details>
  <summary>
    Under construction...
  </summary>
  <hr>
  <div>
    Under construction...
  </div>
  <br>
  <div>
    <a href="#">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="#">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
```

<hr>    
</details>

##### `dragStart`

<details>
  <summary>
    Under construction...
  </summary>
  <hr>
  <div>
    Under construction...
  </div>
  <br>
  <div>
    <a href="#">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="#">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
```

<hr>    
</details>

##### `dragEnd`

<details>
  <summary>
    Under construction...
  </summary>
  <hr>
  <div>
    Under construction...
  </div>
  <br>
  <div>
    <a href="#">
      <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" />
    </a>
    &nbsp;
    <a href="#">
      <code>CodeSandbox</code>
    </a> 
  </div>
  <br>
  <p>
    <strong>Usage</strong>
  </p>
  
```javascript
const embla = EmblaCarousel(emblaNode, options)
```

<hr>    
</details>

## CodeSandbox

<p>Get started instantly with one of the CodeSandboxes below.</p>

<p>
  <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" /> &nbsp;
  <a href="https://codesandbox.io/s/embla-carousel-loop-false-oyols">
    <code>Basic Setup</code>
  </a> 
  - With Previous, Next & Dot buttons.
</p>

<p>
  <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/codesandbox-logo.svg" height="23" align="top" alt="CodeSandbox" /> &nbsp;
  <a href="https://codesandbox.io/s/embla-carousel-autoplay-4yhr2">
    <code>Autoplay</code>
  </a> 
  - Example of how to setup Autoplay.
</p>

## Browser Support

<p>
  Embla has been tested in the browsers listed below. Special thanks goes to 
  <a href="https://www.browserstack.com">BrowserStack</a>.
</p>

<p>
  <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/ie-logo.svg" height="23" align="top" alt="Internet Explorer 11" /> &nbsp; <strong>IE</strong> - 11
</p>

<p>
  <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/edge-logo.svg" height="23" align="top" alt="Microsoft Edge" /> &nbsp; <strong>Edge</strong> - Latest 2 versions
</p>

<p>
  <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/chrome-logo.svg" height="23" align="top" alt="Chrome" /> &nbsp; <strong>Chrome</strong> - Latest 2 versions
</p>

<p>
  <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/firefox-logo.svg" height="23" align="top" alt="Firefox" /> &nbsp; <strong>Firefox</strong> - Latest 2 versions
</p>

<p>
  <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/safari-logo.svg" height="23" align="top" alt="Safari" /> &nbsp; <strong>Safari</strong> - Latest 2 versions
</p>

<br>

<div align="center">
  <strong>
    <h2 align="center">Contributors</h2>
  </strong>
  <p align="center">
    Thank you to all contributors for making Embla Carousel awesome! <a href="https://github.com/davidcetinkaya/embla-carousel/blob/master/CONTRIBUTING.md">Contributions</a> are welcome.
  </p>
  <p align="center">
    <a href="https://github.com/michaelrambeau"><img src="https://avatars0.githubusercontent.com/u/5546996?s=122&v=4" title="michaelrambeau" width="66" height="66" style="max-width:100%;"></a> 
    <a href="https://github.com/ehellman"><img src="https://avatars3.githubusercontent.com/u/586152?s=122&v=4" title="ehellman" width="66" height="66" style="max-width:100%;"></a>
    <a href="https://github.com/afilp"><img src="https://avatars0.githubusercontent.com/u/7850073?s=122&v=4" title="afilp" width="66" height="66" style="max-width:100%;"></a>
    <a href="https://github.com/mrksmts"><img src="https://avatars1.githubusercontent.com/u/437794?s=122&v=4" title="mrksmts" width="66" height="66" style="max-width:100%;"></a>
    <a href="https://github.com/SLMNBJ"><img src="https://avatars2.githubusercontent.com/u/30017004?s=122&v=4" title="SLMNBJ" width="66" height="66" style="max-width:100%;"></a>
    <a href="https://github.com/readeral"><img src="https://avatars0.githubusercontent.com/u/15904136?s=122&v=4" title="readeral" width="66" height="66" style="max-width:100%;"></a>
    <a href="https://github.com/gunnarx2"><img src="https://avatars2.githubusercontent.com/u/10469652?s=122&v=4" title="gunnarx2" width="66" height="66" style="max-width:100%;"></a>
    <a href="https://github.com/xiel"><img src="https://avatars0.githubusercontent.com/u/615522?s=122&v=4" title="xiel" width="66" height="66" style="max-width:100%;"></a>
    <a href="https://github.com/niubsta"><img src="https://avatars0.githubusercontent.com/u/270320?s=122&v=4" title="niubsta" width="66" height="66" style="max-width:100%;"></a>
    <a href="https://github.com/allen-garvey"><img src="https://avatars1.githubusercontent.com/u/9314727?s=400&v=4" title="allen-garvey" width="66" height="66" style="max-width:100%;"></a>
  </p>
</div>

<br>

<h2 align="center">Open Source</h2>

<p align="center">
  <sup>Copyright © 2019-present, David Cetinkaya.</sup><br>
  Embla is <a href="https://github.com/davidcetinkaya/embla-carousel/blob/master/LICENSE">MIT licensed</a> 💖
</p>

<p align="center">
  <strong>· · ·</strong>
</p>

<p align="center">
  <a href="https://www.browserstack.com">
    <img src="https://rawgit.com/davidcetinkaya/embla-carousel/master/docs/assets/browserstack-logo.svg" height="60" alt="BrowserStack" />
    </a>
</p>

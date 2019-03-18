# Embla Carousel

Embla is a lightweight carousel plugin for the web with no dependencies. It's 100% open source and free to use on both personal and commercial projects. Use it with the module bundler of your choice or by manually injecting the script.

## Installation

If you are using a module bundler...

```bash
yarn add embla-carousel
```

```javascript
import EmblaCarousel from 'embla-carousel'
const embla = EmblaCarousel(document.querySelector('.embla'))
```

...or inject the minified script [here](https://raw.githubusercontent.com/davidcetinkaya/embla-carousel/master/sandbox/index.js) into your website.

```html
<script src="embla.min.js"></script>
<script>
  const embla = EmblaCarousel(document.querySelector('.embla'))
</script>
```

## Usage

Setup your HTML markup...

```html
<div class="embla">
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

...Add some CSS...

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

...Initialize the script and pass the element node...

```javascript
import EmblaCarousel from 'embla-carousel'
const embla = EmblaCarousel(document.querySelector('.embla'))
```

...And you're good to go!

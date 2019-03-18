# Embla Carousel

Embla is a lightweight carousel plugin for the web with no dependencies. It's 100% open source and free to use on both personal and commercial projects. Use it with the module bundler of your choice or by manually injecting the script.

## Installation

If you are using a module bundler...

```bash
yarn add embla-carousel
```

...or inject the minified script [here](https://raw.githubusercontent.com/davidcetinkaya/embla-carousel/master/sandbox/index.js) into your website.

```html
<script src="embla.min.js"></script>
```

Setup your HTML markup...

```html
<div class="slider">
  <div class="slider__container">
    <div class="slider__slide">
      ...
    </div>
    <div class="slider__slide">
      ...
    </div>
    <div class="slider__slide">
      ...
    </div>
  </div>
</div>
```

...Add some CSS...

```css
.slider {
  overflow: hidden;
}
.slider__container {
  display: flex;
  will-change: transform;
}
.slider__slide {
  position: relative;
  flex: 0 0 auto;
  width: 100%;
}
```

...And you're good to go!

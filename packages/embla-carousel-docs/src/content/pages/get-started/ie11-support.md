---
title: IE11
description: How to add Internet Explorer 11 support to Embla Carousel.
order: 6
date: 2021-02-21
---

# Adding IE11 Support

As of version **6.0.0**, IE support has been removed from the Embla Carousel core. But you can easily add it by including a polyfill for `Object.assign()` like so:

```js
import 'core-js/features/object/assign'
```

Adding the above script will make Embla Carousel work in IE 11.

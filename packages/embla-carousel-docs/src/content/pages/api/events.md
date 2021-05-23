---
title: Events
description: Learn how to listen to Embla Carousel events and how to make use of them.
order: 2
date: 2021-02-21
---

# Events

Embla Carousel exposes custom events that can be hooked on to. Listening to events allows for extending the carousel. Usage is very simple like demonstrated below.

```js
const embla = EmblaCarousel(emblaNode)

embla.on('select', (eventName) => {
  console.log(`Embla just triggered ${eventName}!`)
})
```

### init

Runs when the carousel mounts for the first time. This only fires once which means that it won't fire when the carousel is re-initialized using the [reInit](/api/methods/#reinit) method.

### reInit

Runs when the [reInit](/api/methods/#reinit) method is called. When the window is resized, Embla Carousel automatically calls the [reInit](/api/methods/#reinit) method which will also fire this event.

### destroy

Runs when the carousel has been destroyed using the [destroy](/api/methods/#destroy) method. This only fires once and will be the last event the carousel fires.

### select

Runs when the selected scroll snap changes. The select event is triggered by drag interactions or the [scrollNext](/api/methods/#scrollnext), [scrollPrev](/api/methods/#scrollPrev) or [scrollTo](/api/methods/#scrollto) methods.

### scroll

Runs when the carousel is scrolling. It might be a good idea to throttle this if you're doing expensive stuff in your callback function.

### settle

Runs when the carousel has settled after scroll has been triggered. Please note that this can take longer than you think when [dragFree](/api/options/#dragfree) is enabled or when using slow transition [speeds](/api/options/#speed).

### resize

Runs when the carousel has resized triggered by the window `resize` event. Embla Carousel uses a debounced resize handler in order to prevent this event from firing many times. This event will call the [reInit](/api/methods/#reinit) method internally.

### pointerDown

Runs when the user has a pointer down on the carousel. It's triggered by a `touchstart` or a `mousedown` event.

### pointerUp

Runs when the user has released the pointer from the carousel. It's triggered by a `touchend` or a `mouseup` event.

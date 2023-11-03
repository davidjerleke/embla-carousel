---
title: Slide Container
description: This guide demonstrates how to setup the Embla Carousel slide container correctly.
order: 0
date: 2021-03-13
---

# Slide Container

Embla Carousel allows you to use **any CSS to stack your slides** in the chosen scroll [axis](/api/options/#axis), whether it's CSS Grid, flexbox, inline-blocks or anything else. This guide will show you **how to setup** your **slide container** with flexbox and CSS Grid.

---

## Using Flexbox

With the minimal [HTML setup](/get-started/module/#the-html-structure) in place, we're going use flexbox to style our slide container. First, we need to stack our slides in our chosen scroll direction. This is an example of a container with slides stacked **horizontally**:

```css
.embla__container {
  display: flex;
}
```

In order to create a **vertical** carousel, we can modify our container by setting the `flex-direction` to `column`. Additionally, a vertical carousel needs a **specified height**:

```css{3-4}
.embla__container {
  display: flex;
  flex-direction: column;
  height: 200px;
}
```

Now we're ready to declare slide sizes using the `flex` property:

```css
.embla__slide {
  flex: 0 0 80%; /* Slide covers 80% of the viewport */
}
```

## Using CSS Grid

Creating a CSS Grid container based on the minimal [HTML setup](/get-started/module/#the-html-structure) gives us the power to declare everyting, including slide sizes together with our container styles. Here's an example of a **horizontal** container setup:

```css
.embla__container {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 80%; /* Each slide covers 80% of the viewport */
}
```

We can easily modify our CSS Grid container to create a **vertical** carousel by changing our `column` declarations to `row`. Don't forget that a vertical carousel also needs a **specified height**:

```css{3-5}
.embla__container {
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: 80%; /* Each slide covers 80% of the viewport */
  height: 200px;
}
```

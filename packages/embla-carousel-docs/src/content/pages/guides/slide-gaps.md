---
title: Slide Gaps
description: Learn how to add spacing between slides in Embla Carousel using CSS.
order: 40
date: 2025-10-03
---

# Slide Gaps

This guide shows you how to add **spacing between slides** in Embla Carousel.

All examples use the **padding approach** to create gaps between slides. Although you can also use other CSS techniques like `margin` or `gap` on the container, this guide will explain **why padding is often easier to work with**, with minimal hassle compared to its alternatives.

---

## Declaring gaps

## Other approaches

Embla Carousel doesn't assign slide gaps itself. Instead, it **measures the computed dimensions of the distance between slides** — the final sizes that result from your CSS — and uses those values to calculate scrolling.

The beauty of this approach is that you can define **any slide sizes you want**, mix sizes for variable-size slides, and use **any unit you prefer**. This applies to both horizontal and vertical carousels.

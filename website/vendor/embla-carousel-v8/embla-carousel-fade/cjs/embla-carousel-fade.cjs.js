'use strict';

function clampNumber(number, min, max) {
  return Math.min(Math.max(number, min), max);
}
function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

function Fade(userOptions = {}) {
  const fullOpacity = 1;
  const noOpacity = 0;
  const fadeFriction = 0.68;
  let emblaApi;
  let opacities = [];
  let fadeToNextDistance;
  let distanceFromPointerDown = 0;
  let fadeVelocity = 0;
  let progress = 0;
  let shouldFadePair = false;
  let defaultSettledBehaviour;
  let defaultProgressBehaviour;
  function init(emblaApiInstance) {
    emblaApi = emblaApiInstance;
    const selectedSnap = emblaApi.selectedScrollSnap();
    const {
      scrollBody,
      containerRect,
      axis
    } = emblaApi.internalEngine();
    const containerSize = axis.measureSize(containerRect);
    fadeToNextDistance = clampNumber(containerSize * 0.75, 200, 500);
    shouldFadePair = false;
    opacities = emblaApi.scrollSnapList().map((_, index) => index === selectedSnap ? fullOpacity : noOpacity);
    defaultSettledBehaviour = scrollBody.settled;
    defaultProgressBehaviour = emblaApi.scrollProgress;
    scrollBody.settled = settled;
    emblaApi.scrollProgress = scrollProgress;
    emblaApi.on('select', select).on('slideFocus', fadeToSelectedSnapInstantly).on('pointerDown', pointerDown).on('pointerUp', pointerUp);
    disableScroll();
    fadeToSelectedSnapInstantly();
  }
  function destroy() {
    const {
      scrollBody
    } = emblaApi.internalEngine();
    scrollBody.settled = defaultSettledBehaviour;
    emblaApi.scrollProgress = defaultProgressBehaviour;
    emblaApi.off('select', select).off('slideFocus', fadeToSelectedSnapInstantly).off('pointerDown', pointerDown).off('pointerUp', pointerUp);
    emblaApi.slideNodes().forEach(slideNode => {
      const slideStyle = slideNode.style;
      slideStyle.opacity = '';
      slideStyle.transform = '';
      slideStyle.pointerEvents = '';
      if (!slideNode.getAttribute('style')) slideNode.removeAttribute('style');
    });
  }
  function fadeToSelectedSnapInstantly() {
    const selectedSnap = emblaApi.selectedScrollSnap();
    setOpacities(selectedSnap, fullOpacity);
  }
  function pointerUp() {
    shouldFadePair = false;
  }
  function pointerDown() {
    shouldFadePair = false;
    distanceFromPointerDown = 0;
    fadeVelocity = 0;
  }
  function select() {
    const duration = emblaApi.internalEngine().scrollBody.duration();
    fadeVelocity = duration ? 0 : fullOpacity;
    shouldFadePair = true;
    if (!duration) fadeToSelectedSnapInstantly();
  }
  function getSlideTransform(position) {
    const {
      axis
    } = emblaApi.internalEngine();
    const translateAxis = axis.scroll.toUpperCase();
    return `translate${translateAxis}(${axis.direction(position)}px)`;
  }
  function disableScroll() {
    const {
      translate,
      slideLooper
    } = emblaApi.internalEngine();
    translate.clear();
    translate.toggleActive(false);
    slideLooper.loopPoints.forEach(({
      translate
    }) => {
      translate.clear();
      translate.toggleActive(false);
    });
  }
  function lockExcessiveScroll(fadeIndex) {
    const {
      scrollSnaps,
      location,
      target
    } = emblaApi.internalEngine();
    if (!isNumber(fadeIndex) || opacities[fadeIndex] < 0.5) return;
    location.set(scrollSnaps[fadeIndex]);
    target.set(location);
  }
  function setOpacities(fadeIndex, velocity) {
    const scrollSnaps = emblaApi.scrollSnapList();
    scrollSnaps.forEach((_, indexA) => {
      const absVelocity = Math.abs(velocity);
      const currentOpacity = opacities[indexA];
      const isFadeIndex = indexA === fadeIndex;
      const nextOpacity = isFadeIndex ? currentOpacity + absVelocity : currentOpacity - absVelocity;
      const clampedOpacity = clampNumber(nextOpacity, noOpacity, fullOpacity);
      opacities[indexA] = clampedOpacity;
      const fadePair = isFadeIndex && shouldFadePair;
      const indexB = emblaApi.previousScrollSnap();
      if (fadePair) opacities[indexB] = 1 - clampedOpacity;
      if (isFadeIndex) setProgress(fadeIndex, clampedOpacity);
      setOpacity(indexA);
    });
  }
  function setOpacity(index) {
    const slidesInSnap = emblaApi.internalEngine().slideRegistry[index];
    const {
      scrollSnaps,
      containerRect
    } = emblaApi.internalEngine();
    const opacity = opacities[index];
    slidesInSnap.forEach(slideIndex => {
      const slideStyle = emblaApi.slideNodes()[slideIndex].style;
      const roundedOpacity = parseFloat(opacity.toFixed(2));
      const hasOpacity = roundedOpacity > noOpacity;
      const position = hasOpacity ? scrollSnaps[index] : containerRect.width + 2;
      const transform = getSlideTransform(position);
      if (hasOpacity) slideStyle.transform = transform;
      slideStyle.opacity = roundedOpacity.toString();
      slideStyle.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
      if (!hasOpacity) slideStyle.transform = transform;
    });
  }
  function setProgress(fadeIndex, opacity) {
    const {
      index,
      dragHandler,
      scrollSnaps
    } = emblaApi.internalEngine();
    const pointerDown = dragHandler.pointerDown();
    const snapFraction = 1 / (scrollSnaps.length - 1);
    let indexA = fadeIndex;
    let indexB = pointerDown ? emblaApi.selectedScrollSnap() : emblaApi.previousScrollSnap();
    if (pointerDown && indexA === indexB) {
      const reverseSign = Math.sign(distanceFromPointerDown) * -1;
      indexA = indexB;
      indexB = index.clone().set(indexB).add(reverseSign).get();
    }
    const currentPosition = indexB * snapFraction;
    const diffPosition = (indexA - indexB) * snapFraction;
    progress = currentPosition + diffPosition * opacity;
  }
  function getFadeIndex() {
    const {
      dragHandler,
      index,
      scrollBody
    } = emblaApi.internalEngine();
    const selectedSnap = emblaApi.selectedScrollSnap();
    if (!dragHandler.pointerDown()) return selectedSnap;
    const directionSign = Math.sign(scrollBody.velocity());
    const distanceSign = Math.sign(distanceFromPointerDown);
    const nextSnap = index.clone().set(selectedSnap).add(directionSign * -1).get();
    if (!directionSign || !distanceSign) return null;
    return distanceSign === directionSign ? nextSnap : selectedSnap;
  }
  function fade(emblaApi) {
    const {
      dragHandler,
      scrollBody
    } = emblaApi.internalEngine();
    const pointerDown = dragHandler.pointerDown();
    const velocity = scrollBody.velocity();
    const duration = scrollBody.duration();
    const fadeIndex = getFadeIndex();
    const noFadeIndex = !isNumber(fadeIndex);
    if (pointerDown) {
      if (!velocity) return;
      distanceFromPointerDown += velocity;
      fadeVelocity = Math.abs(velocity / fadeToNextDistance);
      lockExcessiveScroll(fadeIndex);
    }
    if (!pointerDown) {
      if (!duration || noFadeIndex) return;
      fadeVelocity += (fullOpacity - opacities[fadeIndex]) / duration;
      fadeVelocity *= fadeFriction;
    }
    if (noFadeIndex) return;
    setOpacities(fadeIndex, fadeVelocity);
  }
  function settled() {
    const {
      target,
      location
    } = emblaApi.internalEngine();
    const diffToTarget = target.get() - location.get();
    const notReachedTarget = Math.abs(diffToTarget) >= 1;
    const fadeIndex = getFadeIndex();
    const noFadeIndex = !isNumber(fadeIndex);
    fade(emblaApi);
    if (noFadeIndex || notReachedTarget) return false;
    return opacities[fadeIndex] > 0.999;
  }
  function scrollProgress() {
    return progress;
  }
  const self = {
    name: 'fade',
    options: userOptions,
    init,
    destroy
  };
  return self;
}
Fade.globalOptions = undefined;

module.exports = Fade;
//# sourceMappingURL=embla-carousel-fade.cjs.js.map

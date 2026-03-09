const defaultOptions = {
  direction: 'forward',
  speed: 2,
  startDelay: 1000,
  active: true,
  breakpoints: {},
  playOnInit: true,
  stopOnFocusIn: true,
  stopOnInteraction: true,
  stopOnMouseEnter: false,
  rootNode: null
};

function getAutoScrollRootNode(emblaApi, rootNode) {
  const emblaRootNode = emblaApi.rootNode();
  return rootNode && rootNode(emblaRootNode) || emblaRootNode;
}

function AutoScroll(userOptions = {}) {
  let options;
  let emblaApi;
  let destroyed;
  let startDelay;
  let timerId = 0;
  let autoScrollActive = false;
  let mouseIsOver = false;
  let defaultScrollBehaviour;
  function init(emblaApiInstance, optionsHandler) {
    emblaApi = emblaApiInstance;
    const {
      mergeOptions,
      optionsAtMedia
    } = optionsHandler;
    const optionsBase = mergeOptions(defaultOptions, AutoScroll.globalOptions);
    const allOptions = mergeOptions(optionsBase, userOptions);
    options = optionsAtMedia(allOptions);
    if (emblaApi.scrollSnapList().length <= 1) return;
    startDelay = options.startDelay;
    destroyed = false;
    defaultScrollBehaviour = emblaApi.internalEngine().scrollBody;
    const {
      eventStore
    } = emblaApi.internalEngine();
    const isDraggable = !!emblaApi.internalEngine().options.watchDrag;
    const root = getAutoScrollRootNode(emblaApi, options.rootNode);
    if (isDraggable) {
      emblaApi.on('pointerDown', pointerDown);
    }
    if (isDraggable && !options.stopOnInteraction) {
      emblaApi.on('pointerUp', pointerUp);
    }
    if (options.stopOnMouseEnter) {
      eventStore.add(root, 'mouseenter', mouseEnter);
    }
    if (options.stopOnMouseEnter && !options.stopOnInteraction) {
      eventStore.add(root, 'mouseleave', mouseLeave);
    }
    if (options.stopOnFocusIn) {
      emblaApi.on('slideFocusStart', stopAutoScroll);
    }
    if (options.stopOnFocusIn && !options.stopOnInteraction) {
      eventStore.add(emblaApi.containerNode(), 'focusout', startAutoScroll);
    }
    if (options.playOnInit) startAutoScroll();
  }
  function destroy() {
    emblaApi.off('pointerDown', pointerDown).off('pointerUp', pointerUp).off('slideFocusStart', stopAutoScroll).off('settle', settle);
    stopAutoScroll();
    destroyed = true;
    autoScrollActive = false;
  }
  function startAutoScroll() {
    if (destroyed) return;
    if (autoScrollActive) return;
    emblaApi.emit('autoScroll:play');
    const engine = emblaApi.internalEngine();
    const {
      ownerWindow
    } = engine;
    timerId = ownerWindow.setTimeout(() => {
      engine.scrollBody = createAutoScrollBehaviour(engine);
      engine.animation.start();
    }, startDelay);
    autoScrollActive = true;
  }
  function stopAutoScroll() {
    if (destroyed) return;
    if (!autoScrollActive) return;
    emblaApi.emit('autoScroll:stop');
    const engine = emblaApi.internalEngine();
    const {
      ownerWindow
    } = engine;
    engine.scrollBody = defaultScrollBehaviour;
    ownerWindow.clearTimeout(timerId);
    timerId = 0;
    autoScrollActive = false;
  }
  function createAutoScrollBehaviour(engine) {
    const {
      location,
      previousLocation,
      offsetLocation,
      target,
      scrollTarget,
      index,
      indexPrevious,
      limit: {
        reachedMin,
        reachedMax,
        constrain
      },
      options: {
        loop
      }
    } = engine;
    const directionSign = options.direction === 'forward' ? -1 : 1;
    const noop = () => self;
    let bodyVelocity = 0;
    let scrollDirection = 0;
    let rawLocation = location.get();
    let rawLocationPrevious = 0;
    let hasSettled = false;
    function seek() {
      let directionDiff = 0;
      previousLocation.set(location);
      bodyVelocity = directionSign * options.speed;
      rawLocation += bodyVelocity;
      location.add(bodyVelocity);
      target.set(location);
      directionDiff = rawLocation - rawLocationPrevious;
      scrollDirection = Math.sign(directionDiff);
      rawLocationPrevious = rawLocation;
      const currentIndex = scrollTarget.byDistance(0, false).index;
      if (index.get() !== currentIndex) {
        indexPrevious.set(index.get());
        index.set(currentIndex);
        emblaApi.emit('select');
      }
      const reachedEnd = options.direction === 'forward' ? reachedMin(offsetLocation.get()) : reachedMax(offsetLocation.get());
      if (!loop && reachedEnd) {
        hasSettled = true;
        const constrainedLocation = constrain(location.get());
        location.set(constrainedLocation);
        target.set(location);
        stopAutoScroll();
      }
      return self;
    }
    const self = {
      direction: () => scrollDirection,
      duration: () => -1,
      velocity: () => bodyVelocity,
      settled: () => hasSettled,
      seek,
      useBaseFriction: noop,
      useBaseDuration: noop,
      useFriction: noop,
      useDuration: noop
    };
    return self;
  }
  function pointerDown() {
    if (!mouseIsOver) stopAutoScroll();
  }
  function pointerUp() {
    if (!mouseIsOver) startAutoScrollOnSettle();
  }
  function mouseEnter() {
    mouseIsOver = true;
    stopAutoScroll();
  }
  function mouseLeave() {
    mouseIsOver = false;
    startAutoScroll();
  }
  function settle() {
    emblaApi.off('settle', settle);
    startAutoScroll();
  }
  function startAutoScrollOnSettle() {
    emblaApi.on('settle', settle);
  }
  function play(startDelayOverride) {
    if (typeof startDelayOverride !== 'undefined') {
      startDelay = startDelayOverride;
    }
    startAutoScroll();
  }
  function stop() {
    if (autoScrollActive) stopAutoScroll();
  }
  function reset() {
    if (autoScrollActive) {
      stopAutoScroll();
      startAutoScrollOnSettle();
    }
  }
  function isPlaying() {
    return autoScrollActive;
  }
  const self = {
    name: 'autoScroll',
    options: userOptions,
    init,
    destroy,
    play,
    stop,
    reset,
    isPlaying
  };
  return self;
}
AutoScroll.globalOptions = undefined;

export { AutoScroll as default };
//# sourceMappingURL=embla-carousel-auto-scroll.esm.js.map

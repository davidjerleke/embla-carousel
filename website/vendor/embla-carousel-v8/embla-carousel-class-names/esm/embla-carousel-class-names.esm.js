const defaultOptions = {
  active: true,
  breakpoints: {},
  snapped: 'is-snapped',
  inView: 'is-in-view',
  draggable: 'is-draggable',
  dragging: 'is-dragging',
  loop: 'is-loop'
};

function normalizeClassNames(classNames) {
  const normalized = Array.isArray(classNames) ? classNames : [classNames];
  return normalized.filter(Boolean);
}
function removeClass(node, classNames) {
  if (!node || !classNames.length) return;
  node.classList.remove(...classNames);
}
function addClass(node, classNames) {
  if (!node || !classNames.length) return;
  node.classList.add(...classNames);
}

function ClassNames(userOptions = {}) {
  let options;
  let emblaApi;
  let root;
  let slides;
  let snappedIndexes = [];
  let inViewIndexes = [];
  const selectedEvents = ['select'];
  const draggingEvents = ['pointerDown', 'pointerUp'];
  const inViewEvents = ['slidesInView'];
  const classNames = {
    snapped: [],
    inView: [],
    draggable: [],
    dragging: [],
    loop: []
  };
  function init(emblaApiInstance, optionsHandler) {
    emblaApi = emblaApiInstance;
    const {
      mergeOptions,
      optionsAtMedia
    } = optionsHandler;
    const optionsBase = mergeOptions(defaultOptions, ClassNames.globalOptions);
    const allOptions = mergeOptions(optionsBase, userOptions);
    options = optionsAtMedia(allOptions);
    root = emblaApi.rootNode();
    slides = emblaApi.slideNodes();
    const {
      watchDrag,
      loop
    } = emblaApi.internalEngine().options;
    const isDraggable = !!watchDrag;
    if (options.loop && loop) {
      classNames.loop = normalizeClassNames(options.loop);
      addClass(root, classNames.loop);
    }
    if (options.draggable && isDraggable) {
      classNames.draggable = normalizeClassNames(options.draggable);
      addClass(root, classNames.draggable);
    }
    if (options.dragging) {
      classNames.dragging = normalizeClassNames(options.dragging);
      draggingEvents.forEach(evt => emblaApi.on(evt, toggleDraggingClass));
    }
    if (options.snapped) {
      classNames.snapped = normalizeClassNames(options.snapped);
      selectedEvents.forEach(evt => emblaApi.on(evt, toggleSnappedClasses));
      toggleSnappedClasses();
    }
    if (options.inView) {
      classNames.inView = normalizeClassNames(options.inView);
      inViewEvents.forEach(evt => emblaApi.on(evt, toggleInViewClasses));
      toggleInViewClasses();
    }
  }
  function destroy() {
    draggingEvents.forEach(evt => emblaApi.off(evt, toggleDraggingClass));
    selectedEvents.forEach(evt => emblaApi.off(evt, toggleSnappedClasses));
    inViewEvents.forEach(evt => emblaApi.off(evt, toggleInViewClasses));
    removeClass(root, classNames.loop);
    removeClass(root, classNames.draggable);
    removeClass(root, classNames.dragging);
    toggleSlideClasses([], snappedIndexes, classNames.snapped);
    toggleSlideClasses([], inViewIndexes, classNames.inView);
    Object.keys(classNames).forEach(classNameKey => {
      const key = classNameKey;
      classNames[key] = [];
    });
  }
  function toggleDraggingClass(_, evt) {
    const toggleClass = evt === 'pointerDown' ? addClass : removeClass;
    toggleClass(root, classNames.dragging);
  }
  function toggleSlideClasses(addClassIndexes = [], removeClassIndexes = [], classNames) {
    const removeClassSlides = removeClassIndexes.map(index => slides[index]);
    const addClassSlides = addClassIndexes.map(index => slides[index]);
    removeClassSlides.forEach(slide => removeClass(slide, classNames));
    addClassSlides.forEach(slide => addClass(slide, classNames));
    return addClassIndexes;
  }
  function toggleSnappedClasses() {
    const {
      slideRegistry
    } = emblaApi.internalEngine();
    const newSnappedIndexes = slideRegistry[emblaApi.selectedScrollSnap()];
    snappedIndexes = toggleSlideClasses(newSnappedIndexes, snappedIndexes, classNames.snapped);
  }
  function toggleInViewClasses() {
    const newInViewIndexes = emblaApi.slidesInView();
    inViewIndexes = toggleSlideClasses(newInViewIndexes, inViewIndexes, classNames.inView);
  }
  const self = {
    name: 'classNames',
    options: userOptions,
    init,
    destroy
  };
  return self;
}
ClassNames.globalOptions = undefined;

export { ClassNames as default };
//# sourceMappingURL=embla-carousel-class-names.esm.js.map

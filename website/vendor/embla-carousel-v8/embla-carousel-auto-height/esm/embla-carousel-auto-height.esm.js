function AutoHeight(userOptions = {}) {
  let emblaApi;
  let slideHeights = [];
  const heightEvents = ['select', 'slideFocus'];
  function init(emblaApiInstance) {
    emblaApi = emblaApiInstance;
    const {
      options: {
        axis
      },
      slideRects
    } = emblaApi.internalEngine();
    if (axis === 'y') return;
    slideHeights = slideRects.map(slideRect => slideRect.height);
    heightEvents.forEach(evt => emblaApi.on(evt, setContainerHeight));
    setContainerHeight();
  }
  function destroy() {
    heightEvents.forEach(evt => emblaApi.off(evt, setContainerHeight));
    const container = emblaApi.containerNode();
    container.style.height = '';
    if (!container.getAttribute('style')) container.removeAttribute('style');
  }
  function highestInView() {
    const {
      slideRegistry
    } = emblaApi.internalEngine();
    const selectedIndexes = slideRegistry[emblaApi.selectedScrollSnap()];
    if (!selectedIndexes) return null;
    return selectedIndexes.map(index => slideHeights[index]).reduce((a, b) => Math.max(a, b), 0);
  }
  function setContainerHeight() {
    const height = highestInView();
    if (height === null) return;
    emblaApi.containerNode().style.height = `${highestInView()}px`;
  }
  const self = {
    name: 'autoHeight',
    options: userOptions,
    init,
    destroy
  };
  return self;
}
AutoHeight.globalOptions = undefined;

export { AutoHeight as default };
//# sourceMappingURL=embla-carousel-auto-height.esm.js.map

'use strict';

var vue = require('vue');
var emblaCarouselReactiveUtils = require('embla-carousel-reactive-utils');
var EmblaCarousel = require('embla-carousel');

function emblaCarouselVue(options = {}, plugins = []) {
  const isRefOptions = vue.isRef(options);
  const isRefPlugins = vue.isRef(plugins);
  let storedOptions = isRefOptions ? options.value : options;
  let storedPlugins = isRefPlugins ? plugins.value : plugins;
  const emblaNode = vue.shallowRef();
  const emblaApi = vue.shallowRef();
  function reInit() {
    if (!emblaApi.value) return;
    emblaApi.value.reInit(storedOptions, storedPlugins);
  }
  vue.onMounted(() => {
    if (!emblaCarouselReactiveUtils.canUseDOM() || !emblaNode.value) return;
    EmblaCarousel.globalOptions = emblaCarouselVue.globalOptions;
    emblaApi.value = EmblaCarousel(emblaNode.value, storedOptions, storedPlugins);
  });
  vue.onBeforeUnmount(() => {
    if (emblaApi.value) emblaApi.value.destroy();
  });
  if (isRefOptions) {
    vue.watch(options, newOptions => {
      if (emblaCarouselReactiveUtils.areOptionsEqual(storedOptions, newOptions)) return;
      storedOptions = newOptions;
      reInit();
    });
  }
  if (isRefPlugins) {
    vue.watch(plugins, newPlugins => {
      if (emblaCarouselReactiveUtils.arePluginsEqual(storedPlugins, newPlugins)) return;
      storedPlugins = newPlugins;
      reInit();
    });
  }
  return [emblaNode, emblaApi];
}
emblaCarouselVue.globalOptions = undefined;

module.exports = emblaCarouselVue;
//# sourceMappingURL=embla-carousel-vue.cjs.js.map

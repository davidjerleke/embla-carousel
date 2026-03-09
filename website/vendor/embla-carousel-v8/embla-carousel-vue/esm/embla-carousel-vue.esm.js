import { isRef, shallowRef, onMounted, onBeforeUnmount, watch } from 'vue';
import { canUseDOM, areOptionsEqual, arePluginsEqual } from 'embla-carousel-reactive-utils';
import EmblaCarousel from 'embla-carousel';

function emblaCarouselVue(options = {}, plugins = []) {
  const isRefOptions = isRef(options);
  const isRefPlugins = isRef(plugins);
  let storedOptions = isRefOptions ? options.value : options;
  let storedPlugins = isRefPlugins ? plugins.value : plugins;
  const emblaNode = shallowRef();
  const emblaApi = shallowRef();
  function reInit() {
    if (!emblaApi.value) return;
    emblaApi.value.reInit(storedOptions, storedPlugins);
  }
  onMounted(() => {
    if (!canUseDOM() || !emblaNode.value) return;
    EmblaCarousel.globalOptions = emblaCarouselVue.globalOptions;
    emblaApi.value = EmblaCarousel(emblaNode.value, storedOptions, storedPlugins);
  });
  onBeforeUnmount(() => {
    if (emblaApi.value) emblaApi.value.destroy();
  });
  if (isRefOptions) {
    watch(options, newOptions => {
      if (areOptionsEqual(storedOptions, newOptions)) return;
      storedOptions = newOptions;
      reInit();
    });
  }
  if (isRefPlugins) {
    watch(plugins, newPlugins => {
      if (arePluginsEqual(storedPlugins, newPlugins)) return;
      storedPlugins = newPlugins;
      reInit();
    });
  }
  return [emblaNode, emblaApi];
}
emblaCarouselVue.globalOptions = undefined;

export { emblaCarouselVue as default };
//# sourceMappingURL=embla-carousel-vue.esm.js.map

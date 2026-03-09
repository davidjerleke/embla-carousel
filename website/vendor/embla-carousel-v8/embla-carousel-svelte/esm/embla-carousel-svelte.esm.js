import { canUseDOM, areOptionsEqual, arePluginsEqual } from 'embla-carousel-reactive-utils';
import EmblaCarousel from 'embla-carousel';

function emblaCarouselSvelte(emblaNode, emblaConfig = {
  options: {},
  plugins: []
}) {
  let storedEmblaConfig = emblaConfig;
  let emblaApi;
  if (canUseDOM()) {
    EmblaCarousel.globalOptions = emblaCarouselSvelte.globalOptions;
    emblaApi = EmblaCarousel(emblaNode, storedEmblaConfig.options, storedEmblaConfig.plugins);
    emblaApi.on('init', () => emblaNode.dispatchEvent(new CustomEvent('emblaInit', {
      detail: emblaApi
    })));
  }
  return {
    destroy: () => {
      if (emblaApi) emblaApi.destroy();
    },
    update: newEmblaConfig => {
      const optionsChanged = !areOptionsEqual(storedEmblaConfig.options, newEmblaConfig.options);
      const pluginsChanged = !arePluginsEqual(storedEmblaConfig.plugins, newEmblaConfig.plugins);
      if (!optionsChanged && !pluginsChanged) return;
      storedEmblaConfig = newEmblaConfig;
      if (emblaApi) {
        emblaApi.reInit(storedEmblaConfig.options, storedEmblaConfig.plugins);
      }
    }
  };
}
emblaCarouselSvelte.globalOptions = undefined;

export { emblaCarouselSvelte as default };
//# sourceMappingURL=embla-carousel-svelte.esm.js.map

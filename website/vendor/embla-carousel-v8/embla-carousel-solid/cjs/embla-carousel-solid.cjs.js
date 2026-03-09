'use strict';

var EmblaCarousel = require('embla-carousel');
var emblaCarouselReactiveUtils = require('embla-carousel-reactive-utils');
var solidJs = require('solid-js');

function createEmblaCarousel(options, plugins) {
  let storedOptions = options ? options() : {};
  let storedPlugins = plugins ? plugins() : [];
  const [emblaApi, setEmblaApi] = solidJs.createSignal();
  const [viewport, setViewport] = solidJs.createSignal();
  function reInit() {
    const api = emblaApi();
    if (api) api.reInit(storedOptions, storedPlugins);
  }
  solidJs.createEffect(solidJs.on(viewport, viewport => {
    if (emblaCarouselReactiveUtils.canUseDOM() && viewport) {
      EmblaCarousel.globalOptions = createEmblaCarousel.globalOptions;
      const newEmblaApi = EmblaCarousel(viewport, storedOptions, storedPlugins);
      setEmblaApi(newEmblaApi);
      solidJs.onCleanup(() => newEmblaApi.destroy());
    } else {
      setEmblaApi(undefined);
    }
  }));
  solidJs.createEffect(() => {
    if (!emblaCarouselReactiveUtils.canUseDOM()) return;
    const newOptions = options ? options() : {};
    if (emblaCarouselReactiveUtils.areOptionsEqual(storedOptions, newOptions)) return;
    storedOptions = newOptions;
    reInit();
  });
  solidJs.createEffect(() => {
    if (!emblaCarouselReactiveUtils.canUseDOM()) return;
    const newPlugins = plugins ? plugins() : [];
    if (emblaCarouselReactiveUtils.arePluginsEqual(storedPlugins, newPlugins)) return;
    storedPlugins = newPlugins;
    reInit();
  });
  return [setViewport, emblaApi];
}
createEmblaCarousel.globalOptions = undefined;

module.exports = createEmblaCarousel;
//# sourceMappingURL=embla-carousel-solid.cjs.js.map

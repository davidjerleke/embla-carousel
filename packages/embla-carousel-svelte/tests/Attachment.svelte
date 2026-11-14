<script>
  import createEmblaCarousel from 'embla-carousel-svelte/attachment'
  let visible = $state(true)
  let api = $state.raw()
  let options = $state({ loop: false, breakpoints: { '(min-width: 100px)': { loop: false } } })
  let pluginOptions = $state({ active: true, breakpoints: {} })
  let pluginInits = 0
  let pluginDestroys = 0
  function plugin(name) {
    return { name, options: pluginOptions, init() { pluginInits++ }, destroy() { pluginDestroys++ } }
  }
  let plugins = $state.raw([plugin('test')])
  const firstCalls = []
  const secondCalls = []
  let callback = $state((value) => { if (typeof window === 'undefined') throw Error('callback ran during SSR'); const old = api; api = value; firstCalls.push(value) })
  const attachment = createEmblaCarousel(() => ({ options, plugins, onApiChange: callback }))
  export function getApi() { return api }
  export function calls() { return [firstCalls, secondCalls] }
  export function pluginCounts() { return [pluginInits, pluginDestroys] }
  export function changeOptions() { options.loop = !options.loop }
  export function changeNestedOptions() { options.breakpoints['(min-width: 100px)'].loop = true }
  export function equivalentOptions() { options = { ...options } }
  export function changePluginOptions() { pluginOptions.active = false }
  export function replacePlugin() { plugins = [plugin('replacement')] }
  export function replaceCallback() {
    callback = (value) => { if (typeof window === 'undefined') throw Error('callback ran during SSR'); const old = api; api = value; secondCalls.push(value) }
  }
  export function hide() { visible = false }
  export function show() { visible = true }
</script>

{#if visible}
  <div {@attach attachment}>
    <div><div>Slide 1</div><div>Slide 2</div></div>
  </div>
{/if}

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { JSDOM } from 'jsdom'
const hydrate = process.argv[4] === 'hydrate'
const dom = new JSDOM(
  '<!doctype html><body>' +
    (hydrate ? readFileSync('ssr.html', 'utf8') : '') +
    '</body>',
  { pretendToBeVisual: true }
)
for (const name of [
  'window',
  'document',
  'Node',
  'Element',
  'HTMLElement',
  'HTMLMediaElement',
  'CustomEvent',
  'Event',
  'Text',
  'Comment',
  'MutationObserver',
  'getComputedStyle'
]) {
  Object.defineProperty(globalThis, name, {
    value: dom.window[name],
    configurable: true
  })
}
window.matchMedia = (media) => ({
  media,
  matches: false,
  addEventListener() {},
  removeEventListener() {}
})
window.IntersectionObserver = window.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.requestAnimationFrame = window.requestAnimationFrame.bind(window)
globalThis.cancelAnimationFrame = window.cancelAnimationFrame.bind(window)
const svelte = await import('svelte')
const { default: Component } = await import('./client.mjs')
const modern = Number(process.argv[2]) >= 5
const instance = modern
  ? (hydrate ? svelte.hydrate : svelte.mount)(Component, {
      target: document.body
    })
  : new Component({ target: document.body })
const flush = async () => {
  if (svelte.flushSync) svelte.flushSync()
  await svelte.tick()
}
await flush()
const api = instance.getApi()
assert.ok(api, 'mount exposes a carousel API')
let destroys = 0
api.on('destroy', () => destroys++)
if (process.argv[3] === 'attachment') {
  let reinits = 0
  api.on('reinit', () => reinits++)
  assert.equal(
    instance.calls()[0].length,
    1,
    'callback reads/writes state without resubscribing'
  )
  instance.changeOptions()
  await flush()
  assert.equal(instance.getApi(), api, 'option changes preserve API identity')
  assert.equal(reinits, 1)
  instance.changeNestedOptions()
  await flush()
  assert.equal(reinits, 2, 'nested proxy mutations reinitialize')
  instance.equivalentOptions()
  await flush()
  assert.equal(reinits, 2, 'equivalent options do not reinitialize')
  instance.changePluginOptions()
  await flush()
  assert.equal(reinits, 3, 'plugin option mutations reinitialize')
  instance.replacePlugin()
  await flush()
  assert.equal(reinits, 4, 'plugin replacement reinitializes')
  assert.ok(instance.pluginCounts()[0] >= 1)
  assert.ok(instance.pluginCounts()[1] >= 1)
  instance.replaceCallback()
  await flush()
  assert.equal(reinits, 4, 'callback changes do not reinitialize')
  assert.equal(instance.calls()[0].at(-1), undefined, 'old callback released')
  assert.equal(instance.calls()[1][0], api, 'new callback receives current API')
  instance.hide()
  await flush()
  assert.equal(destroys, 1)
  assert.equal(instance.getApi(), undefined)
  instance.show()
  await flush()
  const remounted = instance.getApi()
  assert.ok(remounted)
  assert.notEqual(remounted, api)
  remounted.on('destroy', () => destroys++)
}
if (modern) await svelte.unmount(instance)
else instance.$destroy()
assert.equal(
  destroys,
  process.argv[3] === 'attachment' ? 2 : 1,
  'each carousel destroyed once'
)
if (process.argv[3] === 'attachment')
  assert.equal(instance.calls()[1].at(-1), undefined)
dom.window.close()

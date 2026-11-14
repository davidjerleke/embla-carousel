import assert from 'node:assert/strict'
import { writeFileSync } from 'node:fs'
import Component from './server-component.mjs'
const html =
  Number(process.argv[2]) >= 5
    ? (await import('svelte/server')).render(Component).body
    : Component.render().html
assert.match(html, /Slide 1/)
assert.equal(typeof window, 'undefined')

writeFileSync('ssr.html', html)

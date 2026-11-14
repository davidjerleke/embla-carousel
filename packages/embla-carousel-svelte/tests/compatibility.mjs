// Run after building embla-carousel, embla-carousel-reactive-utils and this package.
// Installs packed packages in a disposable consumer, never the workspace sources.
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '../../..')
const consumer = mkdtempSync(path.join(tmpdir(), 'embla-svelte-compat-'))
function run(command, args, cwd = consumer) {
  return execFileSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  })
}
const tarballs = [
  'embla-carousel',
  'embla-carousel-reactive-utils',
  'embla-carousel-svelte'
].map((name) => {
  const result = JSON.parse(
    run(
      'npm',
      ['pack', '--json', '--pack-destination', consumer],
      path.join(root, 'packages', name)
    )
  )
  return path.join(consumer, result[0].filename)
})
writeFileSync(
  path.join(consumer, 'package.json'),
  JSON.stringify({ private: true, type: 'module' })
)
const published = JSON.parse(
  run('npm', ['view', 'svelte@5', 'version', '--json'])
)
const latest = Array.isArray(published) ? published.at(-1) : published
const versions = ['3.59.2', '4.2.20', '5.0.0', '5.28.2', '5.29.0', latest]
for (const version of [...new Set(versions)]) {
  const major = Number(version.split('.')[0])
  const attachment = major === 5 && Number(version.split('.')[1]) >= 29
  run('npm', [
    'install',
    '--ignore-scripts',
    '--no-audit',
    '--no-fund',
    ...tarballs,
    `svelte@${version}`,
    'jsdom@26.1.0',
    'typescript@5.9.3',
    '@types/node@22',
    ...(attachment ? ['svelte-check@4'] : [])
  ])
  const packageRoot = path.join(consumer, 'node_modules/embla-carousel-svelte')
  const rootTypes = readFileSync(
    path.join(packageRoot, 'esm/index.d.ts'),
    'utf8'
  )
  assert.doesNotMatch(rootTypes, /attachment/)
  for (const folder of ['esm', 'cjs']) {
    const code = readFileSync(
      path.join(packageRoot, folder, `embla-carousel-svelte.${folder}.js`),
      'utf8'
    )
    assert.doesNotMatch(
      code,
      /svelte\/internal|svelte\/attachments|user_effect/
    )
  }
  const legacyType = `import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-svelte';\nconst action: UseEmblaCarouselType = useEmblaCarousel(document.createElement('div'));\naction.update?.({ options: { loop: true } });\nuseEmblaCarousel({ options: { loop: false } });\n`
  const attachmentType = `import createEmblaCarousel, { type EmblaCarouselAttachmentConfigType } from 'embla-carousel-svelte/attachment';\nimport type { Attachment } from 'svelte/attachments';\nconst config: EmblaCarouselAttachmentConfigType = { onApiChange(api) { api?.goToNext(); } };\nconst attachment: Attachment<HTMLElement> = createEmblaCarousel(() => config);\n`
  for (const ext of ['mts', 'cts']) {
    writeFileSync(
      path.join(consumer, `consumer.${ext}`),
      legacyType + (attachment ? attachmentType : '')
    )
    run('node', [
      'node_modules/typescript/bin/tsc',
      '--noEmit',
      '--strict',
      '--target',
      'es2020',
      '--module',
      'NodeNext',
      '--moduleResolution',
      'NodeNext',
      `consumer.${ext}`
    ])
  }
  writeFileSync(
    path.join(consumer, 'consumer.ts'),
    legacyType + (attachment ? attachmentType : '')
  )
  run('node', [
    'node_modules/typescript/bin/tsc',
    '--noEmit',
    '--strict',
    '--target',
    'es2020',
    '--module',
    'esnext',
    '--moduleResolution',
    'bundler',
    'consumer.ts'
  ])
  run('node', [
    '--input-type=module',
    '-e',
    "import action from 'embla-carousel-svelte'; import pkg from 'embla-carousel-svelte/package.json' with { type: 'json' }; if(typeof action !== 'function' || !pkg.exports['./attachment']) throw Error('exports')"
  ])
  run('node', [
    '-e',
    "if(typeof require('embla-carousel-svelte') !== 'function') throw Error('CJS root')"
  ])
  if (attachment) {
    run('node', [
      '--input-type=module',
      '-e',
      "import attachment from 'embla-carousel-svelte/attachment'; if(typeof attachment !== 'function') throw Error('ESM attachment')"
    ])
    run('node', [
      '-e',
      "if(typeof require('embla-carousel-svelte/attachment') !== 'function') throw Error('CJS attachment')"
    ])
  }
  for (const fixture of ['Legacy', ...(attachment ? ['Attachment'] : [])]) {
    copyFileSync(
      path.join(here, `${fixture}.svelte`),
      path.join(consumer, 'Component.svelte')
    )
    writeFileSync(
      path.join(consumer, 'compile.mjs'),
      `import { compile } from 'svelte/compiler';\nimport { readFileSync, writeFileSync } from 'node:fs';\nconst source = readFileSync('Component.svelte', 'utf8');\nfor (const [generate, filename] of ${JSON.stringify(
        major >= 5
          ? [
              ['client', 'client.mjs'],
              ['server', 'server-component.mjs']
            ]
          : [
              ['dom', 'client.mjs'],
              ['ssr', 'server-component.mjs']
            ]
      )}) {\nconst result = compile(source, { filename: 'Component.svelte', generate });\nwriteFileSync(filename, result.js.code);\n}\n`
    )
    run('node', ['compile.mjs'])
    for (const runner of ['browser.mjs', 'server.mjs'])
      copyFileSync(path.join(here, runner), path.join(consumer, runner))
    run('node', [
      '--conditions=browser',
      'browser.mjs',
      String(major),
      fixture.toLowerCase()
    ])
    run('node', ['server.mjs', String(major)])
    if (fixture === 'Attachment')
      run('node', [
        '--conditions=browser',
        'browser.mjs',
        String(major),
        'attachment',
        'hydrate'
      ])
  }
  if (attachment) {
    copyFileSync(
      path.join(
        root,
        'website/src/content/v9/code-snippets/get-started/svelte/using-attachments-01.svelte'
      ),
      path.join(consumer, 'Typed.svelte')
    )
    writeFileSync(
      path.join(consumer, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          target: 'ES2020',
          module: 'ESNext',
          moduleResolution: 'bundler',
          strict: true
        },
        include: ['Typed.svelte']
      })
    )
    run('node', [
      'node_modules/svelte-check/bin/svelte-check',
      '--tsconfig',
      './tsconfig.json',
      '--fail-on-warnings'
    ])
  } else {
    copyFileSync(
      path.join(here, 'Attachment.svelte'),
      path.join(consumer, 'Unsupported.svelte')
    )
    writeFileSync(
      path.join(consumer, 'unsupported.mjs'),
      `import assert from 'node:assert/strict';
import { compile } from 'svelte/compiler';
import { readFileSync } from 'node:fs';
assert.throws(() => compile(readFileSync('Unsupported.svelte', 'utf8')));
`
    )
    run('node', ['unsupported.mjs'])
  }
  console.log(
    `PASS Svelte ${version}: packed ESM/CJS, NodeNext ESM/CJS + bundler TypeScript, action mount/destroy + SSR${
      attachment
        ? ', attachment reactivity/lifecycle + SSR/hydration + svelte-check'
        : ''
    }`
  )
}
console.log(`Consumer retained for inspection: ${consumer}`)

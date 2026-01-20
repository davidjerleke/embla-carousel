import { DefaultProps } from 'prism-react-renderer'

export const addPrismSvelteSupport = (Prism: DefaultProps['Prism']) => {
  const blocks = '(if|else if|await|then|catch|each|html|debug)'

  const PrismInstance = Prism as unknown as typeof import('prismjs')

  PrismInstance.languages.svelte = PrismInstance.languages.extend('markup', {
    each: {
      pattern: new RegExp(
        '{[#/]each' +
          '(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}'
      ),
      inside: {
        'language-javascript': [
          {
            pattern: /(as[\s\S]*)\([\s\S]*\)(?=\s*\})/,
            lookbehind: true,
            inside: PrismInstance.languages['javascript']
          },
          {
            pattern: /(as[\s]*)[\s\S]*(?=\s*)/,
            lookbehind: true,
            inside: PrismInstance.languages['javascript']
          },
          {
            pattern: /(#each[\s]*)[\s\S]*(?=as)/,
            lookbehind: true,
            inside: PrismInstance.languages['javascript']
          }
        ],
        keyword: /[#/]each|as/,
        punctuation: /{|}/
      }
    },
    block: {
      pattern: new RegExp(
        '{[#:/@]/s' +
          blocks +
          '(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}'
      ),
      inside: {
        punctuation: /^{|}$/,
        keyword: [new RegExp('[#:/@]' + blocks + '( )*'), /as/, /then/],
        'language-javascript': {
          pattern: /[\s\S]*/,
          inside: PrismInstance.languages['javascript']
        }
      }
    },
    tag: {
      pattern:
        /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?:"[^"]*"|'[^']*'|{[\s\S]+?}(?=[\s/>])))|(?=[\s/>])))+)?\s*\/?>/i,
      greedy: true,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/i,
          inside: {
            punctuation: /^<\/?/,
            namespace: /^[^\s>\/:]+:/
          }
        },
        'language-javascript': {
          pattern:
            /\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,
          inside: PrismInstance.languages['javascript']
        },
        'attr-value': {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
          inside: {
            punctuation: [
              /^=/,
              {
                pattern: /^(\s*)["']|["']$/,
                lookbehind: true
              }
            ],
            'language-javascript': {
              pattern: /{[\s\S]+}/,
              inside: PrismInstance.languages['javascript']
            }
          }
        },
        punctuation: /\/?>/,
        'attr-name': {
          pattern: /[^\s>\/]+/,
          inside: {
            namespace: /^[^\s>\/:]+:/
          }
        }
      }
    },
    'language-javascript': {
      pattern: /\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,
      lookbehind: true,
      inside: PrismInstance.languages['javascript']
    }
  })

  // @ts-ignore
  PrismInstance.languages.svelte['tag'].inside['attr-value'].inside['entity'] =
    // @ts-ignore
    PrismInstance.languages.svelte['entity']

  PrismInstance.hooks.add('wrap', (env) => {
    if (env.type === 'entity') {
      env.attributes['title'] = env.content.replace(/&amp;/, '&')
    }
  })

  // @ts-ignore
  Object.defineProperty(PrismInstance.languages.svelte.tag, 'addInlined', {
    // @ts-ignore
    value: function addInlined(tagName, lang): void {
      const includedCdataInside = {}
      // @ts-ignore
      includedCdataInside['language-' + lang] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: true,
        inside: PrismInstance.languages[lang]
      }
      // @ts-ignore
      includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i

      const inside = {
        'included-cdata': {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          inside: includedCdataInside
        }
      }
      // @ts-ignore
      inside['language-' + lang] = {
        pattern: /[\s\S]+/,
        inside: PrismInstance.languages[lang]
      }

      const def = {}
      // @ts-ignore
      def[tagName] = {
        pattern: RegExp(
          /(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(
            /__/g,
            tagName
          ),
          'i'
        ),
        lookbehind: true,
        greedy: true,
        inside
      }

      PrismInstance.languages.insertBefore('svelte', 'cdata', def)
    }
  })

  // @ts-ignore
  PrismInstance.languages.svelte.tag.addInlined('style', 'css')
  // @ts-ignore
  PrismInstance.languages.svelte.tag.addInlined('script', 'javascript')
}

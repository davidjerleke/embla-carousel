import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import { REHYPE_AUTOLINK_HEADINGS_OPTIONS } from '@/utils/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  compiler: {
    styledComponents: true
  },
  turbopack: {
    rules: {
      '*.svg': {
        condition: {
          all: [{ path: /src\/assets\/icons\// }]
        },
        loaders: ['@svgr/webpack'],
        as: '*.js'
      }
    }
  }
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    rehypePlugins: [
      'rehype-slug',
      ['rehype-autolink-headings', { ...REHYPE_AUTOLINK_HEADINGS_OPTIONS }]
    ]
  }
})

export default withMDX(nextConfig)

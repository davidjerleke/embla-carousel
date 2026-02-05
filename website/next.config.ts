import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

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
  extension: /\.(md|mdx)$/
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig)

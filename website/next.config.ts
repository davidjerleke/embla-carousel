import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig)

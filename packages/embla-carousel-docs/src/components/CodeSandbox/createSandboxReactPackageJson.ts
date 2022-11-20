import docsPackageJson from 'embla-carousel-docs/package.json'
import { PackageJsonType } from './types'

const sandboxReactPackageJsonTemplate: PackageJsonType = {
  name: 'react',
  version: '1.0.0',
  description: 'Embla Carousel React example',
  keywords: ['react', 'starter'],
  main: 'src/js/index.js',
  dependencies: {
    react: docsPackageJson.dependencies.react,
    'react-dom': docsPackageJson.dependencies['react-dom'],
    'react-scripts': '4.0.0',
    'embla-carousel-react':
      docsPackageJson.dependencies['embla-carousel-react'],
  },
  devDependencies: {
    '@babel/runtime': '7.13.8',
    typescript: '4.1.3',
  },
  scripts: {
    start: 'react-scripts start',
    build: 'react-scripts build',
    test: 'react-scripts test --env=jsdom',
    eject: 'react-scripts eject',
  },
  browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
}

export const createSandboxReactPackageJson = (
  customConfig: Record<string, unknown>,
): PackageJsonType => {
  return Object.assign({}, sandboxReactPackageJsonTemplate, customConfig)
}

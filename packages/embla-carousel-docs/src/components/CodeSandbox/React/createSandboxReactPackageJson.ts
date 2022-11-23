import docsPackageJson from 'embla-carousel-docs/package.json'
import {
  languageToExtension,
  PackageJsonType,
  SandboxLanguageType,
} from '../types'

export const createSandboxReactPackageJson = (
  language: SandboxLanguageType,
  overrides?: PackageJsonType,
): PackageJsonType => {
  const isJavaScript = language === 'javascript'
  const scriptExtension = languageToExtension(language)
  const { dependencies, devDependencies } = docsPackageJson

  const packageJson: PackageJsonType = {
    name: 'react',
    version: '1.0.0',
    description: 'Embla Carousel React example',
    keywords: ['react', 'starter', language],
    main: `src/js/index.${scriptExtension}`,
    dependencies: {
      react: dependencies.react,
      'react-dom': dependencies['react-dom'],
      'react-scripts': '4.0.0',
      'embla-carousel-react': dependencies['embla-carousel-react'],
    },
    devDependencies: isJavaScript
      ? { '@babel/runtime': '7.13.8' }
      : {
          '@types/react': devDependencies['@types/react'],
          '@types/react-dom': devDependencies['@types/react-dom'],
          typescript: devDependencies.typescript,
        },
    scripts: {
      start: 'react-scripts start',
      build: 'react-scripts build',
      test: 'react-scripts test --env=jsdom',
      eject: 'react-scripts eject',
    },
    browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
  }

  return Object.assign({}, packageJson, overrides)
}

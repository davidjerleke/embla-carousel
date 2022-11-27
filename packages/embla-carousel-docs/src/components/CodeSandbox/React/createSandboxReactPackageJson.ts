import docsPackageJson from 'embla-carousel-docs/package.json'
import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'
import { languageToReactExtension } from '../sandboxUtils'
import {
  SandboxLanguageType,
  SandboxPluginsType,
  PackageJsonType,
} from '../sandboxTypes'

export const createSandboxReactPackageJson = (
  language: SandboxLanguageType,
  id: string,
  plugins?: SandboxPluginsType,
): PackageJsonType => {
  const isJavaScript = language === 'javascript'
  const scriptExtension = languageToReactExtension(language)
  const { dependencies, devDependencies } = docsPackageJson

  return {
    name: id,
    version: '1.0.0',
    description: `${kebabCaseToPascalCase(id, ' ')} Example`,
    keywords: ['react', 'starter', language],
    main: `src/js/index.${scriptExtension}`,
    dependencies: {
      react: dependencies.react,
      'react-dom': dependencies['react-dom'],
      'react-scripts': '4.0.0',
      'embla-carousel-react': dependencies['embla-carousel-react'],
      ...(plugins && plugins),
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
}

import docsPackageJson from 'embla-carousel-docs/package.json'
import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'
import {
  PackageJsonType,
  SandboxLanguageType,
  SandboxPluginsType,
} from '../sandboxTypes'

export const createSandboxVanillaPackageJson = (
  language: SandboxLanguageType,
  id: string,
  plugins?: SandboxPluginsType,
): PackageJsonType => {
  const isJavaScript = language === 'javascript'
  const { dependencies, devDependencies } = docsPackageJson

  return {
    name: id,
    version: '1.0.0',
    description: `${kebabCaseToPascalCase(id, ' ')} Example`,
    main: 'index.html',
    scripts: {
      start: 'parcel index.html --open',
      build: 'parcel build index.html',
    },
    dependencies: {
      'parcel-bundler': '^1.6.1',
      'embla-carousel': dependencies['embla-carousel-react'],
      ...(plugins && plugins),
    },
    devDependencies: isJavaScript
      ? { '@babel/core': '7.2.0' }
      : {
          typescript: devDependencies.typescript,
        },
    resolutions: {
      '@babel/preset-env': '7.13.8',
    },
  }
}

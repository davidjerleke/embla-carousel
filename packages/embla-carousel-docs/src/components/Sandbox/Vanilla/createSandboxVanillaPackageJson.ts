import docsPackageJson from 'embla-carousel-docs/package.json'
import { kebabCaseToPascalCase } from 'utils/stringCasing'
import { sandboxLanguageUtils } from 'utils/sandbox'
import {
  PackageJsonType,
  SandboxLanguageType,
  SandboxPluginsType
} from 'consts/sandbox'

export const createSandboxVanillaPackageJson = async (
  language: SandboxLanguageType,
  id: string,
  plugins?: SandboxPluginsType
): Promise<PackageJsonType> => {
  const { isJavaScript } = await sandboxLanguageUtils(language)
  const { dependencies, devDependencies } = docsPackageJson

  return {
    name: id,
    version: '1.0.0',
    description: `${kebabCaseToPascalCase(id, ' ')} Example`,
    main: 'index.html',
    scripts: {
      start: 'parcel index.html --open',
      build: 'parcel build index.html'
    },
    dependencies: {
      'parcel-bundler': '^1.6.1',
      'embla-carousel': dependencies['embla-carousel-react'],
      ...(plugins && plugins)
    },
    devDependencies: isJavaScript
      ? { '@babel/core': '7.2.0' }
      : {
          typescript: devDependencies.typescript
        },
    resolutions: {
      '@babel/preset-env': '7.13.8'
    }
  }
}

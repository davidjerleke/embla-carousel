import docsPackageJson from '@root/package.json'
import { kebabCaseToPascalCase } from '@/utils/string-casing'
import {
  sandboxLanguageUtils,
  PackageJsonType,
  SandboxLanguageType,
  SandboxPluginsType,
  getSandboxVersion
} from '@/content/v8/sandboxes/sandbox-utils'

export async function createSandboxVanillaPackageJson(
  language: SandboxLanguageType,
  id: string,
  plugins?: SandboxPluginsType
): Promise<PackageJsonType> {
  const version = getSandboxVersion()
  const { isJavaScript } = await sandboxLanguageUtils(language)
  const { devDependencies } = docsPackageJson

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
      'embla-carousel': version,
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

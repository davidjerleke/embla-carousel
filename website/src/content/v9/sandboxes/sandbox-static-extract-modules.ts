import {
  SandboxLanguageType,
  SandboxModuleType,
  sandboxLanguageUtils
} from '@/content/v9/sandboxes/sandbox-utils'
import {
  sandboxStaticFindLocalModules,
  sandboxStaticFindSharedModules
} from '@/content/v9/sandboxes/sandbox-static-find-modules'

type ModuleScriptType = {
  script: SandboxModuleType
  name: string
}

export async function sandboxStaticExtractVanillaModules(
  language: SandboxLanguageType,
  carouselScript: string,
  path: string
): Promise<ModuleScriptType[]> {
  const { vanillaScriptExtension } = await sandboxLanguageUtils(language)
  const localModules = sandboxStaticFindLocalModules(carouselScript)
  const sharedModules = sandboxStaticFindSharedModules(carouselScript)
  const modules = [...localModules, ...sharedModules]

  const localModulesPromises: Promise<SandboxModuleType>[] = localModules.map(
    (module) => {
      return import(
        `@/content/v9/sandboxes/Vanilla/SandboxFilesDist/${path}/${module}.${vanillaScriptExtension}`
      )
    }
  )
  const sharedModulesPromises: Promise<SandboxModuleType>[] = sharedModules.map(
    (module) => {
      return import(
        `@/content/v9/sandboxes/Vanilla/SandboxFilesDist/${module}.${vanillaScriptExtension}`
      )
    }
  )

  const promises = [...localModulesPromises, ...sharedModulesPromises]
  const resolvedPromises = await Promise.all(promises)
  const moduleScripts = resolvedPromises.map((script, index) => ({
    script,
    name: modules[index]
  }))

  return new Promise((resolve) => resolve(moduleScripts))
}

export async function sandboxStaticExtractReactModules(
  language: SandboxLanguageType,
  carouselScript: string,
  path: string
): Promise<ModuleScriptType[]> {
  const { reactScriptExtension } = await sandboxLanguageUtils(language)
  const localModules = sandboxStaticFindLocalModules(carouselScript)
  const sharedModules = sandboxStaticFindSharedModules(carouselScript)
  const modules = [...localModules, ...sharedModules]

  const localModulesPromises: Promise<SandboxModuleType>[] = localModules.map(
    (module) => {
      return import(
        `@/content/v9/sandboxes/React/SandboxFilesDist/${path}/${module}.${reactScriptExtension}`
      )
    }
  )
  const sharedModulesPromises: Promise<SandboxModuleType>[] = sharedModules.map(
    (module) => {
      return import(
        `@/content/v9/sandboxes/React/SandboxFilesDist/${module}.${reactScriptExtension}`
      )
    }
  )

  const promises = [...localModulesPromises, ...sharedModulesPromises]
  const resolvedPromises = await Promise.all(promises)
  const moduleScripts = resolvedPromises.map((script, index) => ({
    script,
    name: modules[index]
  }))

  return new Promise((resolve) => resolve(moduleScripts))
}

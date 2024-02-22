import { sandboxLanguageUtils } from 'utils/sandbox'
import { SandboxLanguageType, SandboxModuleType } from 'consts/sandbox'
import {
  sandboxStaticFindLocalModules,
  sandboxStaticFindSharedModules
} from './sandboxStaticFindModules'

type ModuleScriptType = {
  script: SandboxModuleType
  name: string
}

export const sandboxStaticExtractVanillaModules = async (
  language: SandboxLanguageType,
  carouselScript: string,
  path: string
): Promise<ModuleScriptType[]> => {
  const { vanillaScriptExtension } = await sandboxLanguageUtils(language)
  const localModules = sandboxStaticFindLocalModules(carouselScript)
  const sharedModules = sandboxStaticFindSharedModules(carouselScript)
  const modules = [...localModules, ...sharedModules]

  const localModulesPromises: Promise<SandboxModuleType>[] = localModules.map(
    (module) => {
      return import(
        `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/${path}/${module}.${vanillaScriptExtension}`
      )
    }
  )
  const sharedModulesPromises: Promise<SandboxModuleType>[] = sharedModules.map(
    (module) => {
      return import(
        `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/${module}.${vanillaScriptExtension}`
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

export const sandboxStaticExtractReactModules = async (
  language: SandboxLanguageType,
  carouselScript: string,
  path: string
): Promise<ModuleScriptType[]> => {
  const { reactScriptExtension } = await sandboxLanguageUtils(language)
  const localModules = sandboxStaticFindLocalModules(carouselScript)
  const sharedModules = sandboxStaticFindSharedModules(carouselScript)
  const modules = [...localModules, ...sharedModules]

  const localModulesPromises: Promise<SandboxModuleType>[] = localModules.map(
    (module) => {
      return import(
        `!!raw-loader!components/Sandbox/React/SandboxFilesDist/${path}/${module}.${reactScriptExtension}`
      )
    }
  )
  const sharedModulesPromises: Promise<SandboxModuleType>[] = sharedModules.map(
    (module) => {
      return import(
        `!!raw-loader!components/Sandbox/React/SandboxFilesDist/${module}.${reactScriptExtension}`
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

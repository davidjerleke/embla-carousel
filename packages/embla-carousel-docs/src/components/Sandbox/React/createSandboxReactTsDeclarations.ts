export const createSandboxReactTsDeclarations = async (): Promise<string> => {
  const declarations = await import(
    '!!raw-loader!components/Sandbox/React/SandboxFilesDist/declarations.d.ts'
  )
  return declarations.default
}

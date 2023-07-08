export const createSandboxVanillaTsDeclarations = async (): Promise<string> => {
  const declarations = await import(
    '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/declarations.d.ts'
  )
  return declarations.default
}

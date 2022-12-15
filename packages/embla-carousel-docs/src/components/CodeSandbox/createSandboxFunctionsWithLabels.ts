import { SelectCodeSandboxType } from './sandboxTypes'

export const SANDBOX_CREATE_LABELS = {
  reactJs: 'React',
  reactTs: 'React TypeScript',
  vanillaJs: 'Vanilla',
  vanillaTs: 'Vanilla TypeScript',
}

type CreateSandboxesKeyType = keyof typeof SANDBOX_CREATE_LABELS
type CreateSandboxFunctionType = SelectCodeSandboxType['createSandbox']
type CreateSandboxesType = {
  [key in CreateSandboxesKeyType]: CreateSandboxFunctionType
}

export const createSandboxFunctionsWithLabels = (
  createSandboxFunction: Partial<CreateSandboxesType>,
): SelectCodeSandboxType[] => {
  return Object.keys(createSandboxFunction).map((sandboxLabelKey) => {
    const key = <CreateSandboxesKeyType>sandboxLabelKey
    const createSandbox = <CreateSandboxFunctionType>createSandboxFunction[key]
    const label = SANDBOX_CREATE_LABELS[key]

    return { label, createSandbox }
  })
}

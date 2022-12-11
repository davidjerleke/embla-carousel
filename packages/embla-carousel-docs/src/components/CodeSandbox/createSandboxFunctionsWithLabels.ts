import { PropType as CreateCodeSandboxFormPropType } from './CreateCodeSandboxForm'

export const SANDBOX_CREATE_LABELS = {
  reactJs: 'React',
  reactTs: 'React+TS',
  vanillaJs: 'Vanilla',
  vanillaTs: 'Vanilla+TS',
}

type CreateSandboxesKeyType = keyof typeof SANDBOX_CREATE_LABELS
type CreateSandboxFunctionType = CreateCodeSandboxFormPropType['createSandbox']
type CreateSandboxesType = {
  [key in CreateSandboxesKeyType]: CreateSandboxFunctionType
}

export const createSandboxFunctionsWithLabels = (
  createSandboxFunction: Partial<CreateSandboxesType>,
): CreateCodeSandboxFormPropType[] => {
  return Object.keys(createSandboxFunction).map((sandboxLabelKey) => {
    const key = <CreateSandboxesKeyType>sandboxLabelKey
    const createSandbox = <CreateSandboxFunctionType>createSandboxFunction[key]
    const label = SANDBOX_CREATE_LABELS[key]

    return { label, createSandbox }
  })
}

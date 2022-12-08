import { PropType as CreateCodeSandboxFormPropType } from './CreateCodeSandboxForm'

export const SANDBOX_LABELS = {
  REACT_JS: 'React',
  REACT_TS: 'React+TS',
  VANILLA_JS: 'Vanilla',
  VANILLA_TS: 'Vanilla+TS',
}

export const createSandboxLabel = (
  label: string,
  createSandbox: CreateCodeSandboxFormPropType['createSandbox'],
): CreateCodeSandboxFormPropType => ({
  label,
  createSandbox,
})

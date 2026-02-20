export const addRadioFormHandler = (
  formNode: HTMLFormElement,
  radioNodes: HTMLInputElement[],
  onChange: (value: string) => void
): void => {
  if (!formNode || !radioNodes.length) return

  radioNodes.forEach((radioNode) => {
    radioNode.addEventListener('change', (event) => {
      const value = (event.target as HTMLInputElement).value
      return onChange(value)
    })
  })
}

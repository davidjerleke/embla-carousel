export const addRadioFormHandler = (
  formNode: HTMLFormElement,
  radioNodes: HTMLInputElement[],
  onChange: (event: Event) => void
): void => {
  if (!formNode || !radioNodes.length) return

  radioNodes.forEach((radioNode) => {
    radioNode.addEventListener('change', onChange)
  })
}

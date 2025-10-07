export const addRadioFormHandler = (formNode, radioNodes, onChange) => {
  if (!formNode || !radioNodes.length) return

  radioNodes.forEach((radioNode) => {
    radioNode.addEventListener('change', onChange)
  })
}

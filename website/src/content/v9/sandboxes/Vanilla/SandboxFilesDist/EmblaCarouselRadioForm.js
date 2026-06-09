export const addRadioFormHandler = (formNode, radioNodes, onChange) => {
  if (!formNode || !radioNodes.length) return

  radioNodes.forEach((radioNode) => {
    radioNode.addEventListener('change', (event) => {
      const value = event.target.value
      return onChange(value)
    })
  })
}

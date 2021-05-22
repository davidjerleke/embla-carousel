export const copyToClipboard = (string: string): void => {
  const el = document.createElement('textarea')
  el.value = string
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

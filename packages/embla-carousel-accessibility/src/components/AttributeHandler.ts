export type AttributeHandlerType = {
  connect: (element: Element | null) => void
  set: (key: string, value: string) => void
  toggle: (key: string, value?: string | boolean | null) => void
  remove: (key: string) => void
  removeAll: () => void
}

export function AttributeHandler(initialNode?: Element): AttributeHandlerType {
  const attributeStore = new Map<string, string>()
  let node: Element | null = initialNode || null

  function connect(element: Element | null): void {
    node = element
  }

  function set(key: string, value: string): void {
    if (!node) return
    if (!value) return
    attributeStore.set(key, value)
    node.setAttribute(key, value)
  }

  function toggle(key: string, value?: string | boolean | null): void {
    if (!node) return
    if (!value) return remove(key)
    set(key, value.toString())
  }

  function remove(key: string): void {
    if (!node) return
    attributeStore.delete(key)
    node.removeAttribute(key)
  }

  function removeAll(): void {
    if (!node) return
    attributeStore.forEach((_, key) => remove(key))
    attributeStore.clear()
  }

  const self: AttributeHandlerType = {
    connect,
    set,
    toggle,
    remove,
    removeAll
  }
  return self
}

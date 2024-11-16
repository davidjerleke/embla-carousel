import { ClassNameOptionType } from './Options'

export function normalizeClassNames(classNames: ClassNameOptionType): string[] {
  const normalized = Array.isArray(classNames) ? classNames : [classNames]
  return normalized.filter(Boolean)
}

export function removeClass(node: HTMLElement, classNames: string[]): void {
  if (!node || !classNames.length) return
  node.classList.remove(...classNames)
}

export function addClass(node: HTMLElement, classNames: string[]): void {
  if (!node || !classNames.length) return
  node.classList.add(...classNames)
}

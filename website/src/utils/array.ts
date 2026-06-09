/* UTILS */
export function arrayHasItems<Type>(
  array: Type[] | undefined,
  itemCount?: number
): boolean {
  if (!Array.isArray(array)) return false

  const count = itemCount ?? 0
  return array.length > count
}

export function arrayFromNumber(number: number): number[] {
  return Array.from(Array(number).keys())
}

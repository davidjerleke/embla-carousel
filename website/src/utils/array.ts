/* UTILS */
export function arrayHasItems<Type>(
  array: Type[] | undefined,
  itemCount?: number
): boolean {
  if (!Array.isArray(array)) return false

  const count = itemCount ?? 0
  return array.length > count
}

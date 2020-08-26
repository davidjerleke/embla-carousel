export function canUseDOM(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
}

export function areEqualShallow(
  objectA: { [key: string]: any },
  objectB: { [key: string]: any },
): boolean {
  return (
    Object.keys(objectA).length === Object.keys(objectB).length &&
    Object.keys(objectA).every(objectKey => {
      if (!objectB.hasOwnProperty(objectKey)) return false
      return objectA[objectKey] === objectB[objectKey]
    })
  )
}

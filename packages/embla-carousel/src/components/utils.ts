export function map(
  value: number,
  iStart: number,
  iStop: number,
  oStart: number,
  oStop: number,
): number {
  return oStart + (oStop - oStart) * ((value - iStart) / (iStop - iStart))
}

export function isNumber(subject: unknown): subject is number {
  return typeof subject === 'number'
}

export function isObject(subject: unknown): subject is Record<string, unknown> {
  return Object.prototype.toString.call(subject) === '[object Object]'
}

export function isArray(subject: unknown): subject is Record<number, unknown> {
  return Array.isArray(subject)
}

export function isRecord(
  subject: unknown,
): subject is Record<string | number, unknown> {
  return isObject(subject) || isArray(subject)
}

export function mathAbs(n: number): number {
  return Math.abs(n)
}

export function mathSign(n: number): number {
  return !n ? 0 : n / mathAbs(n)
}

export function deltaAbs(valueB: number, valueA: number): number {
  return mathAbs(valueB - valueA)
}

export function factorAbs(valueB: number, valueA: number): number {
  if (valueB === 0 || valueA === 0) return 0
  if (mathAbs(valueB) <= mathAbs(valueA)) return 0
  const diff = deltaAbs(mathAbs(valueB), mathAbs(valueA))
  return mathAbs(diff / valueB)
}

export function roundToDecimals(decimalPoints: number): (n: number) => number {
  const pow = Math.pow(10, decimalPoints)
  return (n: number): number => Math.round(n * pow) / pow
}

export function arrayKeys<Type>(array: Type[]): number[] {
  return objectKeys(array).map(Number)
}

export function arrayLast<Type>(array: Type[]): Type {
  return array[arrayLastIndex(array)]
}

export function arrayLastIndex<Type>(array: Type[]): number {
  return Math.max(0, array.length - 1)
}

export function objectKeys<Type>(object: Type): string[] {
  return Object.keys(object)
}

export function objectsMergeDeep(
  objectA: Record<string, unknown>,
  objectB: Record<string, unknown>,
): Record<string, unknown> {
  return [objectA, objectB].reduce((mergedObjects, currentObject) => {
    objectKeys(currentObject).forEach((key) => {
      const valueA = mergedObjects[key]
      const valueB = currentObject[key]
      const areObjects = isObject(valueA) && isObject(valueB)

      mergedObjects[key] = areObjects
        ? objectsMergeDeep(valueA, valueB)
        : valueB
    })
    return mergedObjects
  }, {})
}

export function objectsAreEqual(
  objectA: Record<string, unknown>,
  objectB: Record<string, unknown>,
): boolean {
  const objectAKeys = objectKeys(objectA)
  const objectBKeys = objectKeys(objectB)

  if (objectAKeys.length !== objectBKeys.length) return false

  return objectAKeys.every((key) => {
    const valueA = objectA[key]
    const valueB = objectB[key]
    if (typeof valueA === 'function') return `${valueA}` === `${valueB}`
    if (!isRecord(valueA) || !isRecord(valueB)) return valueA === valueB
    return objectsAreEqual(valueA, valueB)
  })
}

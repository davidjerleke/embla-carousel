export function map(
  value: number,
  iStart: number,
  iStop: number,
  oStart: number,
  oStop: number,
): number {
  return oStart + (oStop - oStart) * ((value - iStart) / (iStop - iStart))
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

export function arrayGroup<GenericType>(
  array: GenericType[],
  size: number,
): GenericType[][] {
  const groups = []
  for (let i = 0; i < array.length; i += size) {
    groups.push(array.slice(i, i + size))
  }
  return groups
}

export function arrayKeys<GenericType>(array: GenericType[]): number[] {
  return Object.keys(array).map(Number)
}

export function arrayLast<GenericType>(array: GenericType[]): GenericType {
  return array[arrayLastIndex(array)]
}

export function arrayLastIndex<GenericType>(array: GenericType[]): number {
  return Math.max(0, array.length - 1)
}

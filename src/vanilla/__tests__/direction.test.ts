import { Direction } from '../components/direction'

const positiveNumber = 100
const negativeNumber = -100

describe('Direction', () => {
  describe('Direction LTR applies no changes to a given', () => {
    const direction = Direction('ltr')

    test('Positive number', () => {
      const number = direction.applyTo(positiveNumber)
      expect(number).toEqual(positiveNumber)
    })

    test('Negative number', () => {
      const number = direction.applyTo(negativeNumber)
      expect(number).toEqual(negativeNumber)
    })
  })

  describe('Direction RTL applies the opposite sign to a given', () => {
    const direction = Direction('rtl')

    test('Positive number', () => {
      const number = direction.applyTo(positiveNumber)
      expect(number).toEqual(negativeNumber)
    })

    test('Negative number', () => {
      const number = direction.applyTo(negativeNumber)
      expect(number).toEqual(positiveNumber)
    })
  })
})

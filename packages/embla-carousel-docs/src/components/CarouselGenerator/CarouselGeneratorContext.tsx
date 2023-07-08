import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState
} from 'react'
import { CarouselGeneratorFormDataType } from 'consts/carouselGenerator'
import { numberWithinRange } from 'utils/numberWithinRange'

export const CONTEXT_DEFAULT_VALUE: CarouselGeneratorContextType = {
  formData: {
    framework: '',
    loop: false,
    dragFree: false,
    axis: 'x',
    direction: 'ltr',
    accessibility: false,
    slideSize: '100',
    slideGapSize: '10',
    edgeGap: '0',
    align: 'center',
    containScroll: true,
    navigationPrevNextButtons: false,
    navigationDots: false,
    autoplay: false,
    wheelGestures: false
  },
  onChange: () => undefined,
  onCheckboxChange: () => undefined,
  onRadioChange: () => undefined,
  onNumberChange: () => undefined,
  onNumberBlur: () => undefined
}

export type CarouselGeneratorContextType = {
  formData: CarouselGeneratorFormDataType
  onChange: <Key extends keyof CarouselGeneratorFormDataType>(
    key: Key,
    value: CarouselGeneratorFormDataType[Key]
  ) => void
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onNumberBlur: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CarouselGeneratorContext =
  createContext<CarouselGeneratorContextType>(CONTEXT_DEFAULT_VALUE)

type PropType = PropsWithChildren<{}>

export const CarouselGeneratorProvider = (props: PropType) => {
  const { children } = props
  const [formData, setFormData] = useState<CarouselGeneratorFormDataType>(
    CONTEXT_DEFAULT_VALUE.formData
  )

  const onChange: CarouselGeneratorContextType['onChange'] = useCallback(
    (key, value) => {
      setFormData((currentFormValues) => ({
        ...currentFormValues,
        [key]: value
      }))
    },
    []
  )

  const onCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.currentTarget
      const fieldName = name as keyof CarouselGeneratorFormDataType

      onChange(fieldName, checked)
    },
    [onChange]
  )

  const onRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget
      const fieldName = name as keyof CarouselGeneratorFormDataType

      onChange(fieldName, value)
    },
    [onChange]
  )

  const onNumberChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget
      const fieldName = name as keyof CarouselGeneratorFormDataType

      onChange(fieldName, value)
    },
    [onChange]
  )

  const onNumberBlur = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.currentTarget
      const fieldName = input.name as keyof CarouselGeneratorFormDataType
      const minValue = parseInt(input.getAttribute('min') || '', 10)
      const maxValue = parseInt(input.getAttribute('max') || '', 10)
      const value = numberWithinRange(
        parseFloat(input.value || '0'),
        minValue,
        maxValue
      )

      onChange(fieldName, value.toString())
    },
    [onChange]
  )

  const value = useMemo(
    () => ({
      formData,
      onChange,
      onCheckboxChange,
      onRadioChange,
      onNumberChange,
      onNumberBlur
    }),
    [
      formData,
      onChange,
      onCheckboxChange,
      onRadioChange,
      onNumberChange,
      onNumberBlur
    ]
  )

  return (
    <CarouselGeneratorContext.Provider value={value}>
      {children}
    </CarouselGeneratorContext.Provider>
  )
}

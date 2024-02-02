import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState
} from 'react'
import { defaultOptions } from '../../../../embla-carousel/src/components/Options'
import { OptionsType } from 'embla-carousel/components/Options'
import { SandboxGeneratorSettingsType } from 'consts/sandbox'
import { numberWithinRange } from 'utils/numberWithinRange'
import { arrayFromNumber } from 'utils/arrayFromNumber'

export const CONTEXT_DEFAULT_VALUE: CarouselGeneratorContextType = {
  formData: {
    ...(defaultOptions as OptionsType),
    id: 'embla-carousel-generator',
    framework: '',
    slideList: arrayFromNumber(5),
    accessibility: false,
    slideSize: '100',
    slideGapSize: '10',
    edgeGap: '0',
    styles: '',
    navigationPrevNextButtons: false,
    navigationDots: false,
    selectedSnapDisplay: false,
    autoplay: false,
    classNames: false,
    wheelGestures: false
  },
  onChange: () => undefined,
  onCheckboxChange: () => undefined,
  onRadioChange: () => undefined,
  onNumberChange: () => undefined,
  onNumberBlur: () => undefined
}

export type CarouselGeneratorContextType = {
  formData: SandboxGeneratorSettingsType
  onChange: <Key extends keyof SandboxGeneratorSettingsType>(
    key: Key,
    value: SandboxGeneratorSettingsType[Key]
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
  const [formData, setFormData] = useState<SandboxGeneratorSettingsType>(
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
      const fieldName = name as keyof SandboxGeneratorSettingsType

      onChange(fieldName, checked)
    },
    [onChange]
  )

  const onRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget
      const fieldName = name as keyof SandboxGeneratorSettingsType

      onChange(fieldName, value)
    },
    [onChange]
  )

  const onNumberChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget
      const fieldName = name as keyof SandboxGeneratorSettingsType

      onChange(fieldName, value)
    },
    [onChange]
  )

  const onNumberBlur = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.currentTarget
      const fieldName = input.name as keyof SandboxGeneratorSettingsType
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

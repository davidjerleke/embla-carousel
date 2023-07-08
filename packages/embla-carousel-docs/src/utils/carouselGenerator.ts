import { camelOrPascalToKebabCase } from './camelOrPascalToKebabCase'
import {
  CarouselGeneratorFormDataType,
  CAROUSEL_GENERATOR_FORM_PREFIX
} from 'consts/carouselGenerator'

type CarouselGeneratorInputIdType<
  Key extends keyof CarouselGeneratorFormDataType
> = {
  ID: string
  FIELD_NAME: Key
}

export type CarouselGeneratorRadioType<
  Key extends keyof CarouselGeneratorFormDataType
> = CarouselGeneratorInputIdType<Key> & {
  OPTIONS: {
    LABEL: string
    VALUE: CarouselGeneratorFormDataType[Key]
  }[]
}

export type CarouselGeneratorCheckboxType<
  Key extends keyof CarouselGeneratorFormDataType
> = CarouselGeneratorInputIdType<Key> & {
  LABEL: string
}

export type CarouselGeneratorInputTextType<
  Key extends keyof CarouselGeneratorFormDataType
> = CarouselGeneratorInputIdType<Key> & {
  LABEL: string
}

export const createCarouselGeneratorInputId = <
  Key extends keyof CarouselGeneratorFormDataType
>(
  fieldName: Key
): CarouselGeneratorInputIdType<Key> => {
  return {
    FIELD_NAME: fieldName,
    ID: `${CAROUSEL_GENERATOR_FORM_PREFIX}-${camelOrPascalToKebabCase(
      fieldName
    )}`
  }
}

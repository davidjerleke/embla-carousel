import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'

type PropType = {
  property: keyof EmblaOptionsType
  values: string[]
  options: EmblaOptionsType
  setOptions: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioForm: React.FC<PropType> = (props) => {
  const { options, property, values, setOptions } = props

  return (
    <form
      className={`embla__radio-form`.concat(` embla__radio-form--${property}`)}
    >
      <span className="embla__radio-form__label">{property}:</span>

      {values.map((value) => (
        <label className="embla__radio-wrapper" key={value}>
          <span className="embla__radio-input__wrapper">
            <span className="embla__radio-input__line-height">-</span>
            <input
              type="radio"
              value={value}
              checked={value === options[property]?.toString()}
              onChange={setOptions}
              name={property}
            />
          </span>
          {value}
        </label>
      ))}
    </form>
  )
}

export default RadioForm

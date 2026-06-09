import React from 'react'

const RadioForm = (props) => {
  const { selected, property, values, onChange } = props

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
              checked={value === selected}
              onChange={(event) => onChange(event.target.value)}
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

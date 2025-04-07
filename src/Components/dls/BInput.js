import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { validate } from '../../utils/validations'
import {ReactComponent as SearchIcon} from "../../Assets/images/search-md.svg"

import { cn, convertPersianNumberToEnglish } from '../../utils/helpers'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const BInput = ({
  label,
  hideLabel = false,
  labelSlot,
  labelAsideSlot,
  appendSlot,
  placeholder,
  required = false,
  icon,
  type = 'text',
  readonly = false,
  disabled = false,
  wrapperClass,
  inputClass,
  dir = 'ltr',
  autofocus = false,
  autocomplete,
  validations = [],
  onChange,
  value,
  isTextarea = false,
  ...props
}) => {
  const [id, setId] = useState(null)
  const [error, setError] = useState(null)
  const [model, setModel] = useState(value || '')

  useEffect(() => {
    setId(String(Math.floor(Math.random() * 99999999)))
  }, [])

  const handleValidation = (event, showError = true) => {
    const result = validate(
      validations,
      convertPersianNumberToEnglish(event.target.value),
    )
    showError && setError(result.error)
    return result
  }

  useEffect(() => {
    if (value !== model) setModel(value)
  }, [value])

  useEffect(() => {
    const inputEl = document.getElementById(`input-${id}`)
    inputEl.validate = handleValidation
    if (autofocus && id) {
      inputEl?.focus()
    }
  }, [autofocus, id, validations])

  const onChangeWrapper = (event) => {
    setModel(convertPersianNumberToEnglish(event.target.value))
    if (onChange) {
      onChange(event)
    }
  }

  const wrapperClasses = cn(
    ' px-3 flex items-center text-black gap-x-2 rounded-[8px]',
    ' focus-within:ring-[1px] transition-all duration-200',
    'h-[46px] sm:h-[57px]',
    {
      '!ring-error': error,
    },
    wrapperClass,
    props.className,
  )

  const inputClasses = [
    'grow !bg-transparent  font-iransans outline-none',
    'text-sm sm:text-base',
    'text-black placeholder:text-[#A7A9AD] placeholder:text-[14px] placeholder:font-thin placeholder:font-iransans placeholder:text-right',
    'w-full h-[46px] sm:h-[57px]',
    inputClass,
  ].join(' ')

  const controlProps = {
    id: `input-${id}`,
    value: model,
    placeholder: placeholder,
    className: inputClasses,
    readOnly: readonly,
    disabled: disabled,
    dir: dir,
    autoComplete: autocomplete,
    onInput: handleValidation,
    onChange: onChangeWrapper,
    ...(isTextarea ? {} : { type: type }), 
  }

  return (
    <div className='flex flex-col gap-y-1  p-[18px]' {...props}>
      {(label || labelSlot || labelAsideSlot) && (
        <div className='flex items-center justify-between'>
          <label
            htmlFor={`input-${id}`}
            className={`text-xs font-medium sm:text-sm ${
              disabled ? 'text-zinc-400' : 'text-zinc-400'
            }`}
          >
            {label && (
              <>
                {label}
                {required && (
                  <span
                    className={`${disabled ? 'text-grey-700' : 'text-error'}`}
                  >
                    *
                  </span>
                )}
              </>
            )}
          </label>
        </div>
      )}

      <div className={wrapperClasses}>
        {icon && (
          <div className='flex items-center justify-center'>
            <SearchIcon/>
          </div>
        )}

        {isTextarea ? (
          <textarea {...controlProps} />
        ) : (
          <input {...controlProps} />
        )}

        {appendSlot && (
          <div className='tw-flex tw-items-center tw-justify-center'>
            {appendSlot}
          </div>
        )}
      </div>

      {!!validations.length && (
        <div className='min-h-[24px] text-xs text-error'>
          {error && <span>{error}</span>}
        </div>
      )}
    </div>
  )
}

export default BInput

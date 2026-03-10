import { type InputHTMLAttributes, useId } from 'react'
import { IconCheckbox } from './icons/IconCheckbox'
import { IconCheckboxChecked } from './icons/IconCheckboxChecked'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  const id = useId()

  return (
    <label htmlFor={id} className={`flex items-center gap-2.5 cursor-pointer select-none ${className}`}>
      <div className="relative shrink-0 w-6 h-6">
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          {...props}
        />
        <IconCheckbox />
        <IconCheckboxChecked className="absolute inset-0 opacity-0 peer-checked:opacity-100 transition-opacity" />
      </div>
      {label && (
        <span className="text-[1rem] font-medium leading-[150%] text-text-muted">
          {label}
        </span>
      )}
    </label>
  )
}

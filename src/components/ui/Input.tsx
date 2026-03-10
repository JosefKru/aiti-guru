import { type InputHTMLAttributes, type ReactNode, useState } from 'react'
import { IconClose } from './icons/IconClose'
import { IconEye } from './icons/IconEye'
import { IconEyeOff } from './icons/IconEyeOff'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  leftIcon?: ReactNode
  error?: string
}

export function Input({ label, leftIcon, error, className = '', type, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-[18px] font-medium leading-[150%] tracking-[-0.015em] text-text-body">{label}</label>}
      <div className={`flex items-center rounded-xl border px-4  py-2.5 bg-white ${error ? 'border-red-400' : 'border-gray-200'} ${className}`}>
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <input
          type={inputType}
          className="flex-1 bg-transparent text-[18px] font-medium leading-[150%] tracking-[-0.015em] text-text-body outline-none placeholder:text-gray-400 mx-3"
          {...props}
        />
        {isPassword && (
          <button type="button" className="shrink-0" onClick={() => setShowPassword(v => !v)}>
            {showPassword ? <IconEye /> : <IconEyeOff />}
          </button>
        )}
        {!isPassword && props.value && (
          <button type="button" className="shrink-0" onClick={() => props.onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}>
            <IconClose />
          </button>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}

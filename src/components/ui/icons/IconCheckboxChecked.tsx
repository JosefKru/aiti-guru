import { clsx } from 'clsx'
import type { IconProps } from './types'

export function IconCheckboxChecked({ className }: IconProps) {
  return (
    <svg className={clsx(className)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4.8" fill="#3D5AFE" />
      <path d="M7 12.5L10.5 16L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
